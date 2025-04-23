import { cn } from '@/utils/cn';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import {
  FieldError,
  Path,
  UseFormRegister
} from 'react-hook-form';

interface FormInputProps<T extends Record<string, any>> {
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldError | null;
  className?: string;
}

const FormInput = <T extends Record<string, any>>({
  name,
  type = 'text',
  placeholder = '',
  register,
  errors,
  className
}: FormInputProps<T>) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative mb-3">
      <input
        type={type}
        id={String(name)}
        {...register(name)}
        placeholder={placeholder}
        className={cn(
          `text-sm sm:w-[350px] h-8 pr-10 rounded-md bg-white/[7%] px-3 py-2 outline-none ring-accent/80 focus:ring-2 focus:bg-white/10 transition ${
            errors && 'ring-2 ring-error'
          }`,
          className
        )}
      />

      <InfoCircledIcon
        className={cn(
          `absolute text-error right-3 top-1/2 transform -translate-y-1/2 scale-125 cursor-help`,
          errors ? 'visible' : 'hidden'
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />

      {/* Tooltip */}
      {showTooltip && errors?.message && (
        <div className="absolute right-10 top-[-20px] text-xs text-white/90 bg-error px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
          {errors.message}
        </div>
      )}
    </div>
  );
};

export default FormInput;
