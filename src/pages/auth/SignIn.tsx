import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, UserAuth } from '../../context/AuthContext';

const SignIn = () => {
  const { signIn } = UserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        {error ? <p className='bg-red-300 p-3 my-2'>{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-md shadow-xl'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-md'
                type='email'
                placeholder='Enter your email...'
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-md shadow-xl'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-md'
                type='password'
                placeholder='Enter a password...'
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
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
