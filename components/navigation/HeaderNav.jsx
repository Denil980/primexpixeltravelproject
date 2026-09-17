"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Bars3Icon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/lib/config';

export const HeaderNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = () => setMobileOpen(true);
  const closeMenu = () => setMobileOpen(false);

  const navLinks = [
    { href: '/#hero', label: 'Home' },
    { href: '/#destinations', label: 'Destinations' },
    { href: '/#featured-packages', label: 'Tour Packages' },
    { href: '/#services', label: 'Services' },
    { href: '/#contact-booking', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#071c2b]/90 border-b border-white/10 shadow-lg backdrop-blur-md py-3 sm:py-3.5'
          : 'bg-[#071c2b]/45 border-b border-white/5 backdrop-blur-sm py-4 sm:py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead8ad]/40 bg-[#173f3d] transition-transform duration-300 group-hover:scale-105">
            <GlobeAltIcon className="h-4 w-4 text-[#ead8ad]" />
          </span>
          <span className="font-playfair text-lg sm:text-xl font-semibold tracking-wide text-white">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-inter text-sm font-medium text-white/80 transition-colors hover:text-[#ead8ad]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/#contact-booking"
            className="hidden items-center gap-1.5 rounded-full bg-[#ead8ad] px-4 py-2 text-xs font-semibold text-[#0d292b] transition-all hover:bg-white hover:shadow-md sm:inline-flex"
          >
            <span>Book a Journey</span>
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ead8ad] lg:hidden"
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen && <MobileNav onClose={closeMenu} links={navLinks} />}
    </header>
  );
};
