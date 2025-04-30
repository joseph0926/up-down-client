import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPercent = (ratio: number) =>
  `${(+ratio * 100).toFixed(1).replace(/\.0$/, '')}%`;
