import { BASE_URL } from '@/constants/tmdbAPI';
import { CrewMember, MovieCast } from '@/types/cast';
import { APIMovie, Movie, MoviesList } from '@/types/movie';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getMoviesList = async (query: string): Promise<APIMovie[]> => {
  if (!query) return [];

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  const data: MoviesList = await response.json();

  // Сортируем по рейтингу (vote_average) в порядке убывания
  // return data.results.sort((a, b) => b.vote_average - a.vote_average) || [];
  return data.results || [];
};

export const getMovie = async (id: string): Promise<Movie> => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

  if (!response.ok) throw new Error('Ошибка загрузки фильма');

  const data: Movie = await response.json();
  return data;
};

export const getMovieCast = async (id: string): Promise<MovieCast> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: MovieCast = await response.json();

    return {
      ...data,
      crew: data.crew.filter((member: CrewMember) => member.job === 'Director') // Только режиссёры
    };
  } catch (error) {
    console.error('Ошибка при получении данных о съёмочной группе:', error);
    return { id: null, cast: [], crew: [] };
  }
};

export const getSimilarMovies = async (id: string): Promise<APIMovie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: MoviesList = await response.json();

    return data.results || [];
  } catch (error) {
    console.error('Ошибка при получении похожих фильмов:', error);
    return [];
  }
};

export const getTopRatedMovies = async (page = 1): Promise<APIMovie[]> => {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data.results;
};

export const getPopularMovies = async (page = 1): Promise<APIMovie[]> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data.results;
};

export const getNowPlayingMovies = async (page: number = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data.results;
};
