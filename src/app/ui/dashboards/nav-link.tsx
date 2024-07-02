'use client';

import { SmallNavbarContext } from '@/context/small-navbar-context';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useContext } from 'react';

interface NavLinkProps {
  page: string;
  name?: string;
  icons: {
    inactive: ReactElement;
    active: ReactElement;
  };
}

export default function NavLink({ page, name, icons }: NavLinkProps) {
  const pathName = usePathname();
  const smallNavbarContext = useContext(SmallNavbarContext);

  return (
    <Link
      href={page}
      className={clsx(
        'flex flex-row p-3 rounded-lg',
        pathName === page ? 'text-white' : 'hover:bg-white/5',
        pathName === page && !smallNavbarContext
          ? 'bg-blue-500 hover:bg-blue-400'
          : 'hover:bg-white/5'
      )}
    >
      <div
        className={clsx(
          'relative',
          pathName === page && 'text-white',
          smallNavbarContext && 'h-[3.25rem]'
        )}
      >
        {pathName === page ? icons.active : icons.inactive}
        <p
          className={clsx(
            'absolute mt-1 text-xs left-[50%] translate-x-[-50%]',
            !smallNavbarContext && 'hidden'
          )}
        >
          {name}
        </p>
      </div>
      <p className={clsx('px-3 ml-3 text-lg', smallNavbarContext && 'hidden')}>
        {name}
      </p>
    </Link>
  );
}
