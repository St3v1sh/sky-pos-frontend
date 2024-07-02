'use client';

import Navbar from '@/app/ui/dashboards/navbar';
import {
  BookOpenIcon,
  ClipboardIcon,
  BanknotesIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/20/solid';
import {
  BookOpenIcon as BookOpenIconOutline,
  ClipboardIcon as ClipboardIconOutline,
  BanknotesIcon as BanknotesIconOutline,
  ArchiveBoxIcon as ArchiveBoxIconOutline,
} from '@heroicons/react/24/outline';
import MobileNavLink from './mobile-nav-link';
import { useEffect, useRef, useState } from 'react';
import { emitEvent, offEvent, onEvent } from './event-emitter';
import clsx from 'clsx';

export default function MobileDashboardNavbar() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleToggleMobileNavbar = () => {
      const newValue = !isVisible;
      setIsVisible(newValue);
    };
    onEvent.toggleMobileNavbar(handleToggleMobileNavbar);

    return () => offEvent.toggleMobileNavbar(handleToggleMobileNavbar);
  }, [isVisible]);

  return (
    <div className={clsx('sm:hidden', !isVisible && 'hidden')}>
      <div className='fixed top-[4.5rem] w-full py-3 pr-3 rounded-t-lg bg-color-surface-mixed-200 z-50'>
        <Navbar>
          <MobileNavLink
            page='/dashboard'
            name='Overview'
            icons={{
              inactive: <ClipboardIconOutline className='w-8 h-8' />,
              active: <ClipboardIcon className='w-8 h-8' />,
            }}
            onClick={() => setIsVisible(false)}
          />
          <MobileNavLink
            page='/dashboard/cashier'
            name='Cashier'
            icons={{
              inactive: <BanknotesIconOutline className='w-8 h-8' />,
              active: <BanknotesIcon className='w-8 h-8' />,
            }}
            onClick={() => setIsVisible(false)}
          />
          <MobileNavLink
            page='/dashboard/stocker'
            name='Stocker'
            icons={{
              inactive: <ArchiveBoxIconOutline className='w-8 h-8' />,
              active: <ArchiveBoxIcon className='w-8 h-8' />,
            }}
            onClick={() => setIsVisible(false)}
          />
          <MobileNavLink
            page='/dashboard/journal'
            name='Journal'
            icons={{
              inactive: <BookOpenIconOutline className='w-8 h-8' />,
              active: <BookOpenIcon className='w-8 h-8' />,
            }}
            onClick={() => setIsVisible(false)}
          />
        </Navbar>
      </div>

      {/* Overlay */}
      <div className='fixed top-[4.5rem] w-full h-full rounded-t-lg bg-black/50 z-40'></div>
    </div>
  );
}
