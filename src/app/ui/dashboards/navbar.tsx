interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return <div className='px-3 pr-0'>{children}</div>;
}
