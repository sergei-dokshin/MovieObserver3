import { Movie } from '@/types/movie';

type Props = {
  tooltip: {
    show: boolean;
    movie: Movie | null;
    width: number;
    x: number;
    y: number;
    alignLeft: boolean;
  };
};

const Tooltip = ({ tooltip }: Props) => {
  if (!tooltip.show || !tooltip.movie) return null;

  return (
    <div
      className="fixed bg-gray-800 text-white text-xs p-3 rounded-md shadow-md w-84 z-50 pointer-events-none"
      style={{
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        maxWidth: tooltip.width
      }}
    >
      <p className="text-sm font-bold line-clamp-2">{tooltip.movie.title}</p>
      <p className="text-gray-400 line-clamp-4">
        {tooltip.movie.overview.slice(0, 300) + '...'}
      </p>
    </div>
  );
};

export default Tooltip;
