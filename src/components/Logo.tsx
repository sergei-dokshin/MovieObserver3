import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="select-none text-xs md:text-sm font-pacifico px-2 text-center leading-tight"
    >
      Movie
      <br />
      Observer
    </Link>
  );
};

export default Logo;
