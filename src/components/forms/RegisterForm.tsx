'use client';

import H1 from '../H1';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/types/zod.schema';
import { z } from 'zod';
import FormInput from './FormInput';
import Button from '../Button';

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col items-center bg-dark-lighter rounded-xl mt-5 sm:mt-10 p-4 sm:p-7">
      <H1 className="text-xl mb-5">Регистрация:</H1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <FormInput<RegisterFormData>
          name="email"
          type="text"
          placeholder="Email"
          register={register}
          errors={errors.email || null}
        />
        <FormInput<RegisterFormData>
          name="password"
          type="password"
          placeholder="Пароль"
          register={register}
          errors={errors.password || null}
        />
        <Button text="Регистрация" />
      </form>
    </section>
  );
};

export default RegisterForm;
