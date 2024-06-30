import { signOut } from '@/auth';

interface LogoutLinkCardPrimaryProps {
  children: React.ReactNode;
  description?: string;
}

export default function LogoutLinkCardPrimary({
  children,
  description,
}: LogoutLinkCardPrimaryProps) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className='relative w-full p-5 transition-colors rounded-lg bg-color-surface-mixed-200 hover:bg-color-surface-mixed-300'
    >
      <div className='w-full'>
        <p className='mb-5 w-full text-start sm:max-w-[30ch] max-w-full text-color-surface-600'>
          {description}
        </p>
        <div className='p-2 rounded-full bg-color-primary-500 min-w-[5rem] text-center font-bold'>
          {children}
        </div>
      </div>
      <button
        type='submit'
        className='absolute top-0 left-0 w-full h-full'
      ></button>
    </form>
  );
}
