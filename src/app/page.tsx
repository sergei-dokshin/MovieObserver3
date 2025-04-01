import H1 from '@/components/H1';
import SearchForm from '@/components/SearchForm';
import Link from 'next/link';

const popCities = [
  {
    name: 'Москва',
    path: '/events/moskva'
  },
  {
    name: 'Краснодар',
    path: '/events/krasnodar'
  }
];

export default function Home() {
  return (
    <main className="flex flex-col items-center px-2 pt-30">
      <H1>Интересное рядом с Вами!</H1>
      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-70">
        Более{' '}
        <span className="font-bold italic underline text-accent">
          10,000 событий
        </span>{' '}
        вокруг Вас
      </p>

      <SearchForm />

      <section className="flex mt-4 mb-3 gap-x-4 text-sm text-white/50">
        <p>Популярное:</p>
        <div className="space-x-2 font-semibold">
          {popCities.map((city) => (
            <Link
              href={city.path}
              className="hover:text-white/80"
              key={city.name}
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
