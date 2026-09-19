"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { buildWhatsAppBookingUrl } from '@/lib/whatsapp';
import { getDestinationById } from '@/lib/data/destinations';

const COUNTRIES = [
  'India',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Kuwait',
  'Bahrain',
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Singapore',
  'Malaysia',
  'Germany',
  'France',
  'Other Country'
];

export function BookingModal({ isOpen, onClose, selectedPackage }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    adults: '2',
    children: '0',
    travelDate: '',
    specialRequirements: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const destination = selectedPackage ? getDestinationById(selectedPackage.destinationId) : null;
  const destinationName = destination
    ? destination.city + ', ' + destination.country
    : selectedPackage?.destination || '';

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        adults: '2',
        children: '0',
        travelDate: '',
        specialRequirements: '',
      });
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number with country code.');
      return;
    }
    if (!formData.country) {
      setError('Please select your country.');
      return;
    }
    if (!formData.adults || parseInt(formData.adults, 10) < 1) {
      setError('Please specify at least 1 adult.');
      return;
    }
    if (!formData.travelDate) {
      setError('Please select your preferred travel date.');
      return;
    }

    setError('');
    const url = buildWhatsAppBookingUrl({
      packageTitle: selectedPackage?.title || 'Custom Package',
      destination: destinationName || undefined,
      duration: selectedPackage?.duration,
      price: selectedPackage?.price,
      customerName: formData.name.trim(),
      customerEmail: formData.email.trim(),
      customerPhone: formData.phone.trim(),
      country: formData.country,
      adults: formData.adults,
      children: formData.children,
      travelDate: formData.travelDate,
      notes: formData.specialRequirements,
    });

    setSuccess(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Gold top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] shrink-0" />

        {/* Header - Fixed top */}
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between border-b border-slate-100 shrink-0 bg-white">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b8860b] mb-1">Personalized Inquiry</p>
            <h2 className="font-playfair text-2xl font-black text-[#0f2c3f] leading-tight">
              Book Your Experience
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 shrink-0"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">

          {/* Selected Package Badge */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#b8860b] mb-1">Selected Package</p>
            <p className="font-playfair text-lg font-bold text-[#0f2c3f] leading-snug">
              {selectedPackage?.title || 'Custom Tour Package'}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              {destinationName && (
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-3.5 w-3.5 text-[#b8860b]" />
                  {destinationName}
                </span>
              )}
              {selectedPackage?.duration && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-3.5 w-3.5 text-[#b8860b]" />
                  {selectedPackage.duration}
                </span>
              )}
              {selectedPackage?.price && (
                <span className="font-semibold text-[#b8860b] ml-auto">{selectedPackage.price} / person</span>
              )}
            </div>
          </div>

          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-50 px-6 py-8 text-center">
              <CheckCircleIcon className="h-12 w-12 text-emerald-600" />
              <p className="font-playfair text-2xl font-bold text-slate-900">Opening WhatsApp!</p>
              <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                Thank you! Your details have been formatted for instant WhatsApp booking. Our specialist will respond shortly.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-3 rounded-xl border border-slate-300 bg-white px-6 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-[#b8860b] transition-all shadow-sm"
              >
                Modify or Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
                />
              </div>

              {/* Phone with Country Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone (with Country Code) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
                >
                  <option value="" disabled>Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-white text-slate-900">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Adults & Children */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Adults *</label>
                  <input
                    type="number"
                    name="adults"
                    min="1"
                    max="50"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Children</label>
                  <input
                    type="number"
                    name="children"
                    min="0"
                    max="20"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
                  />
                </div>
              </div>

              {/* Preferred Travel Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Travel Date *</label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20 [color-scheme:light]"
                />
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  rows={2}
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="Dietary needs, accessibility, celebration, etc."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2.5 font-medium">{error}</p>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#1e4d6b] active:scale-95 shadow-md bg-[#0f2c3f]"
                >
                  Confirm Booking
                </button>
                <p className="mt-2 text-[11px] text-slate-500 text-center">
                  We&apos;ll respond within 24 hours.
                </p>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}