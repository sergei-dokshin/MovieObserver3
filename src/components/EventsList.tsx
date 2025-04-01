import EventCard from './EventCard';
import { getEventsList } from '@/services/events-server.service';
import PaginationControls from './PaginationControls';

type EventsListPage = {
  city: string;
  page?: number;
};

const EventsList = async ({ city, page = 1 }: EventsListPage) => {
  const { events, totalEvents } = await getEventsList(city, page);

  const prevPage = page > 1 ? `/events/${city}?page=${page - 1}` : '';
  const nextPage =
    totalEvents > page * 6 ? `/events/${city}?page=${page + 1}` : '';

  return (
    <section className="flex flex-wrap gap-8 justify-center max-w-[1400px] px-5">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}

      <PaginationControls prevPage={prevPage} nextPage={nextPage} />
    </section>
  );
};

export default EventsList;
