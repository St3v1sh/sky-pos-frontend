import Navbar from '@/app/ui/dashboards/navbar';
import NavLink from '@/app/ui/dashboards/nav-link';
import Header from '@/app/ui/dashboards/header';
import {
  BanknotesIcon,
  Bars3Icon,
  BookOpenIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/20/solid';
import { useState } from 'react';

type NavbarProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: NavbarProps) {
  return (
    <>
      <Header>
        <button
          type='button'
          className='flex items-center justify-center w-12 h-12 mr-3 rounded-lg hover:bg-color-surface-mixed-400'
        >
          <Bars3Icon className='w-8 h-8 text-white' />
        </button>
      </Header>
      <div className='flex flex-row'>
        <div className='sticky top-[4.5rem] flex flex-col h-full py-3 rounded-r-xl sm:w-[16rem]'>
          <Navbar>
            <NavLink page='/dashboard' name='Overview'>
              <ComputerDesktopIcon className='w-8 h-8' />
            </NavLink>
            <NavLink page='/cashier-view' name='Cashier'>
              <BanknotesIcon className='w-8 h-8' />
            </NavLink>
            <NavLink page='/dashboard/journal' name='Journal'>
              <BookOpenIcon className='w-8 h-8' />
            </NavLink>
          </Navbar>
        </div>
        <div className='flex-grow p-3'>
          <div className='w-full'>{children}</div>
        </div>
      </div>
    </>
  );
}
