import { cn } from '@/utils/cn';
import Skeleton from './skeleton';

type SkeletonCardProps = {
  className?: string;
};

const SkeletonCard = ({ className }: SkeletonCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center h-70 basis-40 max-w-[250px] min-w-[200px] bg-white/5 rounded-md pb-2 gap-y-3',
        className
      )}
    >
      <Skeleton className="w-full h-[60%] rounded-b-none mb-5" />

      <Skeleton className="w-[70%]" />
      <Skeleton className="w-[70%]" />
    </div>
  );
};

export default SkeletonCard;
