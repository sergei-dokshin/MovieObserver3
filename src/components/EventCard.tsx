'use client';
import { Event } from '@prisma/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

type EventCardType = {
  event: Event;
};

const EventCard = ({ event }: EventCardType) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0.2 1', '1.5 1'] // Отслеживаем положение элемента
  });

  // scale меняется от 0.8 до 1 при прокрутке
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="flex-1 h-70 basis-70 max-w-[400px] min-w-[280px]"
    >
      <Link href={`/event/${event.slug}`} className="block w-full h-full">
        <div className="w-full h-full bg-white/[3%] flex flex-col rounded-xl overflow-hidden relative state-effects">
          <Image
            src={event.imageUrl}
            alt={event.name}
            height={230}
            width={400}
            className="w-full h-[60%] object-cover"
          />
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p className="italic text-white/75">By {event.organizerName}</p>
            <p className="sm text-white/50 mt-2">{event.location}</p>
          </div>
          <div className="absolute left-[0.75rem] top-[0.75rem] w-[2.8rem] h-[2.8rem] bg-black/40 flex flex-col items-center rounded-md -mb-[5px]">
            <p className="text-xl font-bold">
              {new Date(event.date).toLocaleDateString('en-US', {
                day: '2-digit'
              })}
            </p>
            <p className="text-xs uppercase text-accent">
              {new Date(event.date).toLocaleDateString('ru-RU', {
                month: 'short'
              })}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
