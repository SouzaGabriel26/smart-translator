export function sanitizeText(text: string): string {
  return text.trim().replace(/[<>]/g, "").substring(0, 500);
}
