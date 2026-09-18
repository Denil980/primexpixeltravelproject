"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const HeaderNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['hero', 'destinations', 'featured-packages', 'services', 'contact-booking', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', href: '/#hero', label: 'Home' },
    { id: 'destinations', href: '/#destinations', label: 'Destinations' },
    { id: 'featured-packages', href: '/#featured-packages', label: 'Packages' },
    { id: 'services', href: '/#services', label: 'Benefits' },
    { id: 'contact', href: '/#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'py-2 sm:py-2.5 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md'
          : 'py-2.5 sm:py-4 bg-white/80 sm:bg-gradient-to-b sm:from-white/90 sm:via-white/50 sm:to-transparent backdrop-blur-md'
      }`}
    >
      {scrolled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#b8860b] to-transparent opacity-80"
        />
      )}

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Logo */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 select-none">
            <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0f2c3f] to-[#0a2540] border border-[#b8860b]/50 p-0.5 shadow-sm transition-all duration-400 group-hover:scale-105">
              <div className="absolute inset-[2px] rounded-full border border-[#d4af37]/30 pointer-events-none" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#fef08a] transition-transform duration-500 group-hover:rotate-45"
              >
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="url(#nav-gold-grad)"
                  stroke="#b8860b"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2.5" fill="#0f2c3f" stroke="#fef08a" strokeWidth="1" />
                <defs>
                  <linearGradient id="nav-gold-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.5" stopColor="#d4af37" />
                    <stop offset="1" stopColor="#b8860b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-playfair text-base sm:text-xl font-black tracking-wide text-[#0f2c3f] transition-colors group-hover:text-[#b8860b] leading-none">
                {siteConfig.name}
              </span>
              <span className="mt-1 font-mono text-[7px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.32em] text-[#b8860b] leading-none font-bold">
                Luxury Expeditions
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center rounded-full border border-slate-200 bg-slate-50/80 px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-md shadow-sm">
            <ul className="flex items-center gap-0.5 sm:gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`relative flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] transition-all duration-300 rounded-full ${
                        isActive
                          ? 'text-[#0f2c3f] bg-white shadow-sm border border-slate-200'
                          : 'text-slate-600 hover:text-[#0f2c3f] hover:bg-slate-200/50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#b8860b]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>


        </div>

        {/* Mobile Horizontal Bar */}
        <div className="md:hidden mt-2 pt-1.5 pb-0.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={`m-pill-${link.label}`}
                href={link.href}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-[#0f2c3f] text-white border border-[#0f2c3f]'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};