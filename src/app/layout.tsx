import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Pacifico } from 'next/font/google';
import './globals.css';
import Header from '@/components/general/Header';
import Footer from '@/components/general/Footer';
import MainContainer from '@/components/general/MainContainer';

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
  title: 'MovieObserver - все фильмы планеты',
  description: 'Более 447млн. фильмов и сериалов'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased bg-dark-main text-white overflow-y-scroll`}
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
