import RegisterForm from '@/app/ui/credentials/register-form';
import HomeHeader from '@/app/ui/home/home-header';

export const metadata = {
  title: 'Register - SKY POS',
};

export default async function Register() {
  return (
    <>
      <HomeHeader />
      <RegisterForm />
    </>
  );
}
