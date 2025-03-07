import { GeminiServiceError } from '@/errors/gemini-service-error';
import { InvalidWordError } from '@/errors/invalid-word-error';
import { ParseTextError } from '@/errors/parse-text-error';
import { ParseZodError } from '@/errors/parse-zod-error';
import { prismaClient } from '@/lib/prisma-client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const geminiResponseSchema = z.object({
  input: z.string(),
  output: z.string(),
  phrase_1_generated: z.string(),
  phrase_1_translated: z.string(),
  phrase_2_generated: z.string(),
  phrase_2_translated: z.string(),
  phrase_3_generated: z.string(),
  phrase_3_translated: z.string(),
});

type GeminiResponse = z.infer<typeof geminiResponseSchema>;

async function generateTranslation(wordToTranslate: string) {
  const translationAlreadyExists = await getTranslation();

  if (translationAlreadyExists) {
    const translationObject: GeminiResponse = {
      input: wordToTranslate,
      output: translationAlreadyExists.translatedWord,
      phrase_1_generated: translationAlreadyExists.phrases[0].content,
      phrase_1_translated:
        translationAlreadyExists.phrases[0].translatedContent,
      phrase_2_generated: translationAlreadyExists.phrases[1].content,
      phrase_2_translated:
        translationAlreadyExists.phrases[1].translatedContent,
      phrase_3_generated: translationAlreadyExists.phrases[2].content,
      phrase_3_translated:
        translationAlreadyExists.phrases[2].translatedContent,
    };

    return translationObject;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  let responseText = '';

  try {
    const prompt = generateCustomizedPrompt(wordToTranslate);
    const { response } = await model.generateContent(prompt);
    responseText = response.text();
  } catch (error) {
    // TODO: log to an external service
    console.log('Gemini Error: ', error);
    throw new GeminiServiceError();
  }

  responseText = responseText.replace(/```json|```/g, '').trim();

  if (responseText === '{}') {
    // TODO: log to an external service
    console.log('Invalid Word Error');
    throw new InvalidWordError();
  }

  try {
    const parsedResponse = JSON.parse(responseText);

    const validatedOutput = geminiResponseSchema.safeParse(parsedResponse);

    if (!validatedOutput.success) {
      // TODO: log to an external service
      console.log(
        'Zod validation error: ',
        JSON.stringify(validatedOutput, null, 2),
      );
      throw new ParseZodError();
    }

    return validatedOutput.data;
  } catch (error) {
    // TODO: log to an external service
    console.log('Parse Error: ', error);
    throw new ParseTextError();
  }

  async function getTranslation() {
    const translation = await prismaClient.translations.findFirst({
      where: {
        targetWord: wordToTranslate,
      },
      include: {
        phrases: true,
      },
    });

    return translation;
  }
}

function generateCustomizedPrompt(wordToTranslate: string) {
  return `
Translate the following English word to Portuguese: "${wordToTranslate}".
Then, generate 3 simple sentences using this word, each with its Portuguese translation.

Generate an output **ONLY in valid JSON format**, without any other characters, delimiters or explanations. The JSON must follow the following schema:

{
  input: string,
  output: string,
  phrase_1_generated: string,
  phrase_1_translated: string,
  phrase_2_generated: string,
  phrase_2_translated: string,
  phrase_3_generated: string,
  phrase_3_translated: string
}

But, in case of the word is not a valid English word, return an empty object.
  `;
}

export const gemini = {
  generateTranslation,
};
