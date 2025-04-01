import { cn } from '@/utils/cn';

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse h-4 min-w-10 max-w-[550px] rounded-md bg-white/10',
        className
      )}
    />
  );
};

export default Skeleton;
