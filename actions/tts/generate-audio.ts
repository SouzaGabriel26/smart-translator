"use server";

import { checkUserAction } from "@/actions/auth/check-user";
import { TTS_CONFIG } from "@/config/tts-config";
import { tts } from "@/services/tts";
import { getCachedAudio, setCachedAudio } from "@/services/tts-cache";
import { recordTTSError, recordTTSGeneration } from "@/services/tts-metrics";
import { checkRateLimit } from "@/services/tts-rate-limiter";
import { withRetry } from "@/services/tts-retry";
import { sanitizeText } from "@/utils/text-sanitizer";
import { z } from "zod";

const generateAudioSchema = z.object({
  text: z.string().min(1).max(500),
  voiceId: z.string().optional(),
});

export async function generateAudioAction(input: {
  text: string;
  voiceId?: string;
}): Promise<
  { success: true; audioData: string } | { success: false; error: string }
> {
  const startTime = Date.now();
  let userId: string | undefined;

  try {
    const validation = generateAudioSchema.safeParse(input);
    if (!validation.success) {
      return { success: false, error: "Invalid input" };
    }

    const sanitizedText = sanitizeText(input.text);

    const user = await checkUserAction();
    userId = user.id;

    await checkRateLimit();

    const voiceId = input.voiceId || TTS_CONFIG.ELEVENLABS.VOICE_ID;

    const cachedAudio = await getCachedAudio(sanitizedText, voiceId);
    if (cachedAudio) {
      return { success: true, audioData: cachedAudio.toString("base64") };
    }

    const audioBuffer = await withRetry(
      () => tts.convertTextToSpeech(sanitizedText, voiceId),
      `TTS generation for user ${user.id}`
    );

    await setCachedAudio(sanitizedText, voiceId, audioBuffer);

    const duration = Date.now() - startTime;
    await recordTTSGeneration(user.id, sanitizedText.length, duration);

    return { success: true, audioData: audioBuffer.toString("base64") };
  } catch (error) {
    console.error("TTS generation failed:", error);

    if (userId) {
      await recordTTSError(
        userId,
        error instanceof Error ? error.message : "Unknown error"
      );
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
