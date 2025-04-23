'use client';

import Link from 'next/link';
import Logo from '../Logo';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import SearchForm from '../SearchForm';
import { useEffect, useRef, useState } from 'react';
import { RowsIcon } from '@radix-ui/react-icons';
import NavLinkList from '../NavLinkMenu';

const routes = [
  { name: 'Главная', path: '/' },
  { name: 'Топ 250', path: '/movies/top250' },
  { name: 'Популярное', path: '/movies/popular' },
  { name: 'Сейчас в кино', path: '/movies/now_playing' }
];

const Header = () => {
  const activePathname = usePathname();
  const [isLinkMenuActive, setIsLinkMenuActive] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Закрываем меню при клике вне меню
  function handleMenuClose(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsLinkMenuActive(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleMenuClose);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleMenuClose);
    };
  }, []);

  return (
    <header className="flex justify-between items-center bg-dark-lighter border-b border-white/10 h-14 px-1 sm:px-5 relative">
      <Logo />

      <SearchForm className="h-8 sm:w-[400px] mx-1 text-sm px-3" />

      <nav className="h-full">
        <ul className="hidden xl:flex space-x-4 text-sm h-full">
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

        <div className="flex xl:hidden items-center pl-5 h-full" ref={menuRef}>
          <RowsIcon
            className={cn(
              'text-white/80 hover:text-white bg-white/10 hover:bg-white/15 p-2 rounded-md h-7 w-7 transition cursor-pointer select-none',
              isLinkMenuActive && 'text-accent'
            )}
            onClick={() => setIsLinkMenuActive((prev) => !prev)}
          />
          {isLinkMenuActive && <NavLinkList routes={routes} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
