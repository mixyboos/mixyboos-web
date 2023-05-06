import Link from "next/link";
import React from "react";

type NavLinkProps = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};
const NavLink = ({ title, href, icon }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="text-cerise-800 border-lemon-100 hover:bg-cocoa-100 dark:bg-cerise-900 flex items-center border-2 px-3 py-2 text-xs font-bold uppercase leading-snug hover:opacity-75 dark:border-gray-100 dark:text-slate-300"
    >
      {icon && <span className="dark:text-slate-300"> {icon}</span>}
      <span className="text-md ml-2 hidden sm:block">{title}</span>
    </Link>
  );
};

export default NavLink;
