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
    >
      <button className='p-5 transition-colors rounded-lg bg-color-surface-mixed-200 hover:bg-color-surface-mixed-300'>
        <p className='mb-5 max-w-[30ch] text-color-surface-600'>
          {description}
        </p>
        <p className='p-2 rounded-full bg-color-primary-500 min-w-[5rem] text-center font-bold'>
          {children}
        </p>
      </button>
    </form>
  );
}
