export function logInfo(message: string, meta?: Record<string, unknown>) {
  console.log(`[INFO] ${message}`, meta);
  // TODO: In production, send to external logging service
}

export function logError(
  message: string,
  error?: Error,
  meta?: Record<string, unknown>
) {
  console.error(`[ERROR] ${message}`, error, meta);
  // TODO: In production, send to error tracking service
}

export function logWarn(message: string, meta?: Record<string, unknown>) {
  console.warn(`[WARN] ${message}`, meta);
}
