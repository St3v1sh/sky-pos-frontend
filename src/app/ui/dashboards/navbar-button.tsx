'use client';

import { emitEvent } from '@/app/ui/dashboards/event-emitter';
import { Bars3Icon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface NavbarButtonProps {
  className?: string;
}

export default function NavbarButton({ className }: NavbarButtonProps) {
  return (
    <button
      type='button'
      className={clsx(
        'flex items-center h-12 px-3 mr-3 rounded-lg hover:bg-white/5',
        className
      )}
      onClick={emitEvent.toggleNavbar}
    >
      <Bars3Icon className='w-8 h-8 text-white' />
    </button>
  );
}
