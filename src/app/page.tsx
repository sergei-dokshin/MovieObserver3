import Carousel from '@/components/Carousel';
import GenreBadge from '@/components/GenreBadge';
import H1 from '@/components/H1';
import SearchForm from '@/components/SearchForm';
import Section from '@/components/section/Section';
import SectionHeading from '@/components/section/SectionHeading';
import { popGenres } from '@/constants/pop-genres';
import { getPopularMovies } from '@/services/movies.service';
import Link from 'next/link';

const HomePage = async () => {
  const popularMovies = await getPopularMovies();

  return (
    <main className="flex flex-col items-center px-2 pt-20 min-h-[120vh]">
      <H1>Все фильмы планеты!</H1>
      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-90">
        Поиск среди{' '}
        <span className="font-bold italic text-accent">более 447 млн.</span>{' '}
        фильмов и сериалов
      </p>

      <SearchForm />

      {/* Поиск по жанрам */}
      <section className="flex items-center mt-4 mb-3 gap-x-4 text-sm text-white/50">
        <p>Популярные жанры:</p>
        <div className="flex flex-nowrap items-center gap-2 font-semibold">
          {popGenres.map((item) => (
            <Link href="" className="hover:text-accent/80" key={item.id}>
              <GenreBadge genre={item} />
            </Link>
          ))}
        </div>
      </section>

      {/* Карусель */}
      <Section className="mt-15">
        <SectionHeading>Чаще всего ищут:</SectionHeading>
        <Carousel moviesList={popularMovies} timeInterval={4000} />
      </Section>
    </main>
  );
};

export default HomePage;
