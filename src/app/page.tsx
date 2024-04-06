import LinkCardPrimary from '@/app/ui/link-card-primary';
import Logo from '@/app/ui/logo';
import { auth } from '@/auth';
import LogoutLinkCardPrimary from './ui/credentials/logout-link-card-primary';
import { POSUser } from './lib/models/user';

export const metadata = {
  title: 'SKY POS',
  description: 'The web-based POS app',
};

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Logo />
      <div className='flex flex-col p-5 sm:flex-row'>
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
                  MANAGE
                </LinkCardPrimary>
              </div>
            )}
            <div className='mb-5 sm:mr-5'>
              <LogoutLinkCardPrimary description='Logout of your account.'>
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
