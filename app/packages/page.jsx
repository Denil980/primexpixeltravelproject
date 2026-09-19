import React from 'react';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { packages } from '@/lib/data/packages';
import { PackagesGridClient } from '@/components/packages/PackagesGridClient';

export const metadata = {
  title: 'All Tour Packages | Tours & Travels',
  description: 'Handcrafted luxury travel packages for Kashmir, Dubai, Maldives, Switzerland, Thailand, Singapore, and Paris.',
};

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#0f2c3f] text-white pt-28 sm:pt-36 pb-20 sm:pb-24">
        <ResponsiveImage
          src="/images/kashmir.jpg"
          alt="Handcrafted Tour Packages"
          priority
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2c3f]/90 via-[#0f2c3f]/80 to-[#0f2c3f]" />

        {/* ── Animated Flying Airplane Trajectory (Enlarged 72px flight icon flying left-to-right) ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <svg className="w-full h-full min-w-[1000px]" viewBox="0 0 1400 360" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pkgGoldTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b8860b" stopOpacity="0.05" />
                <stop offset="35%" stopColor="#d4af37" stopOpacity="0.6" />
                <stop offset="75%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Flight Trajectory Path */}
            <path
              id="packagesHeroFlightPath"
              d="M -120,220 C 320,40 720,280 1120,60 C 1320,-20 1520,110 1680,80"
              stroke="url(#pkgGoldTrail)"
              strokeWidth="3.5"
              strokeDasharray="10 10"
              strokeOpacity="0.85"
            />

            {/* Prominent Flight Icon (72px width x 72px height) flying left to right */}
            <g>
              <g transform="translate(-36, -36)">
                <svg
                  viewBox="0 0 24 24"
                  width="72"
                  height="72"
                  fill="#fef08a"
                  style={{
                    filter: 'drop-shadow(0px 0px 18px rgba(254, 240, 138, 1)) drop-shadow(0px 0px 32px rgba(184, 134, 11, 0.9))'
                  }}
                >
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                    transform="rotate(90 12 12)"
                  />
                </svg>
              </g>
              <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                <mpath href="#packagesHeroFlightPath" />
              </animateMotion>
            </g>
          </svg>
        </div>

        <Container className="relative z-10 text-center max-w-3xl">


          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight tracking-tight drop-shadow-md">
            Featured Journeys of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#fef08a]">
              A Lifetime
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Curated travel packages combining 4★ & 5★ luxury stays, private chauffeur transfers, and exclusive experiences.
          </p>
        </Container>
      </section>

      {/* Packages Grid with Sky-to-Ground Dropping Cards */}
      <PackagesGridClient packages={packages} />
    </div>
  );
}
