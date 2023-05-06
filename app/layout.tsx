import './globals.css';

export const metadata = {
  title: 'Iqbal Firdaus | Frontend Developer',
  desription:
    'A webstite portfolio as my online resume and to showcase my simple projects that has been built'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
