"use client";

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { siteConfig } from '@/lib/config';
import {
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { value: '500+', label: 'Happy Travellers' },
  { value: '10+', label: 'Destinations' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '24/7', label: 'WhatsApp Support' },
];

const highlights = [
  'Kashmir-born travel specialist with authentic valley expertise',
  'Direct personal WhatsApp coordination — no call centers',
  'Handpicked 4-star & 5-star hotels, luxury houseboats & private cabs',
  'Fully custom itineraries tailored to your budget & schedule',
];

export function HomeAboutSection() {
  return (
    <section
      id="about-section"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#F8FAFC] py-16 sm:py-20"
    >
      {/* Soft Ambient Background Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] rounded-full bg-[#b8860b]/10 blur-[130px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          {/* Left Column: Visual Image Deck with Interactive Hover Effects */}
          <div className="lg:col-span-6 relative group">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Portrait Card */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl border border-slate-200/80 transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:border-[#b8860b]/50 group-hover:-translate-y-1.5">
                <ResponsiveImage
                  src="/images/kashmir.jpg"
                  alt="About Tours & Travels"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2c3f]/90 via-[#0f2c3f]/25 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute bottom-6 left-6 right-6 text-white transition-transform duration-500 group-hover:translate-y-[-2px]">
                  <span className="font-mono text-[10px] font-bold text-[#fef08a] uppercase tracking-widest block mb-1">
                    OUR HEARTLAND
                  </span>
                  <h3 className="font-playfair text-2xl font-bold text-white group-hover:text-[#fef08a] transition-colors">
                    Kashmir & Global Expeditions
                  </h3>
                  <p className="font-sans text-xs text-slate-200 mt-1">Crafted with love & local knowledge</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content with Card & Button Hover Effects */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/20 transition-all duration-300 hover:bg-[#b8860b]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8860b] animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#a17a24]">
                ABOUT US
              </span>
            </div>

            {/* Title */}
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2c3f] tracking-tight leading-[1.12]">
              Travel Crafted With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#a17a24]">
                Passion & Purpose
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 font-sans text-sm sm:text-base text-slate-600 leading-relaxed">
              We are <strong className="text-[#0f2c3f] font-semibold">{siteConfig.name}</strong> — a personally-run travel consultancy dedicated to creating unforgettable journeys across Kashmir and international destinations. When you reach out to us, you speak directly to <strong className="text-[#0f2c3f] font-semibold">{siteConfig.ownerName}</strong>, who personally plans and coordinates every detail.
            </p>

            {/* Key Feature Checkpoints with Hover Highlight */}
            <div className="mt-6 w-full pt-4 border-t border-slate-200/80">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 p-2 rounded-xl text-xs sm:text-sm text-slate-700 font-medium transition-all duration-300 hover:bg-white hover:shadow-sm hover:translate-x-1 border border-transparent hover:border-slate-200/70"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-[#b8860b] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Grid with Interactive Hover Cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center transition-all duration-300 hover:bg-[#0f2c3f] hover:border-[#0f2c3f] hover:shadow-lg hover:-translate-y-1 group/stat cursor-pointer"
                >
                  <span className="font-playfair text-xl sm:text-2xl font-black text-[#0f2c3f] group-hover/stat:text-[#fef08a] transition-colors block">
                    {s.value}
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-500 group-hover/stat:text-slate-300 transition-colors block mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button with Hover Elevation */}
            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0f2c3f] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#0f2c3f]/20 transition-all duration-300 hover:bg-[#1e4d6b] hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-[#0f2c3f]/30"
              >
                <span>Read Full Story</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
