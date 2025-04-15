'use client';

import { APIMovie } from '@/types/movie';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import MovieCard from './MovieCard';
import SkeletonCard from './sceleton/skeleton-card';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { movieListsConfig } from '@/constants/moviesListConfig';
import MovieDetailsModal from './MovieDetailsModal';

interface MoviesListClient {
  initialMoviesList: APIMovie[];
  listType: keyof typeof movieListsConfig;
}

const MoviesListClient = ({
  initialMoviesList,
  listType
}: MoviesListClient) => {
  const [movies, setMovies] = useState(initialMoviesList);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const fetcher = movieListsConfig[listType].fetcher;

  // При listType === "now_playing" подгрузка не нужна
  const { isLoading } = useSWR(
    listType !== 'now_playing' ? ['moviesList', page] : null,
    () => fetcher(page),
    {
      revalidateOnFocus: false,
      onSuccess: (newMovies) => {
        const total = movies.length + newMovies.length;

        // В списке максимум 250 фильмов
        if (newMovies.length === 0 || total >= 250) {
          setHasMore(false);
          //  Обрезаем массив если загружено больше
          if (total > 250) {
            const remaining = 250 - movies.length;
            setMovies((prev) => [...prev, ...newMovies.slice(0, remaining)]);
            return;
          }
        }

        setMovies((prev) => [...prev, ...newMovies]);
      }
    }
  );

  // Подгружаем новые данные при появлении последнего элемента в области видимости
  const loadMore = () => {
    // Для "now_playing" не используем подгрузку при скроллинге
    if (listType !== 'now_playing') {
      setPage((prev) => prev + 1);
    }
  };
  const observe = useInfiniteScroll({
    hasMore,
    isLoading,
    onIntersect: loadMore
  });

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      observe(node);
    },
    [observe]
  );

  return (
    <section className="flex flex-wrap gap-8 justify-center max-w-[1400px] px-5 relative">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          ref={index === movies.length - 1 ? lastMovieRef : null}
        >
          <MovieCard
            movie={movie}
            index={listType === 'top250' ? index + 1 : null}
            setSelectedMovieId={setSelectedMovieId}
          />
        </div>
      ))}

      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

      {selectedMovieId && (
        <MovieDetailsModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </section>
  );
};

export default MoviesListClient;
