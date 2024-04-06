import Logo from '@/app/ui/logo';

export default function HomeHeader() {
  return (
    <div className='flex flex-row items-baseline justify-between w-full p-5 pt-8 bg-color-surface-mixed-300'>
      <Logo />
      <div>test</div>
    </div>
  );
}
