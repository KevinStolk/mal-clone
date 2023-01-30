import React, { ReactEventHandler, useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, UserAuth } from '../../context/AuthContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { signIn } = UserAuth();
  const [error, setError] = useState('');

  const schema = yup.object().shape({
    email: yup.string().email().required('You must enter your email'),
    password: yup.string().required('You must enter your password'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (
    data: SignInFormData,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  return (
    <div className='pageWrapper'>
      <div className='rounded-2xl shadow-2xl bg-primary w-full max-w-[400px] mx-auto min-h-[600px]  my-5 px-4 py-6'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        {error ? <p className='bg-red-500 p-3 my-2'>{error}</p> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-md shadow-xl'>
              <input
                className='w-full p-2 bg-primary border border-input rounded-md'
                type='email'
                placeholder='Enter your email...'
                {...register('email')}
                required
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
            <p className='text-red-500'>{errors.email?.message}</p>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-md shadow-xl'>
              <input
                className='w-full p-2 bg-primary border border-input rounded-md'
                type='password'
                placeholder='Enter a password...'
                {...register('password')}
                required
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <p className='text-red-500'>{errors.password?.message}</p>
          <button
            className='w-full my-2 p-3 bg-button text-btnText rounded-md shadow-xl'
            type='submit'
          >
            Sign In
          </button>
        </form>
        <p className='my-4'>
          Don't have an account yet?{' '}
          <Link className='text-accent hover:underline' to='/signup'>
            Sign up now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
