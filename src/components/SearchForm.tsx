'use client';
import { cityInputSchema } from '@/types/zod.schema';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const SearchForm = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedSearch = cityInputSchema.safeParse(search); // Валидация Zod

    if (!validatedSearch.success) {
      setError(validatedSearch.error.errors[0].message);
      return;
    }

    setError('');
    router.push(`/events/${search}`);
  };

  return (
    <form className="w-full sm:w-[600px]" onSubmit={handleSubmit}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Найти события в Вашем городе..."
        spellCheck={false}
        className={`w-full h-12 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 focus:ring-2 focus:bg-white/10 transition ${error && 'ring-2 ring-red-700'}`}
      />
      {error && (
        <p className="text-red-700 mt-2 text-sm italic text-center">{error}</p>
      )}
    </form>
  );
};

export default SearchForm;
