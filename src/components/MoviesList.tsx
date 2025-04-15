import MovieCard from './MovieCard';
import { APIMovie } from '@/types/movie';

type EventsListPage = {
  movies: APIMovie[];
};

const MoviesList = ({ movies }: EventsListPage) => {
  return (
    <section className="flex flex-wrap gap-8 justify-center max-w-[1400px] px-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </section>
  );
};

export default MoviesList;
