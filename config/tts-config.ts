export const TTS_CONFIG = {
  ELEVENLABS: {
    VOICE_ID: process.env.ELEVENLABS_VOICE_ID || '7EgG6hUPTRSnBBfZN5tp',
    MODEL_ID: process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2',
    OUTPUT_FORMAT: process.env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_128',
  },
  CACHE: {
    TTL_SECONDS: 3600, // 1 hour
    MAX_ENTRIES: 1000,
  },
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 60, // Prevents abuse while allowing normal usage
  },
} as const;
