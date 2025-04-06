import { type ClassValue, clsx } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserDayRange(timeZone: string) {
  const now = DateTime.now().setZone(timeZone);

  const startOfToday = now.startOf('day').toUTC().toJSDate();
  const endOfToday = now.endOf('day').toUTC().toJSDate();

  return { startOfToday, endOfToday };
}
