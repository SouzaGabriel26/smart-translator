import { TTS_CONFIG } from '@/config/tts-config';
import { TTSRateLimitError } from '@/errors/tts-errors';

const requestTimes: number[] = [];
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = TTS_CONFIG.RATE_LIMIT.REQUESTS_PER_MINUTE;

export async function checkRateLimit(): Promise<void> {
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;

  // Remove old requests
  const validRequests = requestTimes.filter((time) => time > windowStart);
  requestTimes.length = 0;
  requestTimes.push(...validRequests);

  if (requestTimes.length >= MAX_REQUESTS) {
    const oldestRequest = Math.min(...requestTimes);
    const retryAfter = Math.ceil((oldestRequest + WINDOW_SIZE - now) / 1000);
    throw new TTSRateLimitError(retryAfter);
  }

  requestTimes.push(now);
}
