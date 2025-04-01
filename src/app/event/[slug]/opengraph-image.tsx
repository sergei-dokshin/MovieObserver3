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

  return new ImageResponse(
    (
      <section>
        <div
          style={{
            fontSize: 48,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {event?.name}
        </div>
        <p>Festival - интересное вокруг Вас!</p>
      </section>
    ),
    {
      ...size
    }
  );
}
