'server-only'; // экспортируемые функции могут быть использованы только в серверных компонентах
import { Event } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

type EventsListProps = {
  totalEvents: number;
  events: Event[];
};

export const getEventsList = unstable_cache(
  async (city: string, page = 1): Promise<EventsListProps> => {
    try {
      // если указать undefined, то вернет все event из базы
      const events = await prisma.event.findMany({
        where: {
          city:
            city === 'all' ? undefined : { equals: city, mode: 'insensitive' }
        },
        orderBy: { date: 'asc' },

        take: 6,
        skip: (page - 1) * 6 // пропускаем указанное количество событий в зависимости от страницы(для пагинации)
      });

      // Общее количество событий ( для пагинации )
      const totalEvents = await prisma.event.count({
        where: {
          city:
            city === 'all' ? undefined : { equals: city, mode: 'insensitive' }
        }
      });

      return {
        totalEvents,
        events
      };
    } catch (error) {
      console.error('Ошибка при получении событий:', error);
      throw new Error('Не удалось получить события');
    }
  },
  ['events'],
  { revalidate: 60 } // кэш не более 1 минуты
);

export const getEvent = unstable_cache(
  async (slug: string): Promise<Event | null> => {
    const event = await prisma.event.findUnique({
      where: { slug }
    });

    if (!event) {
      return notFound();
    }

    return event;
  }
);
