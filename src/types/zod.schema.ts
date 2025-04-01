import { z } from 'zod';

// приводим значение к числу(если возможно) и валидируем
export const pageNumberSchema = z.coerce.number().int().positive().optional();

export const cityInputSchema = z
  .string()
  .min(2, 'Минимум 2 символа')
  .max(30, 'Максимум 30 символов')
  .regex(
    /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
    'Название города может содержать только буквы, пробелы и дефисы'
  );
