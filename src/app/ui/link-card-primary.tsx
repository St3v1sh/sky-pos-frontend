import clsx from 'clsx';
import Link from 'next/link';

interface LinkCardPrimaryProps {
  link: string;
  children: React.ReactNode;
  description?: string;
}

export default function LinkCardPrimary({
  link,
  children,
  description,
}: LinkCardPrimaryProps) {
  return (
    <Link href={link}>
      <div className='p-5 transition-colors rounded-lg bg-color-surface-mixed-200 hover:bg-color-surface-mixed-300'>
        <p className='mb-5 sm:max-w-[30ch] max-w-full text-color-surface-600'>
          {description}
        </p>
        <p className='p-2 rounded-full bg-color-primary-500 min-w-[5rem] text-center font-bold'>
          {children}
        </p>
      </div>
    </Link>
  );
}
