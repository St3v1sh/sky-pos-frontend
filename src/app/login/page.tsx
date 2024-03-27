import { KeyIcon, UserIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Page() {
  return (
    <form action='' className='flex justify-center items-center mt-10 w-full'>
      <div className='flex flex-col items-center rounded-xl p-10 m-5 bg-color-surface-mixed-200 sm:w-[30rem] w-full'>
        <h1>LOGIN</h1>
        <div className='flex flex-col w-full mt-6 border-b border-color-surface-600'>
          <label htmlFor='username' className='px-1 mb-1 text-sm'>
            Username
          </label>
          <div className='relative'>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='Username'
              className='pl-8 py-1 w-full text-xl'
            />
            <UserIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
          </div>
        </div>
        <div className='flex flex-col w-full mt-6 border-b border-color-surface-600'>
          <label htmlFor='username' className='px-1 mb-1 text-sm'>
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              className='pl-8 py-1 w-full text-xl'
            />
            <KeyIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
          </div>
        </div>
        <button className='w-full my-10 p-3 rounded-full bg-color-primary-500 text-xl text-white font-bold'>
          Login
        </button>
        <Link href={'/register'} className='mt-[5rem] text-color-surface-600'>
          Got an access code? <span className='underline'>Register now</span>
        </Link>
      </div>
    </form>
  );
}
