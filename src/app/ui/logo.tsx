import Link from 'next/link';

export default function Logo() {
  return (
    <div className='flex flex-row items-baseline p-5 pt-8 rounded-b-xl bg-color-surface-mixed-300 text-7xl font-bold'>
      <Link href='/' className='mr-10'>
        SKY POS
      </Link>
    </div>
  );
}
