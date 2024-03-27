import LinkCardPrimary from './ui/linkCard';

export default function Home() {
  return (
    <>
      <div className='flex sm:flex-row flex-col p-5'>
        <div className='sm:mr-5 mb-5'>
          <LinkCardPrimary
            link='/login'
            description='Login with your username and password.'
          >
            LOGIN
          </LinkCardPrimary>
        </div>
        <div className='sm:mr-5 mb-5'>
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
