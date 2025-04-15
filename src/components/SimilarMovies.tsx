'use client';

import Link from 'next/link';
import Section from './section/Section';
import SectionHeading from './section/SectionHeading';
import { getSimilarMovies } from '@/services/movies.service';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { APIMovie, Movie } from '@/types/movie';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { createPortal } from 'react-dom';

const SimilarMovies = ({ id }: { id: string }) => {
  const [similarMovies, setSimilarMovies] = useState<APIMovie[]>([]);
  const scrollRef = useRef<HTMLElement | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    movie?: Movie | null;
    x: number;
    y: number;
    alignLeft: boolean;
  }>({
    show: false,
    movie: null,
    x: 0,
    y: 0,
    alignLeft: false
  });

  const handleMouseEnter = (event: React.MouseEvent, movie: any) => {
    if (!scrollRef.current) return;
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

    const { clientX, clientY } = event;
    const tooltipWidth = 336; // Ожидаемая ширина подсказки
    const screenWidth = window.innerWidth;

    // Проверяем, поместится ли подсказка справа
    const alignLeft = clientX + tooltipWidth > screenWidth - 20; // -20 для отступа от края

    tooltipTimeout.current = setTimeout(() => {
      setTooltip({
        show: true,
        movie,
        x: alignLeft ? clientX - tooltipWidth - 10 : clientX + 5, // Сдвигаем влево, если не помещается
        y: clientY - 140,
        alignLeft
      });
    }, 550);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltip({ show: false, movie: null, x: 0, y: 0, alignLeft: false });
  };

  useEffect(() => {
    async function fetchData() {
      const moviesArray = await getSimilarMovies(id);
      setSimilarMovies(moviesArray);
    }
    fetchData();
  }, []);

  // Прокрутка вправо
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  // Прокрутка влево
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  return (
    <Section className="w-full relative">
      <SectionHeading className="mb-4">Рекомендуемое:</SectionHeading>

      <section
        className="flex gap-x-1 overflow-x-auto overscroll-x-contain w-[90%] bg-white/10 p-1 sm:p-3 rounded-t-md scroll-smooth relative"
        ref={scrollRef}
      >
        {similarMovies.slice(0, 15).map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            onMouseEnter={(event) => handleMouseEnter(event, movie)}
            onMouseLeave={handleMouseLeave}
            className="flex flex-col items-center h-full w-20 bg-white/5 hover:bg-white/15 rounded-md shadow-md transition flex-shrink-0 relative"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt="poster"
              height={88}
              width={72}
              className="h-22 w-18 rounded-md object-cover bg-gray-600 pointer-events-none"
            />
            <p className="absolute top-1 right-2 bg-amber-500 rounded-sm px-1 text-white text-xs font-bold pointer-events-none">
              {movie.vote_average?.toFixed(1)}
            </p>
            <div className="flex flex-col items-center gap-1 w-full h-full p-1 pointer-events-none">
              <p className="text-white text-xs w-full truncate">
                {movie.title}
              </p>
              <p className="text-gray-400 text-xs font-bold p-0">
                {movie.release_date?.split('-')[0] || 'N/A'}
              </p>
            </div>
          </Link>
        ))}
        {/* Всплывающее окно с доп. информацией (портал в body) */}
        {tooltip.show &&
          tooltip.movie &&
          createPortal(
            <div
              className="fixed bg-gray-800 text-white text-xs p-3 rounded-md shadow-md w-84 z-50 pointer-events-none"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                maxWidth: '336px'
              }}
            >
              <p className="text-sm font-bold">{tooltip.movie.title}</p>
              <p className="text-gray-400">
                {tooltip.movie.overview.slice(0, 300) + '...'}
              </p>
            </div>,
            document.body
          )}
      </section>
      <div
        onClick={scrollLeft}
        className="absolute bg-gray-600 p-1 rounded-sm cursor-pointer hover:bg-gray-500 transition scale-150 z-4 top-[50%] left-[25px]"
      >
        <ArrowLeftIcon />
      </div>
      <div
        onClick={scrollRight}
        className="absolute bg-gray-600 p-1 rounded-sm cursor-pointer hover:bg-gray-500 transition scale-150 z-2 top-[50%] right-[25px]"
      >
        <ArrowRightIcon />
      </div>
    </Section>
  );
};

export default SimilarMovies;
