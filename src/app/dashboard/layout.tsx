import Header from '@/app/ui/dashboards/header';
import DashboardNavbar from '@/app/ui/dashboards/dashboard-navbar';
import NavbarButton from '@/app/ui/dashboards/navbar-button';
import MobileNavbarButton from '../ui/dashboards/mobile-navbar-button';
import MobileDashboardNavbar from '../ui/dashboards/mobile-dashboard-navbar';

type NavbarProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: NavbarProps) {
  return (
    <>
      <Header>
        <NavbarButton className='hidden sm:flex' />
        <MobileNavbarButton className='flex sm:hidden' />
      </Header>
      <div className='flex flex-col sm:flex-row'>
        <MobileDashboardNavbar />
        <DashboardNavbar />
        <div className='flex-grow p-3'>
          <div className='w-full'>{children}</div>
        </div>
      </div>
    </>
  );
}
