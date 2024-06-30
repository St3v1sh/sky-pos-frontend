import clsx from 'clsx';
import Link from 'next/link';

type LogoProps = {
  className?: string;
};
export default function Logo({ className }: LogoProps) {
  return (
    <Link className={clsx('font-bold text-white', className)} href='/'>
      SKY POS
    </Link>
  );
}
