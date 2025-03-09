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
  word_to_translate: z.string().max(20),
});

export async function generateTranslationAction(
  _prevState: unknown,
  formData: FormData,
): Promise<TranslationResponse> {
  const wordToTranslate = formData.get('word_to_translate') as string;

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
    const result = await gemini.generateTranslation(wordToTranslate);

    const userAlreadyHaveTranslation =
      await prismaClient.translations.findFirst({
        where: {
          userId: user.id,
          targetWord: wordToTranslate,
        },
      });

    if (userAlreadyHaveTranslation) {
      return {
        ok: true,
        translation_already_exists: true,
      };
    }

    await prismaClient.translations.create({
      data: {
        userId: user.id,
        languageFrom: 'en',
        languageTo: 'pt',
        targetWord: wordToTranslate,
        translatedWord: result.output,
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
