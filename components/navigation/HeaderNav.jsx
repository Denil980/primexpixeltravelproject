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

      // Active section detection
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
    { id: 'contact-booking', href: '/#contact-booking', label: 'Book Now' },
    { id: 'contact', href: '/#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'py-2 sm:py-2.5 bg-[#051417]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.85)]'
          : 'py-2.5 sm:py-4 bg-[#051417]/90 sm:bg-gradient-to-b sm:from-[#051417]/90 sm:via-[#051417]/40 sm:to-transparent backdrop-blur-md sm:backdrop-blur-[2px]'
      }`}
    >
      {/* Top subtle gold ambient illumination line on scroll */}
      {scrolled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a45c]/50 to-transparent opacity-75"
        />
      )}

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ── Brand / Logo ── */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 select-none">
            {/* Gold Luxury Seal Emblem */}
            <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#173f3d] to-[#07191d] border border-[#c9a45c]/50 p-0.5 shadow-[0_0_20px_rgba(201,164,92,0.25)] transition-all duration-400 group-hover:border-[#e2c78b] group-hover:shadow-[0_0_28px_rgba(201,164,92,0.45)] group-hover:scale-105">
              <div className="absolute inset-[2px] rounded-full border border-[#c9a45c]/30 pointer-events-none" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#f3dfab] transition-transform duration-500 group-hover:rotate-45"
              >
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="url(#nav-gold-grad)"
                  stroke="#c9a45c"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2.5" fill="#051417" stroke="#f3dfab" strokeWidth="1" />
                <defs>
                  <linearGradient id="nav-gold-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f3dfab" />
                    <stop offset="0.5" stopColor="#c9a45c" />
                    <stop offset="1" stopColor="#8c6426" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <span className="font-playfair text-base sm:text-xl font-black tracking-wide text-white transition-colors group-hover:text-[#f3dfab] leading-none">
                {siteConfig.name}
              </span>
              <span className="mt-1 font-mono text-[7px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.32em] text-[#c9a45c] leading-none font-bold">
                Luxury Expeditions
              </span>
            </div>
          </Link>

          {/* ── Tablet & Desktop Floating Nav Pill Bar (Visible on md and up) ── */}
          <nav className="hidden md:flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <ul className="flex items-center gap-0.5 sm:gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`relative flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] transition-all duration-300 rounded-full ${
                        isActive
                          ? 'text-[#f3dfab] bg-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.5)]'
                          : 'text-white/75 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {/* Active gold under-dot */}
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#c9a45c] shadow-[0_0_8px_#c9a45c]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Mobile Right Actions (< md) ── */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/#contact-booking"
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#c9a45c] to-[#f3dfab] text-[#051417] text-[10px] font-bold uppercase tracking-wider shadow-[0_2px_10px_rgba(201,164,92,0.35)] active:scale-95 transition-transform"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* ── Mobile Horizontal Pill Bar (Always visible navigation on mobile) ── */}
        <div className="md:hidden mt-2 pt-1.5 pb-0.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={`m-pill-${link.label}`}
                href={link.href}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c9a45c]/30 to-[#f3dfab]/20 text-[#f3dfab] border border-[#c9a45c]/50 shadow-[0_0_10px_rgba(201,164,92,0.3)]'
                    : 'bg-white/[0.06] text-white/70 border border-white/10 hover:text-white hover:bg-white/15'
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
