'use client';

import { KeyIcon, UserIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { verifyLogin } from '../lib/actions/loginActions';
import { useFormState } from 'react-dom';

// export const metadata = {
//   title: 'Login - SKY POS',
// };

export default function Page() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(verifyLogin, initialState);

  return (
    <form
      action={dispatch}
      className='flex items-center justify-center w-full mt-10'
    >
      <div className='flex flex-col items-center rounded-xl p-10 m-5 bg-color-surface-mixed-200 sm:w-[30rem] w-full'>
        <h1>LOGIN</h1>
        <div className='flex flex-col w-full mt-6'>
          <label htmlFor='username' className='px-1 mb-1 text-sm'>
            Username
          </label>
          <div className='relative'>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='Username'
              className='w-full py-1 pl-8 text-xl border-b border-color-surface-600'
            />
            <UserIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
          </div>
        </div>
        <div
          id='username-error'
          aria-live='polite'
          aria-atomic='true'
          className='flex flex-col w-full'
        >
          {state.errors?.username &&
            state.errors.username.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className='flex flex-col w-full mt-6'>
          <label htmlFor='username' className='px-1 mb-1 text-sm'>
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              className='w-full py-1 pl-8 text-xl border-b border-color-surface-600'
            />
            <KeyIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
          </div>
        </div>
        <div
          id='password-error'
          aria-live='polite'
          aria-atomic='true'
          className='flex flex-col w-full'
        >
          {state.errors?.password &&
            state.errors.password.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
        </div>
        <button className='w-full p-3 my-10 text-xl font-bold text-white rounded-full bg-color-primary-500'>
          LOGIN
        </button>
        <Link
          href={'/register'}
          className='group mt-[5rem] text-color-surface-600'
        >
          Got an activation code?{' '}
          <span className='underline transition-colors group-hover:text-white'>
            Register now
          </span>
        </Link>
      </div>
    </form>
  );
}
