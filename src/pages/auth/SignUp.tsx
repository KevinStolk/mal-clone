import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SignInFormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(4).max(20).required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords Don't Match")
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: SignInFormData,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  return (
    <div className='pageWrapper'>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        {error ? <p className='bg-red-500 p-3 my-2'>{error}</p> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-md shadow-xl'>
              <input
                className='w-full p-2 bg-primary border border-input rounded-md'
                type='email'
                placeholder='Enter your email...'
                required
                {...register('email')}
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
                placeholder='Enter your password...'
                required
                {...register('password')}
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
            <p className='text-red-500'>{errors.password?.message}</p>
            <label>Confirm Password</label>
            <div className='my-2 w-full relative rounded-md shadow-xl'>
              <input
                className='w-full p-2 bg-primary border border-input rounded-md'
                type='password'
                placeholder='Confirm your password...'
                required
                {...register('confirmPassword')}
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
            <p className='text-red-500'>{errors.confirmPassword?.message}</p>
          </div>
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-md shadow-xl'>
            Sign up
          </button>
        </form>
        <p className='my-4'>
          Already have an account?{' '}
          <Link className='text-accent hover:underline' to='/signin'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
