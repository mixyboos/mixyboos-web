import React from 'react';
import Link from 'next/link';

interface INavLinkProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
}
const NavLink = ({ title, href, icon }: INavLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 text-xs font-bold leading-snug text-gray-800 uppercase border border-gray-200 hover:bg-gray-200 hover:opacity-75"
    >
      {icon && icon}
      <span className="ml-2 text-md">{title}</span>
    </Link>
  );
};

export default NavLink;
