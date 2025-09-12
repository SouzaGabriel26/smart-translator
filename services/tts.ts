import { TTS_CONFIG } from '@/config/tts-config';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import type { TextToSpeechConvertRequestOutputFormat } from '@elevenlabs/elevenlabs-js/api';
import 'dotenv/config';

if (!process.env.ELEVENLABS_API_KEY) {
  throw new Error('ELEVENLABS_API_KEY is not set');
}

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

async function convertTextToSpeech(
  text: string,
  voiceId?: string,
): Promise<Buffer> {
  const audioStream = await elevenlabs.textToSpeech.convert(
    voiceId || TTS_CONFIG.ELEVENLABS.VOICE_ID,
    {
      text,
      modelId: TTS_CONFIG.ELEVENLABS.MODEL_ID,
      outputFormat: TTS_CONFIG.ELEVENLABS
        .OUTPUT_FORMAT as TextToSpeechConvertRequestOutputFormat,
    },
  );

  const reader = audioStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const audioBuffer = Buffer.concat(chunks);
  return audioBuffer;
}

export const tts = Object.freeze({
  convertTextToSpeech,
});
