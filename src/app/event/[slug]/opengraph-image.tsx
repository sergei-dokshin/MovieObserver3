import { getEvent } from '@/services/events-server.service';
import { ImageResponse } from 'next/og';

export const alt = 'Festival';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) {
    return new Response('Event not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div tw="relative w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <img
          src={event.imageUrl}
          alt={event.name}
          tw="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div tw="relative flex flex-col items-center px-10 py-6 bg-black/60 rounded-xl">
          <h1 tw="text-5xl font-bold">{event.name}</h1>
          <p tw="text-xl mt-2">Festival - интересное вокруг Вас!</p>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
