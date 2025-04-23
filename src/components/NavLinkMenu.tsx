import { cn } from '@/utils/cn';
import Link from 'next/link';
import Logo from './Logo';

interface NavLinkMenuProps {
  routes: { name: string; path: string }[];
}

const NavLinkMenu = ({ routes }: NavLinkMenuProps) => {
  return (
    <div className="absolute right-2 top-[75px] flex flex-col items-center bg-dark-lighter rounded-md shadow-lg z-50 w-36 outline-2 outline-accent">
      <Logo className="pt-2 pb-4" disabledLink={true} />
      <nav className="h-full w-full">
        <div className="flex flex-col text-sm h-full w-full">
          {routes.map((route) => (
            <Link
              href={route.path}
              key={route.name}
              className="w-full py-2 text-white/70 hover:text-accent hover:bg-white/5 text-center transition relative border-b-1 border-white/10 first:border-t-1 last:border-0 select-none"
            >
              {route.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavLinkMenu;
