'use client';

import {
  AtSymbolIcon,
  CheckIcon,
  EnvelopeIcon,
  KeyIcon,
} from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import {
  CodeValidationState,
  verifyActivationCode,
  verifyRegister,
} from '@/lib/actions/registerActions';
import clsx from 'clsx';
import CredentialsFormInput from '@/app/ui/credentials/credentials-form-input';
import Link from 'next/link';

export default function RegisterForm() {
  const initialState = { success: false, message: '', errors: {} };
  const [verifyState, verifyActivationCodeDispatch] = useFormState(
    verifyActivationCode,
    initialState
  );
  const [registerState, registerDispatch] = useFormState(
    verifyRegister,
    initialState
  );

  return (
    <form
      action={
        verifyState.success ? registerDispatch : verifyActivationCodeDispatch
      }
      className='flex items-center justify-center w-full mt-10'
    >
      <div className='flex flex-col items-center rounded-xl p-5 pt-10 m-5 bg-color-surface-mixed-200 sm:w-[30rem] w-full'>
        <div className='flex flex-col items-center w-full px-5'>
          <h1>REGISTER</h1>
          {/* Activation code input */}
          <div className='flex flex-col w-full mt-6'>
            <CredentialsFormInput
              formDetails={{
                id: 'code',
                label: 'Activation code',
                placeholder: 'Activation code',
                readOnly: verifyState.success,
              }}
              className='read-only:bg-color-surface-mixed-100'
            >
              <EnvelopeIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
              <CheckIcon
                className={clsx(
                  'transition-all duration-500 pointer-events-none absolute right-2 top-1/2 h-[27px] w-[27px] -translate-y-1/2 text-green-500',
                  verifyState.success ? 'opacity-100' : 'opacity-0'
                )}
              />
            </CredentialsFormInput>
          </div>
        </div>
        <div
          id='code-error'
          aria-live='polite'
          aria-atomic='true'
          className='flex flex-col w-full px-5'
        >
          {verifyState.errors?.code &&
            verifyState.errors.code.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
          {registerState.errors?.code &&
            registerState.errors.code.map((error: string) => (
              <p className='mt-2 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
        </div>
        <div
          className={clsx(
            'grid w-full transition-all duration-500 ease-in-out',
            verifyState.success ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div
            className={clsx(
              'flex flex-col w-full transition-all duration-500 ease-in-out overflow-hidden px-5',
              verifyState.success && 'pb-5'
            )}
          >
            {/* Email input */}
            <div className='mt-6'>
              <CredentialsFormInput
                formDetails={{
                  id: 'email',
                  label: 'Email',
                  placeholder: 'Email',
                  type: 'email',
                  disabled: !verifyState.success,
                }}
              >
                <AtSymbolIcon className='pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-color-surface-600' />
              </CredentialsFormInput>
            </div>
            <div
              id='email-error'
              aria-live='polite'
              aria-atomic='true'
              className='flex flex-col w-full'
            >
              {registerState.errors?.email &&
                registerState.errors.email.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {/* First name input */}
            <div className='mt-6'>
              <CredentialsFormInput
                formDetails={{
                  id: 'first-name',
                  label: 'First name',
                  disabled: !verifyState.success,
                }}
              ></CredentialsFormInput>
            </div>
            <div
              id='first-name-error'
              aria-live='polite'
              aria-atomic='true'
              className='flex flex-col w-full'
            >
              {registerState.errors?.firstName &&
                registerState.errors.firstName.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {/* Last name input */}
            <div className='mt-6'>
              <CredentialsFormInput
                formDetails={{
                  id: 'last-name',
                  label: 'Last name',
                  disabled: !verifyState.success,
                }}
              ></CredentialsFormInput>
            </div>
            <div
              id='last-name-error'
              aria-live='polite'
              aria-atomic='true'
              className='flex flex-col w-full'
            >
              {registerState.errors?.lastName &&
                registerState.errors.lastName.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {/* Password input */}
            <div className='mt-6'>
              <CredentialsFormInput
                formDetails={{
                  id: 'password',
                  label: 'Password',
                  placeholder: 'Password',
                  type: 'password',
                  disabled: !verifyState.success,
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
              {registerState.errors?.password &&
                registerState.errors.password.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {/* Confirm password input */}
            <div className='mt-6'>
              <CredentialsFormInput
                formDetails={{
                  id: 'confirm-password',
                  label: 'Confirm password',
                  type: 'password',
                  disabled: !verifyState.success,
                }}
              ></CredentialsFormInput>
            </div>
            <div
              id='confirm-password-error'
              aria-live='polite'
              aria-atomic='true'
              className='flex flex-col w-full'
            >
              {registerState.errors?.confirmPassword &&
                registerState.errors.confirmPassword.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <div className='flex flex-col w-full'>
              {registerState.message && (
                <p className='mt-2 text-sm text-red-500'>
                  {registerState.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full px-5'>
          {verifyState.message && (
            <p className='mt-2 text-sm text-red-500'>{verifyState.message}</p>
          )}
        </div>
        <div className='flex flex-col w-full px-5'>
          <FormButton verifyState={verifyState} />
        </div>
        <Link
          href={'/login'}
          className='group mt-[5rem] mb-5 text-color-surface-600'
        >
          {'Already have an account? '}
          <span className='underline transition-colors group-hover:text-white'>
            Login here
          </span>
        </Link>
      </div>
    </form>
  );
}

type FormButtonProps = {
  verifyState: CodeValidationState;
};

function FormButton({ verifyState }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className={clsx(
        'w-full p-3 my-10 text-xl font-bold text-white transition-all duration-200 rounded-full bg-color-primary-500 disabled:bg-color-primary-500/25 disabled:text-white/25',
        verifyState.success && 'mt-5'
      )}
      disabled={pending}
    >
      {verifyState.success ? 'REGISTER' : 'CHECK'}
    </button>
  );
}
