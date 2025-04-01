import Link from 'next/link';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="flex items-center flex-nowrap gap-x-2 select-none"
      >
        <p className="font-pacifico select-none">Festival</p>
      </Link>
    </div>
  );
};

export default Logo;
