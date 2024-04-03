import clsx from 'clsx';
import Link from 'next/link';

interface LinkCardProps {
  link: string;
  children: React.ReactNode;
  description?: string;
}

export default function LinkCardPrimary({
  link,
  children,
  description,
}: LinkCardProps) {
  return (
    <Link href={link}>
      <div
        className={clsx(
          'rounded-lg p-5 transition-colors bg-color-surface-mixed-200 hover:bg-color-surface-mixed-300'
        )}
      >
        <p className='mb-5 max-w-[30ch] text-color-surface-600'>
          {description}
        </p>
        <p className='p-2 rounded-full bg-color-primary-500 min-w-[5rem] text-center font-bold'>
          {children}
        </p>
      </div>
    </Link>
  );
}
