"use client";
import React, { useEffect, useRef } from 'react';
import { NavItem } from '@/components/navigation/NavItem';
import { XMarkIcon } from '@heroicons/react/24/outline';
export const MobileNav = ({ onClose, links }) => {
    const overlayRef = useRef(null);
    // Close on Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);
    // Prevent body scroll and focus trap
    useEffect(() => {
        var _a;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const firstLink = (_a = overlayRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('a');
        if (firstLink) firstLink.focus();
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);
    return (<div ref={overlayRef} className="pointer-events-auto fixed inset-0 z-50 flex items-start justify-center bg-[#031019]/35 px-4 pt-5 backdrop-blur-sm sm:pt-7" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/25 bg-white/10 px-14 py-3 shadow-2xl backdrop-blur-2xl" style={{ animation: 'fadeIn 0.2s ease-out' }}>
        <button type="button" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ead8ad]" onClick={onClose} aria-label="Close menu">
          <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
        </button>
        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {links.map((link) => (<NavItem key={link.href} href={link.href} onClick={onClose} className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/15 hover:text-white sm:px-4">
              {link.label}
            </NavItem>))}
        </nav>
      </div>
    </div>);
};
