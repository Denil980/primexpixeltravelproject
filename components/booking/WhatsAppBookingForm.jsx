"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { packages, getPackageById } from '@/lib/data/packages';
import { getDestinationById } from '@/lib/data/destinations';
import { buildWhatsAppBookingUrl } from '@/lib/whatsapp';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import {
  MapPinIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  UsersIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

export const WhatsAppBookingForm = () => {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || '';

  // Find initial package or default to first featured
  const initialPkg = (packageParam ? getPackageById(packageParam) : null) || packages[0];
  const [selectedPkgId, setSelectedPkgId] = useState(initialPkg ? initialPkg.id : packages[0].id);

  // Sync if URL query param changes
  useEffect(() => {
    if (packageParam) {
      const found = getPackageById(packageParam);
      if (found) setSelectedPkgId(found.id);
    }
  }, [packageParam]);

  const activePkg = getPackageById(selectedPkgId) || packages[0];
  const destination = activePkg ? getDestinationById(activePkg.destinationId) : null;
  const destName = destination ? `${destination.city}, ${destination.country}` : activePkg?.destination || '';

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [guests, setGuests] = useState('2 Adults');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone / WhatsApp number.';
    } else if (phone.trim().length < 6) {
      newErrors.phone = 'Please enter a valid phone number with country code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const whatsappUrl = buildWhatsAppBookingUrl({
        packageTitle: activePkg.title,
        destination: destName,
        duration: activePkg.duration,
        price: activePkg.price,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        travelDate: travelDate || undefined,
        guests: guests || undefined,
        notes: notes.trim() || undefined,
      });

      setSubmitted(true);
      // Open WhatsApp directly in new tab/window
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* ── Left Column: Selected Package Showcase & Live WhatsApp Preview ── */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Selected Package Luxury Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#07191d] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Card Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-950">
            <ResponsiveImage
              src={activePkg.image}
              alt={activePkg.title}
              width={700}
              height={450}
              priority
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07191d] via-[#07191d]/30 to-black/30" />

            {/* Top Destination & Duration Badges */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <MapPinIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
                {destName}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-black/60 border border-white/20 px-2.5 py-1 text-xs font-semibold text-[#f3dfab] backdrop-blur-md">
                <ClockIcon className="h-3.5 w-3.5" />
                {activePkg.duration}
              </span>
            </div>

            {/* Bottom Title Overlay */}
            <div className="absolute bottom-4 inset-x-4 text-white z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a45c] block mb-1">
                Selected Itinerary
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
                {activePkg.title}
              </h3>
            </div>
          </div>

          {/* Package Details & Pricing */}
          <div className="p-6 sm:p-7 flex flex-col gap-5">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                  Starting Price
                </span>
                <span className="font-playfair text-3xl font-black text-[#f3dfab]">
                  {activePkg.price}
                </span>
                <span className="text-xs text-white/50 ml-1">/ person</span>
              </div>
              <span className="rounded-full bg-[#c9a45c]/20 border border-[#c9a45c]/40 px-3 py-1 text-xs font-bold text-[#e2c78b]">
                All-Inclusive VIP
              </span>
            </div>

            <p className="font-inter text-xs text-white/75 leading-relaxed">
              {activePkg.description}
            </p>

            {/* Key Inclusions Preview */}
            {activePkg.highlights && (
              <div className="space-y-2 border-t border-white/10 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9a45c]">
                  Highlights Included
                </span>
                <ul className="space-y-1.5">
                  {activePkg.highlights.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-white/80">
                      <SparklesIcon className="h-3.5 w-3.5 text-[#c9a45c] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Assurance footnote */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.04] border border-white/10 p-3.5 text-xs text-white/70">
              <ShieldCheckIcon className="h-5 w-5 text-[#c9a45c] shrink-0" />
              <span>Direct WhatsApp reservation with instant consultation & bespoke adjustments.</span>
            </div>
          </div>
        </div>

        {/* Live Auto-Message Preview Box */}
        <div className="rounded-2xl border border-white/10 bg-[#051417]/80 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#e2c78b]">
            <ChatBubbleLeftRightIcon className="h-4 w-4 text-[#c9a45c]" />
            <span>Auto-Generated WhatsApp Message</span>
          </div>
          <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 text-[11px] font-mono text-white/80 leading-relaxed space-y-1 whitespace-pre-wrap select-all">
            <p className="text-emerald-400 font-bold">🌟 NEW TRAVEL INQUIRY 🌟</p>
            <p>📦 Package: {activePkg.title}</p>
            <p>🌍 Destination: {destName}</p>
            <p>⏱️ Duration: {activePkg.duration} | Price: {activePkg.price}</p>
            <p className="text-[#c9a45c] mt-1">👤 Guest: {name || '[Your Name]'}</p>
            <p className="text-[#c9a45c]">📱 Phone: {phone || '[Your Phone]'}</p>
            {travelDate && <p>🗓️ Date: {travelDate}</p>}
            <p>👥 Guests: {guests}</p>
          </div>
        </div>
      </div>

      {/* ── Right Column: Customer Details Form ── */}
      <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-[#07191d]/90 p-7 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#c9a45c] animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#e2c78b]">
              Fast Reservation Flow
            </span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-black text-white">
            Enter Booking Details
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/70">
            Fill in your preferred travel dates and contact number. Clicking the button will open WhatsApp with your pre-formatted package details ready to send.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Package Selector Dropdown */}
          <div>
            <label htmlFor="packageSelect" className="block text-xs font-bold uppercase tracking-wider text-white/85 mb-2">
              Select Package
            </label>
            <select
              id="packageSelect"
              value={selectedPkgId}
              onChange={(e) => setSelectedPkgId(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#051417] px-4 py-3.5 text-sm font-medium text-white outline-none transition focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/30"
            >
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id} className="bg-[#07191d] text-white">
                  {pkg.title} ({pkg.destination} • {pkg.price})
                </option>
              ))}
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-white/85 mb-2 flex items-center gap-1.5">
              <UserIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
              <span>Full Name <span className="text-rose-400">*</span></span>
            </label>
            <input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="e.g. John Doe"
              className={`w-full rounded-xl border px-4 py-3.5 text-sm font-medium text-white placeholder:text-white/35 outline-none transition bg-[#051417] ${
                errors.name
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-400/30'
                  : 'border-white/15 focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/30'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400 font-semibold">{errors.name}</p>
            )}
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-white/85 mb-2 flex items-center gap-1.5">
              <PhoneIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
              <span>Phone / WhatsApp Number <span className="text-rose-400">*</span></span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
              }}
              placeholder="e.g. +91 98765 43210"
              className={`w-full rounded-xl border px-4 py-3.5 text-sm font-medium text-white placeholder:text-white/35 outline-none transition bg-[#051417] ${
                errors.phone
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-400/30'
                  : 'border-white/15 focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/30'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-400 font-semibold">{errors.phone}</p>
            )}
          </div>

          {/* Two-column: Travel Date & Guests */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="travelDate" className="block text-xs font-bold uppercase tracking-wider text-white/85 mb-2 flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
                <span>Expected Travel Date</span>
              </label>
              <input
                id="travelDate"
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#051417] px-4 py-3.5 text-sm font-medium text-white outline-none transition focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/30"
              />
            </div>

            <div>
              <label htmlFor="guests" className="block text-xs font-bold uppercase tracking-wider text-white/85 mb-2 flex items-center gap-1.5">
                <UsersIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
                <span>Number of Guests</span>
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-[#051417] px-4 py-3.5 text-sm font-medium text-white outline-none transition focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/30"
              >
                <option value="1 Solo Traveler" className="bg-[#07191d] text-white">1 Solo Traveler</option>
                <option value="2 Adults (Couple)" className="bg-[#07191d] text-white">2 Adults (Couple)</option>
                <option value="3 - 4 Travelers" className="bg-[#07191d] text-white">3 - 4 Travelers</option>
                <option value="Family Group (5+)" className="bg-[#07191d] text-white">Family Group (5+)</option>
                <option value="Corporate / Large Group" className="bg-[#07191d] text-white">Corporate / Large Group</option>
              </select>
            </div>
          </div>

          {/* Special Requests / Custom Notes */}
          <div>
            <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-white/85 mb-2 flex items-center gap-1.5">
              <DocumentTextIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
              <span>Special Requests / Notes (Optional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Flight assistance, honeymoon surprise, dietary preferences, extra days..."
              className="w-full rounded-xl border border-white/15 bg-[#051417] px-4 py-3 text-sm font-medium text-white placeholder:text-white/35 outline-none transition focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/30"
            />
          </div>

          {/* Confirmation Alert */}
          {submitted && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 p-4 text-xs font-semibold text-emerald-300">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>WhatsApp has been launched with your auto-created itinerary details! If it did not open automatically, click the button again.</span>
            </div>
          )}

          {/* Submit Button: Launch WhatsApp */}
          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
            <span>Send Booking Inquiry on WhatsApp</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-white" />
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-white/50 font-inter">
          Your conversation will connect directly with our senior travel concierge with zero wait time.
        </p>
      </div>
    </div>
  );
};
