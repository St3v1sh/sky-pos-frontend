import { jost } from '@/app/ui/fonts';
import './globals.css';
import clsx from 'clsx';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          jost.className,
          'bg-color-surface-mixed-100 text-gray-400'
        )}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
