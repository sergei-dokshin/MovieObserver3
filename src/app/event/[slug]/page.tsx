import H1 from '@/components/H1';
import Section from '@/components/section/section';
import SectionHeading from '@/components/section/section-heading';
import SectionParagraph from '@/components/section/section-paragraph';
import { getEvent } from '@/services/events-server.service';
import { Metadata } from 'next';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;

  const event = await getEvent(slug);

  return {
    title: event ? 'Festival - ' + event.name : 'Festival'
  };
};

// делаем статичные страницы для самых популярных событий
export const generateStaticParams = async () => {
  return [
    { slug: 'science-space-expo' },
    { slug: 'global-food-festival' },
    { slug: 'harmony-festival' }
  ];
};

const EventPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const event = await getEvent(slug);

  return (
    <main>
      {event && (
        <>
          <section className="relative min-h-[320px] overflow-hidden flex justify-center items-center py-15 lg:py-20">
            <Image
              src={event.imageUrl}
              className="object-cover blur-3xl "
              alt="Event background image"
              fill
              quality={50}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="flex flex-col gap-x-4 lg:gap-x-8 md:flex-row relative z-1">
              <Image
                src={event.imageUrl}
                alt="Event image"
                height={380}
                width={260}
                className="border-white/50 border-2 rounded-xl w-full object-cover"
              />
              <div className="flex flex-col items-center md:items-start">
                <p className=" text-white/75 font-bold mt-2 md:mt-0">
                  {new Date(event.date).toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <H1 className="mb-2 mt-1 whitespace-nowrap">{event.name}</H1>
                <p className="whitespace-nowrap  text-white/75">
                  Organized by{' '}
                  <span className="italic">{event.organizerName}</span>
                </p>
                <button className="bg-white/20 py-2 px-6 rounded-md mt-5 md:mt-auto w-full border-white/10 border-2 state-effects cursor-pointer">
                  Купить билеты
                </button>
              </div>
            </div>
          </section>
          <div className="text-center p-6 sm:p-10 min-h-[60vh]">
            <Section className="mb-15">
              <SectionHeading className="text-2xl mb-4">
                О мероприятии
              </SectionHeading>
              <SectionParagraph>{event.description}</SectionParagraph>
            </Section>

            <Section>
              <SectionHeading className="mb-1">Место</SectionHeading>
              <SectionParagraph>{event.location}</SectionParagraph>
            </Section>
          </div>
        </>
      )}
    </main>
  );
};

export default EventPage;
