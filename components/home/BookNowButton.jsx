"use client";

import { useState } from 'react';
import { BookingModal } from '@/components/home/BookingModal';

export function BookNowButton({ pkg, className, style, children, onClick, ...props }) {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    if (e) {
      e.stopPropagation();
      if (typeof e.preventDefault === 'function') e.preventDefault();
    }
    if (onClick) onClick(e);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
        style={style}
        {...props}
      >
        {children || 'Book Now'}
      </button>

      {open && (
        <BookingModal
          isOpen={open}
          onClose={() => setOpen(false)}
          selectedPackage={pkg}
        />
      )}
    </>
  );
}