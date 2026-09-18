"use client";

import React, { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Destination3DStack } from '@/components/destinations/Destination3DStack';

// 6 Curated destinations matching the exact reference design
const curatedDestinations = [
  {
    id: 'kashmir',
    city: 'Kashmir',
    country: 'India',
    subtitle: 'Snowy Paradise',
    image: '/images/kashmir.jpg',
    code: 'SXR',
    featured: true,
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    subtitle: 'Modern Wonders',
    image: '/images/dubai.jpg',
    code: 'DXB',
    featured: true,
  },
  {
    id: 'maldives',
    city: 'Maldives',
    country: 'Maldives',
    subtitle: 'Tropical Bliss',
    image: '/images/international.jpg',
    code: 'MLE',
    featured: true,
  },
  {
    id: 'thailand',
    city: 'Thailand',
    country: 'Thailand',
    subtitle: 'Exotic Escapes',
    image: '/images/hero-travel.jpg',
    code: 'BKK',
    featured: true,
  },
  {
    id: 'switzerland',
    city: 'Switzerland',
    country: 'Switzerland',
    subtitle: 'Alpine Beauty',
    image: '/images/international-thumb.jpg',
    code: 'ZRH',
    featured: true,
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    subtitle: 'Cultural Elegance',
    image: '/images/international.jpg',
    code: 'CDG',
    featured: true,
  },
];

export function DestinationsSection() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="relative w-full overflow-hidden bg-[#061e22] py-20 sm:py-24"
    >
      {/* ── Atmospheric Vintage Watermarks & Star Dust Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle radial spotlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-radial from-[#173f3d]/60 via-[#0a272c]/40 to-transparent blur-[110px]" />

        {/* Vintage Travel Stamp Watermark in Top-Left (Matches Reference) */}
        <div className="absolute top-12 left-8 sm:left-16 w-36 h-36 sm:w-48 sm:h-48 opacity-[0.08] pointer-events-none border-2 border-dashed border-[#e2c78b] rounded-full flex items-center justify-center rotate-[-15deg]">
          <div className="text-center font-mono text-[9px] uppercase tracking-widest text-[#e2c78b]">
            ★ EXPEDITIONS ★<br />SINCE 2024<br />WORLD VOYAGES
          </div>
        </div>

        {/* Vintage Travel Stamp Watermark in Bottom-Right (Matches Reference) */}
        <div className="absolute bottom-10 right-8 sm:right-16 w-40 h-40 sm:w-52 sm:h-52 opacity-[0.07] pointer-events-none border border-double border-[#e2c78b] rounded-full flex items-center justify-center rotate-[20deg]">
          <div className="text-center font-serif text-[10px] italic text-[#e2c78b]">
            Certified Luxury<br />Global Sanctuary
          </div>
        </div>

        {/* Seamless Blending Top & Bottom */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#071924] to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07191d] to-transparent" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* ── Section Header (Matches Reference Image) ── */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 mb-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a45c]" />
            <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.3em] uppercase text-[#e2c78b]">
              POPULAR DESTINATIONS
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a45c]" />
          </div>

          {/* Main Heading */}
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Where Do You Want To Go?
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-xs sm:text-sm text-slate-200/80 leading-relaxed max-w-lg mx-auto font-sans">
            From serene mountains to vibrant cities, explore destinations that inspire.
          </p>
        </div>

        {/* ── 3D Stack / Fan Interactive Cards Deck ── */}
        <Destination3DStack destinations={curatedDestinations} />
      </Container>
    </section>
  );
}

