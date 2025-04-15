import { API_KEY, BASE_URL } from '@/constants/tmdbAPI';
import { Trailer, TrailersList } from '@/types/movie';

export const getMovieTrailer = async (id: string): Promise<Trailer | null> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) throw new Error('Ошибка загрузки фильма');

  const data: TrailersList = await response.json();
  return (
    data.results.find((video) => video.type === 'Trailer') ||
    data.results.find((video) => video.type === 'Teaser') ||
    null
  );
};
