const memoryCache = new Map<string, Buffer>();

export async function getCachedAudio(
  text: string,
  voiceId: string,
): Promise<Buffer | null> {
  const key = generateCacheKey(text, voiceId);

  // Check memory cache first
  if (memoryCache.has(key)) {
    return memoryCache.get(key)!;
  }

  // TODO: Add Redis cache for production
  return null;
}

export async function setCachedAudio(
  text: string,
  voiceId: string,
  audioBuffer: Buffer,
): Promise<void> {
  const key = generateCacheKey(text, voiceId);
  memoryCache.set(key, audioBuffer);

  // TODO: Add Redis cache for production
}

function generateCacheKey(text: string, voiceId: string): string {
  return `${voiceId}:${Buffer.from(text).toString('base64')}`;
}
