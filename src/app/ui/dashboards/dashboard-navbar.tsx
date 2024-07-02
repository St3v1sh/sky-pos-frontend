'use client';

import { useEffect, useState } from 'react';
import NavLink from '@/app/ui/dashboards/nav-link';
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
import { events, offEvent, onEvent } from '@/lib/event-emitter';
import clsx from 'clsx';
import { SmallNavbarContext } from '@/context/small-navbar-context';
import Cookies from 'js-cookie';

export default function DashboardNavbar() {
  const [isSmallNavbar, setIsSmallNavbar] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const isSmallNavbarCookie = Cookies.get(events.toggleNavbar) === 'true';
    setIsSmallNavbar(isSmallNavbarCookie);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleToggleNavbar = () => {
      setIsSmallNavbar((prevIsSmallNavbar) => {
        const newValue = !prevIsSmallNavbar;
        Cookies.set(events.toggleNavbar, newValue.toString(), {
          expires: 365,
          sameSite: 'Lax',
        });
        return newValue;
      });
    };

    onEvent.toggleNavbar(handleToggleNavbar);
    return () => offEvent.toggleNavbar(handleToggleNavbar);
  }, []);

  if (!isMounted) {
    return (
      <div className='sticky top-[4.5rem] flex flex-col h-full py-3 rounded-r-xl min-w-[16rem]'></div>
    );
  }

  return (
    <div
      className={clsx(
        'sticky top-[4.5rem] flex-col h-full py-3 rounded-r-xl hidden sm:flex',
        !isSmallNavbar && 'min-w-[16rem]'
      )}
    >
      <SmallNavbarContext.Provider value={isSmallNavbar}>
        <Navbar>
          <NavLink
            page='/dashboard'
            name='Overview'
            icons={{
              inactive: <ClipboardIconOutline className='w-8 h-8' />,
              active: <ClipboardIcon className='w-8 h-8' />,
            }}
          />
          <NavLink
            page='/dashboard/cashier'
            name='Cashier'
            icons={{
              inactive: <BanknotesIconOutline className='w-8 h-8' />,
              active: <BanknotesIcon className='w-8 h-8' />,
            }}
          />
          <NavLink
            page='/dashboard/stocker'
            name='Stocker'
            icons={{
              inactive: <ArchiveBoxIconOutline className='w-8 h-8' />,
              active: <ArchiveBoxIcon className='w-8 h-8' />,
            }}
          />
          <NavLink
            page='/dashboard/journal'
            name='Journal'
            icons={{
              inactive: <BookOpenIconOutline className='w-8 h-8' />,
              active: <BookOpenIcon className='w-8 h-8' />,
            }}
          />
        </Navbar>
      </SmallNavbarContext.Provider>
    </div>
  );
}
