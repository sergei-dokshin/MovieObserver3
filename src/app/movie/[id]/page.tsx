import GenreBadge from '@/components/GenreBadge';
import H1 from '@/components/H1';
import Section from '@/components/section/Section';
import SectionHeading from '@/components/section/SectionHeading';
import SectionParagraph from '@/components/section/SectionParagraph';
import SimilarMovies from '@/components/SimilarMovies';
import TrailerWrap from '@/components/TrailerWrap';
import { getMovie, getMovieCast } from '@/services/movies.service';
import { runtimeFormatter } from '@/utils/runtimeFormatter';
import { li } from 'framer-motion/client';
import { Metadata } from 'next';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params
}: PageProps): Promise<Metadata> => {
  const { id } = await params;

  const movie = await getMovie(id);

  return {
    title: `${movie.title} (${movie.release_date}) - MovieObserver`
  };
};

const EventPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const movie = await getMovie(id);
  const movieCast = await getMovieCast(id);

  return (
    <main className="w-full">
      {movie && (
        <>
          <section className="w-full flex flex-col items-center md:flex-row justify-center relative overflow-hidden py-5 lg:py-10 h-full">
            <Image
              className="object-cover blur-3xl"
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt="Movie page background image"
              fill
              quality={50}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 lg:gap-x-8 py-3 relative z-3 h-full w-full bg-black/30 shadow-[0_0_12px_rgba(0,0,0,0.8)]">
              <Image
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt="Event image"
                height={380}
                width={260}
                className="h-auto w-auto border-white/50 border-2 rounded-xl object-cover"
              />

              <div className="flex flex-col items-center md:items-start min-w-0 h-full ">
                <H1 className="mb-2 mt-1 text-center sm:text-start">
                  {movie.title}
                </H1>
                <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start flex-nowrap items-center gap-3">
                  <p className="text-white/75 text-center">
                    ( {movie.original_title} )
                  </p>
                  <p className="text-white/75 font-bold">
                    {new Date(movie.release_date).toLocaleDateString('ru-RU')}
                  </p>
                </div>

                <section className="flex flex-col mt-auto">
                  <p className="text-sm/tight text-white/60 py-2 border-b-1 border-white/20">
                    Рейтинг: ⭐
                    <span className="italic text-white font-bold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </p>

                  <p className="text-sm/tight text-white/60 py-2 border-b-1 border-white/20 ">
                    Режиссер:{' '}
                    <span className="italic text-white">
                      {movieCast.crew
                        .map((director) => director.name)
                        .join(', ')}
                    </span>
                  </p>

                  <p className="text-sm/tight text-white/60 py-2 border-b-1 border-white/20">
                    В ролях:{' '}
                    <span className="italic text-white">
                      {movieCast.cast
                        .slice(0, 3)
                        .map((actor) => actor.name)
                        .join(', ')}
                    </span>
                  </p>

                  <p className="text-sm/tight text-white/60 py-2 border-b-1 border-white/20 line">
                    Продолжительность:{' '}
                    <span className="italic text-white text-xs">
                      {runtimeFormatter(movie.runtime)}
                    </span>
                  </p>

                  <p className="text-sm/tight text-white/60 py-2 border-b-1 border-white/20">
                    Страна:{' '}
                    <span className="italic text-white">
                      {movie.production_countries
                        .slice(0, 3)
                        .map((country) => country.name)
                        .join(', ')}
                    </span>
                  </p>

                  <div className="w-full flex flex-nowrap items-center justify-center sm:justify-start gap-2 mt-2">
                    {movie.genres.slice(0, 4).map((genre) => (
                      <GenreBadge key={genre.id} genre={genre} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </section>
          <div className="w-full text-center p-6 sm:p-10 min-h-[60vh]">
            <Section className="mb-15">
              <SectionHeading className="text-2xl mb-4">Сюжет</SectionHeading>
              <SectionParagraph>{movie.overview}</SectionParagraph>
            </Section>

            <TrailerWrap movieId={id} />

            <SimilarMovies id={id} />
          </div>
        </>
      )}
    </main>
  );
};

export default EventPage;
