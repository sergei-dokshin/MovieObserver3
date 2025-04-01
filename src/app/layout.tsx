import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Pacifico } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainContainer from '@/components/MainContainer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const pacifico = Pacifico({
  variable: '--font-pacifico',
  subsets: ['latin'],
  weight: '400', // Укажите необходимый вес шрифта
  style: 'normal' // Укажите стиль шрифта
});

export const metadata: Metadata = {
  title: 'Festival - интересное вокруг Вас',
  description: 'Более 10,000 событий на любой вкус!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased bg-gray-950 text-white overflow-y-scroll`}
      >
        <MainContainer>
          <Header />
          {children}
          <Footer />
        </MainContainer>
      </body>
    </html>
  );
}
