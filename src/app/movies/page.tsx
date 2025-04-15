import MoviesList from '@/components/MoviesList';
import H1 from '@/components/H1';
import { Metadata } from 'next';
import { getMoviesList } from '@/services/movies.service';

type EventsProps = {
  searchParams: Promise<{ request: string }>;
};

export const metadata: Metadata = {
  title: 'MovieObserver - Search'
};

const MoviesPage = async ({ searchParams }: EventsProps) => {
  const { request } = await searchParams;

  const movies = await getMoviesList(request);

  return (
    <main className="flex flex-col items-center p-5 min-h-[110vh]">
      <H1 className="mb-5 text-md lg:text-xl italic text-white/60">
        Поиск по запросу &quot;{request}&quot;:
      </H1>
      <MoviesList movies={movies} />
    </main>
  );
};

export default MoviesPage;
