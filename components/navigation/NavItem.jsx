"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
export const NavItem = ({ href, children, onClick, className = '' }) => {
    const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');
  const hash = href.includes('#') ? href.substring(href.indexOf('#')) : '';
  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);
  const isActive = hash ? pathname === '/' && currentHash === hash : pathname === href;
    return (<Link href={href} onClick={onClick} className={clsx('group relative inline-flex -translate-y-0.5 items-center px-3 py-2 text-sm font-medium transition-all duration-300 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', isActive ? 'text-primary' : 'text-primaryText/70 hover:-translate-y-1 hover:text-primary', className)}>
      <span className="relative">
      {children}
        <span className={clsx('absolute -bottom-1 left-0 h-0.5 rounded-full bg-accent transition-all duration-300', isActive ? 'w-full' : 'w-0 group-hover:w-full')} />
      </span>
    </Link>);
};
