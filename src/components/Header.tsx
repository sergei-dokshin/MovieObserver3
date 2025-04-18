'use client';

import Link from 'next/link';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import SearchForm from './SearchForm';

const routes = [
  { name: 'Главная', path: '/' },
  { name: 'Топ 250', path: '/movies/top250' },
  { name: 'Популярное', path: '/movies/popular' },
  { name: 'Сейчас в кино', path: '/movies/now_playing' }
];

const Header = () => {
  const activePathname = usePathname(); // требует 'use client'

  return (
    <header className="flex justify-between items-center border-b border-white/10 h-14 px-1  sm:px-5">
      <Logo />

      <SearchForm className="h-8 sm:w-[400px] mx-1 text-sm px-3" />

      <nav className="h-full">
        <ul className="flex space-x-4 text-sm h-full">
          {routes.map((route) => (
            <li
              key={route.name}
              className={cn(
                'hover:text-white transition relative flex items-center',
                {
                  'text-white/90': activePathname === route.path,
                  'text-white/50': activePathname !== route.path
                }
              )}
            >
              <Link href={route.path}>{route.name}</Link>
              {/* motion.div и layoutId(должен быть одинаковый для всех элементов) добавляют анимационный переход */}
              {activePathname === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-[0.12rem] w-full absolute bottom-0"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
