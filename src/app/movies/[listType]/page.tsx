import H1 from '@/components/H1';
import MovieDetailsModal from '@/components/MovieDetailsModal';
import MoviesListClient from '@/components/MoviesListClient';
import { movieListsConfig } from '@/constants/moviesListConfig';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    listType: keyof typeof movieListsConfig;
  };
};

const MoviesListPage = async ({ params }: Props) => {
  const awaitedParams = await params;
  const config = movieListsConfig[awaitedParams.listType];

  if (!config) return notFound();

  const initialMoviesList = await config.fetcher();

  return (
    <main className="flex flex-col items-center p-5 min-h-[110vh]">
      <H1 className="mb-5 text-md lg:text-xl italic text-white/60">
        {config.title}
      </H1>
      <MoviesListClient
        initialMoviesList={initialMoviesList}
        listType={awaitedParams.listType}
      />
    </main>
  );
};

export default MoviesListPage;
