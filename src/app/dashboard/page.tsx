import { auth } from '@/auth';

export const metadata = {
  title: 'Dashboard - SKY POS',
};

export default async function Dashboard() {
  // const session = await auth();
  // console.log('Clientside session:\n', session);
  return <div className='h-[300rem]'>dashboard page</div>;
}
