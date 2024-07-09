import LinkCardPrimary from '@/app/ui/link-card-primary';
import { auth } from '@/auth';
import LogoutLinkCardPrimary from '@/app/ui/credentials/logout-link-card-primary';
import { POSUser } from '@/lib/models/user';
import HomeHeader from '@/app/ui/home/home-header';
import AdminIcon from '@/app/ui/credentials/admin-icon';

export const metadata = {
  title: 'SKY POS',
  description: 'The web-based POS app',
};

export default async function Home() {
  const session = await auth();

  return (
    <>
      <HomeHeader session={session} />
      <div className='flex flex-col p-5 sm:flex-row sm:flex-wrap'>
        {session ? (
          <>
            <div className='mb-5 sm:mr-5'>
              <LinkCardPrimary
                link='/dashboard'
                description='Go to the employee dashboard.'
              >
                <p className='text-white'>DASHBOARD</p>
              </LinkCardPrimary>
            </div>
            {(session.user as POSUser)?.privilege_type === 'admin' && (
              <div className='mb-5 sm:mr-5'>
                <LinkCardPrimary
                  link='/manage'
                  description='Go to the management dashboard.'
                >
                  <div className='flex flex-row items-center justify-center w-full'>
                    <p className='text-white'>MANAGE</p>
                    <AdminIcon />
                  </div>
                </LinkCardPrimary>
              </div>
            )}
            <div className='w-full mb-5 sm:w-auto sm:mr-5'>
              <LogoutLinkCardPrimary description='Logout from your account.'>
                <p className='text-white'>LOGOUT</p>
              </LogoutLinkCardPrimary>
            </div>
            <div className='w-[100rem] h-[300rem]'></div>
          </>
        ) : (
          <>
            <div className='mb-5 sm:mr-5'>
              <LinkCardPrimary
                link='/login'
                description='Login with your username and password.'
              >
                <p className='text-white'>LOGIN</p>
              </LinkCardPrimary>
            </div>
            <div className='mb-5 sm:mr-5'>
              <LinkCardPrimary
                link='/register'
                description='Register a new employee account.'
              >
                <p className='text-white'>REGISTER</p>
              </LinkCardPrimary>
            </div>
          </>
        )}
      </div>
    </>
  );
}
