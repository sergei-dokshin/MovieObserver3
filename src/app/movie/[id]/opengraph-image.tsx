import { POSTER_BASE_URL } from '@/constants/tmdbAPI';
import { getMovie } from '@/services/movies.service';
import Image from 'next/image';
import { ImageResponse } from 'next/og';

export const alt = 'Movie Observer';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function OpengraphImage({
  params
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  if (!movie) {
    return new Response('Movie not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div tw="relative w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <Image
          src={`${POSTER_BASE_URL}/w400${movie.poster_path}`}
          alt={movie.title}
          tw="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div tw="relative flex flex-col items-center px-10 py-6 bg-black/60 rounded-xl">
          <h1 tw="text-5xl font-bold">{movie.title}</h1>
          <p tw="text-xl mt-2">Movie Observer - все фильмы планеты!</p>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
