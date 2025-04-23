import { BASE_URL } from '@/constants/tmdbAPI';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getGenres = async (): Promise<{ id: number; name: string }[]> => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Ошибка при загрузке жанров');
  }
  const data = await response.json();
  return data.genres;
};
