import React from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { LOGUSER } from '../../client/mutation/user';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { userActions } from '../../features/user/user.slice';
import Loginnavbar from '../topnavbar/loginnavbar';
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;
const ResponseSchema = z.object({
  token: z.string(),
});
const Login = () => {
  const dispatch = useDispatch();
  const [loginUser] = useMutation(LOGUSER);
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
    const res = await loginUser({
      variables: { email: data.email, password: data.password },
    });
    const result = ResponseSchema.safeParse(res.data.loginUser);
    console.log(result);
    if (result.success) {
      console.log('login success');
      dispatch(userActions.loginSuccess(result.data.token));
    }
  };
  return (
    <>
      <Loginnavbar />
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
    </>
  );
};

export default Login;
