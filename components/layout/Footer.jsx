import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Tour Packages', href: '/#featured-packages' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact / Booking', href: '/#contact-booking' },
];

export const Footer = () => (
  <footer className="w-full overflow-hidden bg-[#0d292b] text-white">
    {/* Top Section */}
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
      {/* Brand */}
      <div className="lg:col-span-1">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8ad]/40 bg-[#173f3d]">
            <GlobeAltIcon className="h-5 w-5 text-[#ead8ad]" />
          </span>
          <span className="font-playfair text-xl font-semibold text-white">
            {siteConfig.name}
          </span>
        </div>
        <p className="mb-6 max-w-xs font-inter text-sm leading-7 text-white/60">
          Crafting unforgettable travel experiences across Kashmir and the world. Personally curated. Always memorable.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="mb-5 font-playfair text-lg font-semibold text-[#ead8ad]">Quick Links</h3>
        <nav className="flex flex-col gap-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-block font-inter text-sm text-white/60 transition-all hover:translate-x-1 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Popular Destinations */}
      <div>
        <h3 className="mb-5 font-playfair text-lg font-semibold text-[#ead8ad]">Popular Destinations</h3>
        <div className="flex flex-col gap-2.5">
          {[
            { label: 'All Destinations', href: '/#destinations' },
            { label: 'Gulmarg', href: '/destinations/gulmarg' },
            { label: 'Pahalgam', href: '/destinations/pahalgam' },
            { label: 'Dubai, UAE', href: '/destinations/dubai' },
            { label: 'Maldives', href: '/destinations/maldives' },
            { label: 'Switzerland', href: '/destinations/switzerland' },
            { label: 'Thailand', href: '/destinations/thailand' },
            { label: 'Paris, France', href: '/destinations/paris' },
          ].map((dest) => (
            <Link
              key={dest.href}
              href={dest.href}
              className="inline-block font-inter text-sm text-white/60 transition-all hover:translate-x-1 hover:text-white"
            >
              {dest.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="mb-5 font-playfair text-lg font-semibold text-[#ead8ad]">Contact Us</h3>
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-3">
            <PhoneIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ead8ad]" />
            <div>
              <p className="mb-0.5 font-inter text-xs uppercase tracking-wide text-white/40">Phone Support</p>
              <a
                href={`tel:+91${siteConfig.whatsappNumber.replace('91', '')}`}
                className="font-inter text-sm font-medium text-white transition-colors hover:text-[#ead8ad]"
              >
                +91 {siteConfig.whatsappNumber.replace('91', '')}
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <EnvelopeIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ead8ad]" />
            <div>
              <p className="mb-0.5 font-inter text-xs uppercase tracking-wide text-white/40">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all font-inter text-sm font-medium text-white transition-colors hover:text-[#ead8ad]"
              >
                {siteConfig.email}
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ead8ad]" />
            <div>
              <p className="mb-0.5 font-inter text-xs uppercase tracking-wide text-white/40">Location</p>
              <p className="font-inter text-sm text-white">{siteConfig.location}</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <ClockIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ead8ad]" />
            <div>
              <p className="mb-0.5 font-inter text-xs uppercase tracking-wide text-white/40">Business Hours</p>
              <p className="font-inter text-sm text-white">{siteConfig.businessHours}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-inter text-xs text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/about" className="font-inter text-xs text-white/40 transition-colors hover:text-white">About</Link>
          <Link href="/#destinations" className="font-inter text-xs text-white/40 transition-colors hover:text-white">Destinations</Link>
          <Link href="/#services" className="font-inter text-xs text-white/40 transition-colors hover:text-white">Services</Link>
          <Link href="/#contact-booking" className="font-inter text-xs text-white/40 transition-colors hover:text-white">Contact</Link>
          <Link href="/#featured-packages" className="font-inter text-xs text-white/40 transition-colors hover:text-white">Packages</Link>
        </div>
      </div>
    </div>
  </footer>
);
