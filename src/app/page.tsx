import LinkCardPrimary from '@/app/ui/link-card';
import Logo from '@/app/ui/logo';

export const metadata = {
  title: 'SKY POS',
  description: 'The web-based POS app',
};

export default function Home() {
  return (
    <>
      <Logo />
      <div className='flex flex-col p-5 sm:flex-row'>
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
      </div>
    </>
  );
}
