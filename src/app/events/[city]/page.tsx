import EventsList from '@/components/EventsList';
import H1 from '@/components/H1';
import { Suspense } from 'react';
import Loading from './loading';
import { Metadata } from 'next';
import { pageNumberSchema } from '@/types/zod.schema';

type MetadataProps = {
  params: Promise<{ city: string }>;
};

type EventsProps = MetadataProps & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({
  params
}: MetadataProps): Promise<Metadata> => {
  const awaitedParams = await params;
  const city = awaitedParams.city;

  return {
    title:
      city === 'all'
        ? 'Festival - Все события'
        : `Festival - интересное в ${city.charAt(0).toUpperCase() + city.slice(1)}`
  };
};

const EventsPage = async ({ params, searchParams }: EventsProps) => {
  const { city } = await params;
  const { page } = await searchParams;

  const validatedPage = pageNumberSchema.safeParse(page);

  if (!validatedPage.success) {
    throw new Error('Invalid page number');
  }

  return (
    <main className="flex flex-col items-center py-15 px-5 min-h-[110vh]">
      {city === 'All' ? (
        <H1 className="mb-20">Все события:</H1>
      ) : (
        <H1 className="mb-20">События в городе {city}:</H1>
      )}

      {/* key аттрибут позволяет вызывать fallback элемент при изменении страницы */}
      <Suspense
        key={city + validatedPage.data}
        fallback={<Loading />}
      >
        {/* оператор "+" из числа делает строку */}
        <EventsList city={city} page={validatedPage.data} />
      </Suspense>
    </main>
  );
};

export default EventsPage;
