import Logo from '@/app/ui/logo';
import RegisterForm from '@/app/ui/credentials/register-form';

export const metadata = {
  title: 'Register - SKY POS',
};

export default function Page() {
  return (
    <>
      <Logo />
      <RegisterForm />
    </>
  );
}
