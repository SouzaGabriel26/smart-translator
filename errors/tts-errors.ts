export class TTSServiceError extends Error {
  constructor(
    message: string,
    public cause?: Error,
  ) {
    super(message);
    this.name = 'TTSServiceError';
  }
}

export class TTSRateLimitError extends TTSServiceError {
  public retryAfter?: number;

  constructor(retryAfter?: number) {
    super('TTS rate limit exceeded');
    this.name = 'TTSRateLimitError';
    this.retryAfter = retryAfter;
  }
}
