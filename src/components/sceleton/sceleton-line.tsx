import { cn } from '@/utils/cn';
import Skeleton from './skeleton';

type SkeletonLineProps = {
  className?: string;
};

const SkeletonLine = ({ className }: SkeletonLineProps) => {
  return (
    <div
      className={cn(
        'flex flex-nowrap items-center gap-x-4 h-20 max-w-[700px] min-w-[280px] rounded-md bg-white/5 p-5',
        className
      )}
    >
      <Skeleton className="h-15 w-15" />

      <div className="flex flex-col justify-between w-[80%] h-15 gap-2">
        <Skeleton className="flex-2" />
        <Skeleton className="flex-1 w-[70%]" />
      </div>
    </div>
  );
};

export default SkeletonLine;
