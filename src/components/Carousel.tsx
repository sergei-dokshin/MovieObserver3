'use client';

import { POSTER_BASE_URL } from '@/constants/tmdbAPI';
import { APIMovie } from '@/types/movie';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  moviesList: APIMovie[];
  timeInterval: number;
}

export default function Carousel({ moviesList, timeInterval }: CarouselProps) {
  const movies = moviesList.slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Функция для сброса таймера
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Автоматическая прокрутка слайдов
  useEffect(() => {
    resetTimeout();
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, timeInterval);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isHovered, timeInterval]);

  // Переход к следующему слайду (зацикливание)
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  // Переход к предыдущему слайду (зацикливание)
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  // Переход к конкретному слайду
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-[200px] xs:w-[300px] overflow-hidden m-2 sm:m-4 rounded-md sm:rounded-xl border-2 border-white/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="min-w-full relative"
          >
            <Image
              src={`${POSTER_BASE_URL}/w780${movie.poster_path}`}
              width={400}
              height={300}
              alt={`Movie poster ${movie.title}`}
              className="w-full h-60 xs:h-90 object-cover object-center"
            />
          </Link>
        ))}
      </div>

      {/* Стрелки */}
      <ArrowLeftIcon
        onClick={goToPrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white/70 hover:text-white h-8 w-4 rounded-full z-10 cursor-pointer transition"
        aria-label="Previous"
      />

      <ArrowRightIcon
        onClick={goToNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white/70 hover:text-white h-8 w-4 rounded-full z-10 cursor-pointer transition"
        aria-label="Next"
      />

      {/* IИндикаторы слайдов (точки) */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10 bg-black/50 rounded-xl py-1.5 px-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            } hover:bg-white`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
