import React from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ADDUSER } from '../../client/mutation/user';
import { useMutation } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const ResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.object({
    email: z.string(),
  }),
});

type FormValues = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const [addUser] = useMutation(ADDUSER);
  const form = useForm<FormValues>({
    defaultValues: {
      email: 'john.doe@gmail.com',
      password: '123456',
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const res = await addUser({
      variables: { email: data.email, password: data.password },
    });
    const result = ResponseSchema.safeParse(res.data.regUser);
    console.log(result);
    if (result.success) {
      navigate('/login');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>
        <label htmlFor="password">password</label>
        <input type="password" id="password" {...register('password')} />
        <p className="error">{errors.password?.message}</p>
        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Register;
