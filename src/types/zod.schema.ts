import { z } from 'zod';

// приводим значение к числу(если возможно) и валидируем
export const pageNumberSchema = z.coerce.number().int().positive().optional();

export const homepageInputSchema = z
  .string()
  .min(3, 'Минимум 3 символа')
  .max(40, 'Максимум 40 символов')
  .regex(
    /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
    'Используйте только буквы, цифры и пробелы'
  );
