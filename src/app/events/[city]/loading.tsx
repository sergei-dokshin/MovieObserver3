import SkeletonCard from '@/components/sceleton/skeleton-card';

const Loading = () => {
  return (
    <section className="flex flex-wrap gap-8 justify-center max-w-[1400px] px-5 mb-2">
      {Array.from(Array(6).keys()).map((item) => (
        <SkeletonCard key={item} />
      ))}
    </section>
  );
};

export default Loading;
