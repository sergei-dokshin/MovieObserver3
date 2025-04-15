import useSWR from 'swr';
import { useMemo } from 'react';
import { APIMovie } from '@/types/movie';
import { getMoviesList } from '@/services/movies.service';
import { getGenres } from '@/services/genres.service';
import { Genre } from '@/types/movie';

const useMoviesSearch = (query: string) => {
  const {
    data: moviesData,
    error: moviesError,
    isLoading: isLoadingMovies
  } = useSWR<APIMovie[]>(
    query ? ['movies', query] : null,
    () => getMoviesList(query),
    { shouldRetryOnError: false }
  );

  const {
    data: genresData,
    error: genresError,
    isLoading: isLoadingGenres
  } = useSWR<Genre[]>('genres', getGenres);

  const isLoading = isLoadingMovies || isLoadingGenres;
  const isError = moviesError || genresError;

  const moviesWithGenres = useMemo(() => {
    if (!moviesData || !genresData) return [];

    return moviesData.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map(
        (id) => genresData.find((g) => g.id === id) ?? { id, name: 'Unknown' }
      )
    }));
  }, [moviesData, genresData]);

  return {
    movies: moviesWithGenres,
    isLoading,
    isError
  };
};

export default useMoviesSearch;
