import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={cn('flex flex-col items-center mb-8', className)}>
      {children}
    </section>
  );
};

export default Section;
