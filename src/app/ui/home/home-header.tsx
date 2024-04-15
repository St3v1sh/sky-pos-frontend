import Logo from '@/app/ui/logo';
import { signOut } from '@/auth';
import { POSUser } from '@/lib/models/user';
import { ShieldCheckIcon } from '@heroicons/react/20/solid';
import { Session } from 'next-auth';

type HomeHeaderProps = {
  session?: Session | null;
};

export default async function HomeHeader({ session }: HomeHeaderProps) {
  return (
    <div className='flex flex-row items-end justify-between w-full p-5 pt-8 bg-color-surface-mixed-300'>
      <Logo />
      <div className='hidden sm:block'>
        <div className='flex flex-col'>
          {session?.user && (
            <div className='flex items-center mb-1 text-lg max-w-[30ch] text-balance'>
              <span className='capitalize'>
                {'Welcome, ' +
                  (session?.user as POSUser).first_name +
                  ' ' +
                  (session?.user as POSUser).last_name}
              </span>
              <div className='relative'>
                {(session?.user as POSUser).privilege_type === 'admin' && (
                  <ShieldCheckIcon className='w-5 h-5 ml-1 text-yellow-300 peer' />
                )}
                {/* Tooltip */}
                <div className='absolute hidden peer-hover:block -translate-x-full translate-y-3 top-full whitespace-nowrap left-[calc(100%+.5rem)]'>
                  <div className='w-full h-full rounded-lg bg-color-surface-mixed-200'>
                    <p className='p-2'>{"You're an admin"}</p>
                    <div className='absolute top-0 left-0 w-full h-full'>
                      <div className='absolute -top-2 right-[0.625rem] border-b-[.5rem] border-b-color-surface-mixed-200 border-l-[.5rem] border-l-color-surface-mixed-200/0 border-r-[.5rem] border-r-color-surface-mixed-200/0 w-0 h-0 content-[""]' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {session?.user && (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className='w-full p-1 font-bold text-center bg-transparent rounded-xl outline outline-1 outline-white'>
                LOGOUT
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
