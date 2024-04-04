import { jost } from '@/app/ui/fonts';
import './globals.css';
import clsx from 'clsx';
import Logo from '@/app/ui/logo';

export const metadata = {
  title: 'SKY POS',
  description: 'The web-based POS app',
};

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
          'bg-color-surface-mixed-100 text-white'
        )}
      >
        <main>
          <Logo />
          {children}
        </main>
      </body>
    </html>
  );
}
