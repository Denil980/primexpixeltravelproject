"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { buildWhatsAppBookingUrl } from '@/lib/whatsapp';
import { getDestinationById } from '@/lib/data/destinations';

export function BookingModal({ isOpen, onClose, selectedPackage }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const destination = selectedPackage ? getDestinationById(selectedPackage.destinationId) : null;
  const destinationName = destination
    ? destination.city + ', ' + destination.country
    : selectedPackage?.destination || '';

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }
    setError('');
    const url = buildWhatsAppBookingUrl({
      packageTitle: selectedPackage?.title || 'Custom Package',
      destination: destinationName || undefined,
      duration: selectedPackage?.duration,
      price: selectedPackage?.price,
      customerName: name.trim(),
      customerPhone: phone.trim(),
    });
    setSuccess(true);
    setName('');
    setPhone('');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-[#0d2a2d] shadow-2xl overflow-hidden">
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#c9a45c] to-[#e2c78b]" />

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a45c] mb-1">Start Your Journey</p>
              <h2 className="font-playfair text-2xl font-black text-white leading-tight">
                Book This Package
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200 shrink-0 mt-0.5"
              aria-label="Close"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Selected package info */}
          {selectedPackage && (
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a45c] mb-1.5">Selected Package</p>
              <p className="font-playfair text-lg font-bold text-white leading-snug">{selectedPackage.title}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/55">
                {destinationName && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
                    {destinationName}
                  </span>
                )}
                {selectedPackage.duration && (
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
                    {selectedPackage.duration}
                  </span>
                )}
                {selectedPackage.price && (
                  <span className="font-semibold text-[#e2c78b]">{selectedPackage.price} / person</span>
                )}
              </div>
            </div>
          )}

          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-900/30 px-6 py-8 text-center">
              <CheckCircleIcon className="h-10 w-10 text-emerald-400" />
              <p className="font-playfair text-xl text-white">Opening WhatsApp!</p>
              <p className="text-sm text-white/55">Our travel specialist will reply to you shortly.</p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-2 rounded-full border border-white/20 px-5 py-1.5 text-xs text-white/60 hover:text-white hover:border-[#c9a45c] transition-all"
              >
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/20"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/20"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-rose-400">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl py-3.5 text-sm font-bold text-[#051417] transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg shadow-[#c9a45c]/20 mt-2"
                style={{ background: 'linear-gradient(135deg, #c9a45c 0%, #f3dfab 100%)' }}
              >
                Book Now via WhatsApp 💬
              </button>

              <p className="text-[10px] text-white/25 text-center">
                No upfront payment · We will contact you shortly
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}