import LoginForm from '@/app/ui/credentials/login-form';
import HomeHeader from '../ui/home/home-header';

export const metadata = {
  title: 'Login - SKY POS',
};

export default async function Login() {
  return (
    <>
      <HomeHeader />
      <LoginForm />
    </>
  );
}
