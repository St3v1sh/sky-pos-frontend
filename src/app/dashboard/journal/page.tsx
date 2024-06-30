import { auth } from '@/auth';

export const metadata = {
  title: 'SKY POS - Journal',
};

export default async function Journal() {
  const session = await auth();

  return <div>test</div>;
}
