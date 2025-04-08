'use server';

import { checkUserAction } from '@/actions/auth/check-user';
import { GeminiServiceError } from '@/errors/gemini-service-error';
import { InvalidWordError } from '@/errors/invalid-word-error';
import { ParseTextError } from '@/errors/parse-text-error';
import { ParseZodError } from '@/errors/parse-zod-error';
import { prismaClient } from '@/lib/prisma-client';
import { gemini } from '@/models/gemini';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type TranslationResponse = {
  ok: boolean;
  translation_already_exists?: boolean;
  error?: string;
  module?: string;
  word_to_translate?: string;
};

const defaultErrorObject = {
  ok: false,
  error: 'Something went wrong while generating the translation.',
};

const schema = z.object({
  word_to_translate: z.string().max(20).trim(),
});

export async function generateTranslationAction(
  _prevState: unknown,
  formData: FormData,
): Promise<TranslationResponse> {
  const wordToTranslate = formData.get('word_to_translate') as string;
  const languageFrom = formData.get('language_from') as string;
  const languageTo = formData.get('language_to') as string;

  const parsedData = schema.safeParse({ word_to_translate: wordToTranslate });

  if (!parsedData.success) {
    return {
      ok: false,
      error: parsedData.error.errors[0].message,
      word_to_translate: wordToTranslate,
      module: 'parse-zod',
    };
  }

  try {
    const user = await checkUserAction();

    const userAlreadyHaveTranslation =
      await prismaClient.translations.findFirst({
        where: {
          userId: user.id,
          discarded: false,
          targetWord: {
            equals: parsedData.data.word_to_translate,
            mode: 'insensitive',
          },
        },
      });

    if (userAlreadyHaveTranslation) {
      return {
        ok: true,
        translation_already_exists: true,
      };
    }

    const result = await gemini.generateTranslation({
      languageFrom,
      languageTo,
      wordToTranslate: parsedData.data.word_to_translate,
    });

    await prismaClient.translations.create({
      data: {
        userId: user.id,
        languageFrom,
        languageTo,
        targetWord: wordToTranslate,
        translatedWord: result.output,
        wordOverview: result?.input_brief_overview_in_language_from ?? '',
        phrases: {
          createMany: {
            data: [
              {
                content: result.phrase_1_generated,
                translatedContent: result.phrase_1_translated,
              },
              {
                content: result.phrase_2_generated,
                translatedContent: result.phrase_2_translated,
              },
              {
                content: result.phrase_3_generated,
                translatedContent: result.phrase_3_translated,
              },
            ],
          },
        },
      },
    });

    revalidatePath('/');

    return {
      ok: true,
    };
  } catch (error) {
    if (error instanceof GeminiServiceError) {
      return {
        ...defaultErrorObject,
        module: 'gemini',
        word_to_translate: wordToTranslate,
      };
    }

    if (error instanceof InvalidWordError) {
      return {
        ok: false,
        error: 'The word you entered is invalid. Please try again.',
        word_to_translate: wordToTranslate,
        module: 'invalid-word',
      };
    }

    if (error instanceof ParseTextError) {
      return {
        ...defaultErrorObject,
        module: 'parse-text',
        word_to_translate: wordToTranslate,
      };
    }

    if (error instanceof ParseZodError) {
      return {
        ...defaultErrorObject,
        module: 'parse-zod',
        word_to_translate: wordToTranslate,
      };
    }

    return { ...defaultErrorObject };
  }
}

export async function findTranslationsAction(searchTerm: string) {
  const user = await checkUserAction();

  const translations = await prismaClient.translations.findMany({
    where: {
      OR: [
        {
          userId: user.id,
          targetWord: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          userId: user.id,
          translatedWord: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      phrases: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return translations;
}

export async function discardTranslationAction(translationId: string) {
  const user = await checkUserAction();

  await prismaClient.translations.update({
    where: {
      id: translationId,
      userId: user.id,
    },
    data: {
      discarded: true,
    },
  });

  revalidatePath('/dashboard');
}

type GetTodayTranslationsProps = {
  startOfToday: Date;
  endOfToday: Date;
};

export async function getTodayTranslationsAction({
  startOfToday,
  endOfToday,
}: GetTodayTranslationsProps) {
  const user = await checkUserAction();

  const todayTranslations = await prismaClient.translations.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    select: { id: true },
  });

  return todayTranslations ?? [];
}
