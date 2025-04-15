'use client';

import useDebounce from '@/hooks/useDebounce';
import useMoviesSearch from '@/hooks/useMoviesSearch';
import { homepageInputSchema } from '@/types/zod.schema';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import GenreBadge from './GenreBadge';

interface SearchFormProps {
  className?: string;
}

const SearchForm = ({ className }: SearchFormProps) => {
  const [search, setSearch] = useState('');
  const [inputError, setInputError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const debouncedSearch = useDebounce(search, 400);

  const { movies } = useMoviesSearch(debouncedSearch); // isLoading, isError - сделать позже

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedSearch = homepageInputSchema.safeParse(search); // Валидация Zod

    if (!validatedSearch.success) {
      setInputError(validatedSearch.error.errors[0].message);
      return;
    }

    setInputError('');
    setIsVisible(false);
    router.push(`/movies?request=${encodeURIComponent(search.trim())}`);
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
          type="text"
          placeholder="Поиск фильмов..."
          spellCheck={false}
          className={cn(
            `sm:w-[600px] h-12 rounded-lg bg-white/[7%] pr-12 pl-6 outline-none ring-accent/50 focus:ring-2 focus:bg-white/10 transition ${inputError && 'ring-2 ring-red-700'}`,
            className
          )}
        />
        <MagnifyingGlassIcon
          onClick={(e) => {
            e.preventDefault();
            (e.target as HTMLElement).closest('form')?.requestSubmit();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 scale-180 hover:text-accent/85 transition cursor-pointer"
        />
      </div>

      {movies.length > 0 && isVisible && (
        <ul className="w-full absolute top-[125%] bg-gray-900 p-1 sm:p-3 rounded-md z-10">
          {movies.slice(0, 5).map((movie) => (
            <li
              key={movie.id}
              className="flex items-center relative h-20 cursor-pointer transition bg-white/5 hover:bg-white/10 rounded-md mb-2"
            >
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center justify-start w-full h-full"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt="poster"
                  height={70}
                  width={60}
                  className="h-17 w-14 rounded-md object-cover bg-gray-600 mx-1 sm:mx-3"
                />
                <div className="flex flex-col justify-start gap-1 w-full h-full p-1">
                  <p className="text-white text-sm sm:text-base w-[70%] truncate">
                    {movie.title}
                  </p>
                  <p className="text-gray-400 text-xs font-bold p-0">
                    {movie.release_date?.split('-')[0] || 'N/A'}
                  </p>
                  <div className="flex gap-x-2 sm:gap-x-2 text-gray-400 mt-auto w-[60%] sm:w-[80%] overflow-hidden">
                    {movie.genres.slice(0, 4).map((genre) => (
                      <GenreBadge genre={genre} key={genre.id}/>
                    ))}
                  </div>
                </div>
                <p className="absolute top-2 right-2 bg-amber-500 rounded-sm px-1 text-white text-sm font-bold">
                  {movie.vote_average?.toFixed(1)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchForm;
