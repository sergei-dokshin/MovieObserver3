import { cn } from '@/utils/cn';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  disabledLink?: boolean;
}

const Logo = ({ className, disabledLink }: LogoProps) => {
  return (
    <Link
      href={disabledLink ? '' : '/'}
      className={cn(
        'select-none text-xs md:text-sm font-pacifico px-2 text-center leading-tight',
        className,
        disabledLink && 'cursor-default'
      )}
    >
      Movie Observer
    </Link>
  );
};

export default Logo;
