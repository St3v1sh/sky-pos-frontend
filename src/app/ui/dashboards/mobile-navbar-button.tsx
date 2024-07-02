'use client';

import { Bars3Icon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { emitEvent, offEvent, onEvent } from './event-emitter';

interface MobileNavbarButtonProps {
  className?: string;
}

export default function MobileNavbarButton({
  className,
}: MobileNavbarButtonProps) {
  return (
    <button
      type='button'
      className={clsx(
        'flex items-center h-12 px-3 mr-3 rounded-lg hover:bg-white/5',
        className
      )}
      onClick={emitEvent.toggleMobileNavbar}
    >
      <Bars3Icon className='w-8 h-8 text-white' />
    </button>
  );
}
