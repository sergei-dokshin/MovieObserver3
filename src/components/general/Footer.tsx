import Link from 'next/link';

const routes = [
  {
    path: '/terms-conditions',
    name: 'Условия и положения'
  },
  {
    path: '/privacy-policy',
    name: 'Политика конфиденциальности'
  }
];

const Footer = () => {
  // "mt-auto" - сдвигает Footer в самый низ, увеличивая margin-top до наибольшего возможного размера
  return (
    <footer className="mt-auto flex justify-between items-center px-3 sm:px-6 h-16 border-t border-white/30 text-xs text-white/40">
      <small className="text-xs">
        &copy; 2025 Basmong. All rights reserved.
      </small>
      <ul className="flex gap-x-3 sm:gap-x-6">
        {routes.map((route) => (
          <li key={route.name} className="hover:text-white/80">
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
