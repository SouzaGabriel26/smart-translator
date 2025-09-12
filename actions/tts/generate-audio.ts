"use server";

import { checkUserAction } from "@/actions/auth/check-user";
import { tts } from "@/services/tts";
import { z } from "zod";

const generateAudioSchema = z.object({
  text: z.string().min(1).max(500),
});

export async function generateAudioAction(input: {
  text: string;
}): Promise<
  { success: true; audioData: string } | { success: false; error: string }
> {
  try {
    const validation = generateAudioSchema.safeParse(input);
    if (!validation.success) {
      return { success: false, error: "Invalid input" };
    }

    await checkUserAction();

    const audioBuffer = await tts.convertTextToSpeech(input.text);

    const audioData = audioBuffer.toString("base64");

    return { success: true, audioData };
  } catch (error) {
    console.error("TTS generation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
