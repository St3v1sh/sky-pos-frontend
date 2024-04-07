import LinkCardPrimary from '@/app/ui/link-card-primary';
import { auth } from '@/auth';
import LogoutLinkCardPrimary from '@/app/ui/credentials/logout-link-card-primary';
import { POSUser } from '@/lib/models/user';
import HomeHeader from '../ui/home/home-header';
import { ShieldCheckIcon } from '@heroicons/react/20/solid';

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
                DASHBOARD
              </LinkCardPrimary>
            </div>
            {(session.user as POSUser)?.privilege_type === 'admin' && (
              <div className='mb-5 sm:mr-5'>
                <LinkCardPrimary
                  link='/manage'
                  description='Go to the management dashboard.'
                >
                  <div className='flex flex-row items-center justify-center w-full'>
                    <p>MANAGE</p>
                    <ShieldCheckIcon className='w-5 h-5 ml-1 text-yellow-300' />
                  </div>
                </LinkCardPrimary>
              </div>
            )}
            <div className='w-full mb-5 sm:w-auto sm:mr-5'>
              <LogoutLinkCardPrimary description='Logout from your account.'>
                LOGOUT
              </LogoutLinkCardPrimary>
            </div>
          </>
        ) : (
          <>
            <div className='mb-5 sm:mr-5'>
              <LinkCardPrimary
                link='/login'
                description='Login with your username and password.'
              >
                LOGIN
              </LinkCardPrimary>
            </div>
            <div className='mb-5 sm:mr-5'>
              <LinkCardPrimary
                link='/register'
                description='Register a new employee account.'
              >
                REGISTER
              </LinkCardPrimary>
            </div>
          </>
        )}
      </div>
    </>
  );
}
