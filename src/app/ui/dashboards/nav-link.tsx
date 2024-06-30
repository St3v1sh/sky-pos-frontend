'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  page: string;
  name?: string;
  children: React.ReactNode;
}

export default function NavLink({ page, name, children }: NavLinkProps) {
  const pathName = usePathname();
  return (
    <Link
      href={page}
      className={clsx(
        'flex flex-row p-3 rounded-lg hover:bg-white/5',
        pathName === page && 'sm:bg-blue-500 text-white sm:hover:bg-blue-400'
      )}
    >
      <div
        className={clsx(
          'relative h-[3.25rem] sm:h-auto',
          pathName === page && 'text-white'
        )}
      >
        {children}
        <p className='absolute mt-1 text-xs left-[50%] translate-x-[-50%] sm:hidden'>
          {name}
        </p>
      </div>
      <p className='hidden px-3 ml-3 text-lg sm:block'>{name}</p>
    </Link>
  );
}
