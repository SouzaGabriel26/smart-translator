import { TTSServiceError } from "@/errors/tts-errors";

export async function withRetry<T>(
  operation: () => Promise<T>,
  context: string,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new TTSServiceError(
          `TTS operation failed after ${maxRetries} attempts: ${context}`,
          error as Error
        );
      }

      const delay = 1000 * 2 ** (attempt - 1); // 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("Unreachable");
}
