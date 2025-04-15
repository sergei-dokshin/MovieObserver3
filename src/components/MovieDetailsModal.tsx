'use client';

import React, { useEffect, useState } from 'react';
import { getMovie } from '@/services/movies.service';
import { Movie } from '@/types/movie';
import Image from 'next/image';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import GenreBadge from './GenreBadge';
import { runtimeFormatter } from '@/utils/runtimeFormatter';

interface MovieDetailsModalProps {
  movieId: string;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movieId,
  onClose
}) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  // useEffect для загрузки данных фильма
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovie(movieId);
        setMovie(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  return (
    movie && (
      <div
        onClick={onClose}
        className="fixed top-0 left-0 bg-black/90 w-full h-full flex items-center justify-center z-30"
      >
        <div className="flex flex-col items-center w-full max-w-[550px] max-h-[80vh] mx-4 bg-gray-800 rounded-md p-5 border-2 border-white/50 relative overflow-auto">
          <div className="flex flex-col sm:flex-row sm:flex-nowrap items-center gap-2">
            <Image
              src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`}
              alt="Movie Poster"
              height={230}
              width={400}
              className="h-42 w-auto object-cover rounded-md shadow-md"
            />

            <section className="flex flex-col items-center sm:items-start">
              <h2 className="text-xl">{movie?.title}</h2>
              <p className="text-sm/tight text-white/60 py-2 border-b-1 border-white/20">
                Рейтинг: ⭐
                <span className="italic text-white font-bold">
                  {movie?.vote_average.toFixed(1)}
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

          <p className="text-white/60 text-center mt-4">{movie?.overview}</p>

          <CrossCircledIcon
            onClick={onClose}
            className="scale-190 text-white/50 absolute top-3 right-3 hover:text-white/85 transition cursor-pointer"
          />
        </div>
      </div>
    )
  );
};

export default MovieDetailsModal;
