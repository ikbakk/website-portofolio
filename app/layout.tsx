import './globals.css';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '500', '700'],
  preload: false
});

export const metadata = {
  title: 'Iqbal Firdaus | Frontend Developer',
  desription:
    'A webstite portfolio as my online resume and to showcase my simple projects that has been built'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={quicksand.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
