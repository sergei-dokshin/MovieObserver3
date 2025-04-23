import { cn } from '@/utils/cn';

interface ButtonProps {
  className?: string;
  text: string;
}

const Button = ({ className, text }: ButtonProps) => {
  return (
    <button
      className={cn(
        `text-white/80 text-sm mt-6 py-2 px-6 rounded-md bg-accent/70 hover:bg-accent/85 hover:text-white/95 transition cursor-pointer`,
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
