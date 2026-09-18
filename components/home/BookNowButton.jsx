"use client";

import { useState } from 'react';
import { BookingModal } from '@/components/home/BookingModal';

export function BookNowButton({ pkg, className, style, children, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={style}
        {...props}
      >
        {children || 'Book Now'}
      </button>

      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        selectedPackage={pkg}
      />
    </>
  );
}