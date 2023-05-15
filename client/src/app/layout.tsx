import './globals.css';
import { Inter } from 'next/font/google';

import { AppProvider } from '@/contexts/AppProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Meegu App',
  description: 'Meegu challenge app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
