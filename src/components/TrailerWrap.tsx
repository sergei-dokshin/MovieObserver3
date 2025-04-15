import { getMovieTrailer } from '@/services/trailer.service';
import SectionHeading from './section/SectionHeading';

interface TrailerWrapProps {
  movieId: string;
}

const TrailerWrap = async ({ movieId }: TrailerWrapProps) => {
  const trailer = await getMovieTrailer(movieId);

  return (
    <section className="flex flex-col items-center mb-20">
      <SectionHeading className="mb-5">"{trailer?.name}"</SectionHeading>
      {trailer ? (
        <iframe
          className="rounded-md shadow-xl border-white/50 border-2 shadow-white/15"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div>Трейлер отсутствует</div>
      )}
    </section>
  );
};

export default TrailerWrap;
