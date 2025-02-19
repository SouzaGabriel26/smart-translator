'use server';

import { checkUserAction } from '@/actions/auth/check-user';
import { GeminiServiceError } from '@/errors/gemini-service-error';
import { ParseTextError } from '@/errors/parse-text-error';
import { ParseZodError } from '@/errors/parse-zod-error';
import { prismaClient } from '@/lib/prisma-client';
import { gemini } from '@/models/gemini';

export type TranslationResponse = {
  ok: boolean;
  error?: string;
  module?: string;
  word_to_translate?: string;
};

const defaultErrorObject = {
  ok: false,
  error: 'Something went wrong while generating the translation.',
};

export async function generateTranslationAction(
  _prevState: unknown,
  formData: FormData,
): Promise<TranslationResponse> {
  const wordToTranslate = formData.get('word_to_translate') as string;

  try {
    const user = await checkUserAction();
    const result = await gemini.generateTranslation(wordToTranslate);

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
