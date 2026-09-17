"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { XMarkIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/lib/config';

export const MobileNav = ({ onClose, links }) => {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col justify-start bg-black/75 px-4 pt-4 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-[#c9a45c]/35 bg-gradient-to-b from-[#071c2b] to-[#041118] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(201,164,92,0.2)]"
        style={{ animation: 'fadeIn 0.25s ease-out' }}
      >
        {/* Top Header inside drawer */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex flex-col">
            <span className="font-playfair text-lg font-bold text-white tracking-wide">
              {siteConfig.name}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#c9a45c] font-bold">
              Luxury Expeditions
            </span>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-[#c9a45c] hover:bg-[#c9a45c] hover:text-[#051417]"
            onClick={onClose}
            aria-label="Close menu"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Nav list */}
        <nav className="my-5 flex flex-col space-y-1">
          {links.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/85 transition-all hover:bg-white/10 hover:text-[#f3dfab]"
            >
              <span>{link.label}</span>
              <span className="font-mono text-[10px] text-white/30">0{idx + 1}</span>
            </Link>
          ))}
        </nav>

        {/* Direct Booking CTA in mobile drawer */}
        <div className="border-t border-white/10 pt-4">
          <Link
            href="/#contact-booking"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c9a45c] via-[#dfbe78] to-[#f3dfab] py-3 text-xs font-bold uppercase tracking-wider text-[#051417] shadow-lg transition-transform active:scale-95"
          >
            <SparklesIcon className="h-4 w-4" />
            <span>Book a Journey</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
