import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

const SectionHeading = ({ children, className }: SectionHeadingProps) => {
  return <h2 className={cn('text-xl mb-2', className)}>{children}</h2>;
};

export default SectionHeading;
