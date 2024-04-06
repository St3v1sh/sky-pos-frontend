'use client';

import { AtSymbolIcon, KeyIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { verifyLogin } from '@/app/lib/actions/loginActions';
import { useFormState, useFormStatus } from 'react-dom';
import CredentialsFormInput from '@/app/ui/credentials/credentials-form-input';

export default function LoginForm() {
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
          <CredentialsFormInput
            formDetails={{
              id: 'email',
              label: 'Email',
              placeholder: 'Email',
              type: 'email',
            }}
          >
            <AtSymbolIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
          </CredentialsFormInput>
        </div>
        <div
          id='username-error'
          aria-live='polite'
          aria-atomic='true'
          className='flex flex-col w-full'
        >
          {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className='flex flex-col w-full mt-6'>
          <CredentialsFormInput
            formDetails={{
              id: 'password',
              label: 'Password',
              placeholder: 'Password',
              type: 'password',
            }}
          >
            <KeyIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
          </CredentialsFormInput>
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
          {state.message && (
            <p className='mt-2 text-sm text-red-500'>{state.message}</p>
          )}
        </div>
        <FormButton />
        <Link
          href={'/register'}
          className='group mt-[5rem] text-color-surface-600'
        >
          {'Got an activation code? '}
          <span className='underline transition-colors group-hover:text-white'>
            Register now
          </span>
        </Link>
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className='w-full p-3 my-10 text-xl font-bold text-white transition-all duration-200 rounded-full bg-color-primary-500 disabled:bg-color-primary-500/25 disabled:text-white/25'
      disabled={pending}
    >
      LOGIN
    </button>
  );
}
