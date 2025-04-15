import { Genre } from '@/types/movie';
import { cn } from '@/utils/cn';

interface GenreBadgeProps {
  genre: Genre;
  className?: string;
}

const GenreBadge = ({ genre, className }: GenreBadgeProps) => {
  return (
    <p
      key={genre.id}
      className={cn(
        `text-xs bg-white/10 px-2 rounded-sm text-inherit text-nowrap`,
        className
      )}
    >
      {genre.name}
    </p>
  );
};

export default GenreBadge;
