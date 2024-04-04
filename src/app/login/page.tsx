import LoginForm from '@/app/ui/credentials/login-form';
import Logo from '@/app/ui/logo';

export const metadata = {
  title: 'Login - SKY POS',
};

export default function Page() {
  return (
    <>
      <Logo />
      <LoginForm />
    </>
  );
}
