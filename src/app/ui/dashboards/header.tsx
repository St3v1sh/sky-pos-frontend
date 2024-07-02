import { POSUser } from '@/lib/models/user';
import AdminIcon from '@/app/ui/credentials/admin-icon';
import { auth } from '@/auth';
import Logo from '../logo';

type HeaderProps = {
  children?: React.ReactNode;
};

export default async function Header({ children }: HeaderProps) {
  const session = await auth();

  return (
    <div className='sticky top-0 z-50 flex flex-row items-end justify-between w-full p-3 overflow-hidden rounded-b-lg bg-color-surface-mixed-300 whitespace-nowrap'>
      <div className='flex flex-row'>
        {children}
        <Logo className='text-5xl' />
      </div>
      <div className='hidden sm:block'>
        <div className='flex items-center text-lg max-w-[30ch] text-balance'>
          <span className='capitalize'>
            {(session!.user as POSUser).first_name +
              ' ' +
              (session!.user as POSUser).last_name}
          </span>
          <div className='relative'>
            {(session!.user as POSUser).privilege_type === 'admin' && (
              <AdminIcon className='peer' />
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
      </div>
    </div>
  );
}
