'use client';

import { POSTER_BASE_URL } from '@/constants/tmdbAPI';
import { APIMovie } from '@/types/movie';
import { BookmarkIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useRef } from 'react';

type MovieCard = {
  movie: APIMovie;
  index?: number | null;
  setSelectedMovieId?: Dispatch<SetStateAction<string | null>>;
};

const MovieCard = ({ movie, index, setSelectedMovieId }: MovieCard) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0.2 1', '1.5 1'] // Отслеживаем положение элемента
  });

  // scale меняется от 0.8 до 1 при прокрутке
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/movie/${id}`);
  };

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="flex-1 h-70 basis-40 max-w-[250px] min-w-[200px] relative"
    >
      <div
        className="block w-full h-full cursor-pointer"
        onClick={() => handleCardClick(movie.id)}
      >
        <div className="w-full h-full bg-white/[3%] flex flex-col rounded-xl overflow-hidden state-effects">
          <Image
            src={`${POSTER_BASE_URL}/w342${movie.poster_path}`}
            alt="Movie poster"
            height={230}
            width={400}
            className="w-full h-full object-cover"
          />
          <div className="flex-1 flex flex-col items-center justify-center w-full absolute bottom-0 bg-gray-900/95 p-1">
            <h2 className="font-semibold text-center line-clamp-2">
              <span className="text-accent/50 font-bold">
                {index && index + '.'}
              </span>{' '}
              {movie.title}
            </h2>
            <p className="text-xs font-bold italic text-white/75">
              {new Date(movie.release_date).getFullYear() || ''}
            </p>
          </div>
          <div className="absolute right-[0.25rem] top-[0.25rem] bg-black/60 flex flex-col items-center rounded-md px-1 py-0.5">
            <p className="text-sm font-bold">{movie.vote_average.toFixed(1)}</p>
          </div>

          <div className="absolute left-[0.25rem] top-[0.25rem] bg-black/60 flex flex-col items-center justify-center gap-2 rounded-md px-1 py-0.5 w-[35px] h-[55px]">
            <InfoCircledIcon
              className="scale-150 text-white/70 hover:text-accent transition"
              onClick={(e) => {
                e.stopPropagation();
                if (setSelectedMovieId) {
                  setSelectedMovieId(movie.id);
                }
              }}
            />
            <BookmarkIcon className="scale-150 text-white/70 hover:text-accent transition" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
