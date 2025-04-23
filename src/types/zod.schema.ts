'use client';

import { z } from 'zod';

// приводим значение к числу(если возможно) и валидируем
export const pageNumberSchema = z.coerce.number().int().positive().optional();

// input для поиска фильмов
export const homepageInputSchema = z
  .string()
  .min(3, 'Минимум 3 символа')
  .max(40, 'Максимум 40 символов')
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, 'Используйте только буквы, цифры и пробелы');

// Форма регистрации
export const registerSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z
    .string()
    .min(6, 'Минимум 6 символов')
    .regex(
      /^[A-Za-z0-9!@#$%^&*()_+=-]+$/,
      'Допускаются только латинские буквы и символы'
    )
    .regex(/[a-z]/, 'Минимум одная строчная буква')
    .regex(/[A-Z]/, 'Минимум одна заглавная буква')
    .regex(/[0-9]/, 'Минимум одна цифра')
});
