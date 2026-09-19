"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Destination3DStack } from '@/components/destinations/Destination3DStack';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

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
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#F1F5F9] py-16 sm:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-slate-200/50 blur-[110px]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b8860b]" />
            <span className="font-mono text-xs sm:text-[12px] font-bold tracking-[0.25em] uppercase text-[#a17a24]">
              POPULAR DESTINATIONS
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#b8860b]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2c3f] tracking-tight leading-[1.15]">
            Where Do You Want To Go?
          </h2>
        </div>

        <Destination3DStack destinations={curatedDestinations} />

        <div className="mt-8 sm:mt-10">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#0f2c3f] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#0f2c3f]/20 transition-all duration-300 hover:bg-[#1e4d6b] hover:scale-105 active:scale-95"
          >
            <span>Explore More Destinations</span>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}