import { useRef, useState } from 'react';
import { Movie } from '@/types/movie';

export default function useMovieTooltip(tooltipWidth: number) {
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    movie: Movie | null;
    width: number;
    x: number;
    y: number;
    alignLeft: boolean;
  }>({
    show: false,
    movie: null,
    width: tooltipWidth,
    x: 0,
    y: 0,
    alignLeft: false
  });

  const handleMouseEnter = (event: React.MouseEvent, movie: Movie) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

    const { clientX, clientY } = event;
    const screenWidth = window.innerWidth;
    const alignLeft = clientX + tooltip.width > screenWidth - 20; // проверяем нужно ли отобразить подсказку слева от курсора(если не помещается на экран)

    tooltipTimeout.current = setTimeout(() => {
      setTooltip({
        show: true,
        movie,
        width: tooltipWidth,
        x: alignLeft ? clientX - tooltip.width - 10 : clientX + 5,
        y: clientY - 40,
        alignLeft
      });
    }, 550);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltip({
      show: false,
      movie: null,
      width: tooltipWidth,
      x: 0,
      y: 0,
      alignLeft: false
    });
  };

  return {
    tooltip,
    handleMouseEnter,
    handleMouseLeave
  };
}
