import Skeleton from '@/components/sceleton/skeleton';

const Loading = () => {
  return (
    <main>
      <div className="flex flex-col items-center w-full h-full p-1 gap-y-2 mt-20">
        <Skeleton className="h-40 w-80" />
        <Skeleton className="w-80" />
        <Skeleton className="w-80" />
      </div>
    </main>
  );
};

export default Loading;
