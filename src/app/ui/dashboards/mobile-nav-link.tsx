'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

interface MobileNavLinkProps {
  page: string;
  name?: string;
  icons: {
    inactive: ReactElement;
    active: ReactElement;
  };
  onClick?: () => void;
}

export default function MobileNavLink({
  page,
  name,
  icons,
  onClick,
}: MobileNavLinkProps) {
  const pathName = usePathname();

  return (
    <Link
      href={page}
      className={clsx(
        'flex flex-row p-3 rounded-lg',
        pathName === page
          ? 'text-white bg-blue-500 hover:bg-blue-400'
          : 'hover:bg-white/5'
      )}
      onClick={onClick}
    >
      <div className={clsx('relative', pathName === page && 'text-white')}>
        {pathName === page ? icons.active : icons.inactive}
      </div>
      <p className='px-3 ml-3 text-lg'>{name}</p>
    </Link>
  );
}
