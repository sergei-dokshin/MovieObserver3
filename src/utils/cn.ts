import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Объединяет логику clsx и twMerge
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
