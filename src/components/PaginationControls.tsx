import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type PagiControlsProps = {
  prevPage: string;
  nextPage: string;
};

const btnStyles =
  'flex flex-nowrap items-center justify-center gap-x-2 px-5 py-2 bg-white/6 rounded-md sm:w-[180px] opacity-75 text-sm hover:bg-white/12 hover:opacity-100 transition';

const PaginationControls = ({ prevPage, nextPage }: PagiControlsProps) => {
  return (
    <section className="flex items-center justify-between gap-x-6 w-full px-20 ">
      {prevPage ? (
        <Link href={prevPage} className={btnStyles}>
          <ArrowLeftIcon />
          <span className="hidden sm:inline">Предыдущая</span>
        </Link>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Link href={nextPage} className={btnStyles}>
          <span className="hidden sm:inline">Следующая</span>
          <ArrowRightIcon />
        </Link>
      ) : (
        <div />
      )}
    </section>
  );
};

export default PaginationControls;
