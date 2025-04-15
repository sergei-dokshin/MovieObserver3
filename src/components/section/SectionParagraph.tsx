import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

type SectionParagraphProps = {
  children: ReactNode;
  className?: string;
};

const SectionParagraph = ({ children, className }: SectionParagraphProps) => {
  return (
    <p
      className={cn(
        'max-w-4xl  leading-8 text-white/75 sm:text-lg',
        className
      )}
    >
      {children}
    </p>
  );
};

export default SectionParagraph;
