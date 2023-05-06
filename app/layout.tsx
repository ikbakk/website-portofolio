import type { Metadata } from 'next';
import './globals.css';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '500', '700'],
  preload: false
});

export const metadata: Metadata = {
  title: 'Iqbal Firdaus | Frontend Developer',
  description: 'Website portfolio built on top of NextJS and Sanity.Io',
  colorScheme: 'dark',
  themeColor: '#37AA9C',
  authors: [{ name: 'Iqbal Firdaus' }],
  openGraph: {
    type: 'website',
    description: 'Website portfolio built on top of NextJS and Sanity.Io',
    title: 'Iqbal Firdaus | Frontend Developer',
    images:
      'https://cdn.sanity.io/images/ife8w0nb/production/b3e28c521be19094b5f48314d5a34502259a7f35-1348x653.png'
  },
  viewport: { width: 'device-width', initialScale: 1, userScalable: true }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={quicksand.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
