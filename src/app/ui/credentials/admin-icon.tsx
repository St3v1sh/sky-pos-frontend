import { ShieldCheckIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface AdminIconProps {
  className?: string;
}

export default function AdminIcon({ className }: AdminIconProps) {
  return (
    <ShieldCheckIcon
      className={clsx('w-5 h-5 ml-1 text-yellow-300', className)}
    />
  );
}
