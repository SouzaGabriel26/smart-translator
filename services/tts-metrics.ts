import { logError, logInfo } from '@/lib/logger';

export async function recordTTSGeneration(
  userId: string,
  textLength: number,
  duration: number,
) {
  logInfo('TTS generation completed', {
    userId,
    textLength,
    duration,
    timestamp: new Date().toISOString(),
  });
}

export async function recordTTSError(userId: string, error: string) {
  logError('TTS generation failed', new Error(error), {
    userId,
    timestamp: new Date().toISOString(),
  });
}
