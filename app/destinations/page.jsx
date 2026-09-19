"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { BookNowButton } from '@/components/home/BookNowButton';
import { destinations, getPackagesForDestination } from '@/lib/data/destinations';
import { packages } from '@/lib/data/packages';
import {
  MapPinIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

/* Category Filters */
const CATEGORIES = [
  { id: 'all', label: 'All Destinations' },
  { id: 'kashmir', label: 'Kashmir Valley' },
  { id: 'international', label: 'International Luxury' },
  { id: 'signature', label: 'Signature Only' },
];

/* Sample featured destination cards for the animated header reel */
const FEATURED_CARDS = [
  { city: 'Kashmir', subtitle: 'Alpine Paradise', image: '/images/kashmir.jpg', badge: 'Signature' },
  { city: 'Dubai', subtitle: 'Modern Wonders', image: '/images/dubai.jpg', badge: 'Luxury' },
  { city: 'Maldives', subtitle: 'Overwater Lagoon', image: '/images/international.jpg', badge: 'Island' },
  { city: 'Switzerland', subtitle: 'Swiss Peaks', image: '/images/kashmir.jpg', badge: 'Alps' },
];

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCardsSplit, setIsCardsSplit] = useState(false);
  const [filterKey, setFilterKey] = useState(0);

  /* Category selection handler */
  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setFilterKey((prev) => prev + 1);
  };

  /* Card Split Timer & Scroll Listener: Automatically splits hero cards after 1.5 seconds */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCardsSplit(true);
    }, 500);

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsCardsSplit(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* Filter Logic */
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'kashmir') {
      return dest.country.toLowerCase() === 'india';
    }
    if (activeCategory === 'international') {
      return dest.country.toLowerCase() !== 'india';
    }
    if (activeCategory === 'signature') {
      return dest.featured;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* ── ANIMATED GRAPHIC MOTION HERO (NO MOUNTAIN IMAGE) ── */}
      <section className="relative overflow-hidden bg-[#0f2c3f] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 min-h-[620px] flex items-center justify-center">
        {/* Animated Motion Graphic Background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          {/* Animated Radial Volumetric Light Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] rounded-full bg-gradient-to-tr from-[#b8860b]/25 via-[#0284c7]/20 to-transparent blur-[140px] animate-pulse" />
          <div className="absolute -bottom-20 left-1/4 w-[600px] h-[400px] rounded-full bg-[#1e4d6b]/40 blur-[120px]" />

          {/* ── Curved Trajectory Lines & Forward-Flying Airplanes ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 1400 550"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                {/* Glow Filters for Trajectories */}
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Top Curved Trajectory Path (Gold, Left to Right) */}
              <path
                id="topFlightPath"
                d="M -100 140 C 250 40, 550 220, 850 80 C 1050 15, 1280 180, 1500 110"
                stroke="#fef08a"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeOpacity="0.4"
                filter="url(#goldGlow)"
              />

              {/* Bottom Curved Trajectory Path (Blue, Right to Left) */}
              <path
                id="bottomFlightPath"
                d="M 1500 390 C 1250 470, 950 280, 650 420 C 400 480, 150 300, -100 370"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeOpacity="0.4"
                filter="url(#blueGlow)"
              />

              {/* Airplane 1: Gold Plane flying Left-to-Right along Top Curved Path */}
              <g>
                <g transform="translate(-14, -14)">
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="#fef08a"
                    style={{ filter: 'drop-shadow(0px 0px 8px rgba(254, 240, 138, 0.95))' }}
                  >
                    <path
                      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                      transform="rotate(90 12 12)"
                    />
                  </svg>
                </g>
                <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#topFlightPath" />
                </animateMotion>
              </g>

              {/* Airplane 2: Blue Plane flying Right-to-Left along Bottom Curved Path */}
              <g>
                <g transform="translate(-14, -14)">
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="#38bdf8"
                    style={{ filter: 'drop-shadow(0px 0px 8px rgba(56, 189, 248, 0.95))' }}
                  >
                    <path
                      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                      transform="rotate(90 12 12)"
                    />
                  </svg>
                </g>
                <animateMotion dur="18s" repeatCount="indefinite" rotate="auto" begin="0.5s">
                  <mpath href="#bottomFlightPath" />
                </animateMotion>
              </g>
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <Container className="relative z-10 text-center max-w-5xl">
          {/* Animated Header Badge */}
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-playfair text-4xl sm:text-6xl md:text-7xl font-black mb-5 leading-tight tracking-tight drop-shadow-md"
          >
            Where Do You <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#fef08a]">
              Want To Go?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore handpicked destinations around the world — from serene Kashmir houseboats to futuristic Dubai skylines and Maldivian lagoons.
          </motion.p>

          {/* ── ULTRA-SMOOTH STACK-TO-SPLIT HERO CARD DECK ── */}
          <div className="mt-10 relative flex justify-center items-center h-[190px] sm:h-[210px] w-full max-w-5xl mx-auto overflow-visible">
            {FEATURED_CARDS.map((card, i) => {
              /* Offsets for stacked vs split layout */
              const stackedRotates = [0, 4.5, -4.5, 6];
              const stackedScales = [1, 0.95, 0.9, 0.85];
              const stackedYs = [0, 5, 10, 15];
              const stackedXs = [0, 10, -10, 16];
              const stackedOpacities = [1, 0.85, 0.7, 0.55];

              const splitXDesktop = (i - 1.5) * 215;
              const splitXMobile = (i - 1.5) * 140;

              return (
                <motion.div
                  key={card.city}
                  initial={{
                    x: stackedXs[i],
                    y: stackedYs[i],
                    scale: stackedScales[i],
                    rotate: stackedRotates[i],
                    opacity: stackedOpacities[i],
                  }}
                  animate={
                    isCardsSplit
                      ? {
                          x: typeof window !== 'undefined' && window.innerWidth < 640 ? splitXMobile : splitXDesktop,
                          y: 0,
                          scale: 1,
                          rotate: i % 2 === 0 ? -1.5 : 1.5,
                          opacity: 1,
                        }
                      : {
                          x: stackedXs[i],
                          y: stackedYs[i],
                          scale: stackedScales[i],
                          rotate: stackedRotates[i],
                          opacity: stackedOpacities[i],
                        }
                  }
                  whileHover={
                    isCardsSplit
                      ? {
                          scale: 1.08,
                          y: -12,
                          rotate: 0,
                          transition: { type: 'spring', stiffness: 300, damping: 18 },
                        }
                      : { scale: 1.03 }
                  }
                  transition={
                    isCardsSplit
                      ? {
                          type: 'spring',
                          stiffness: 170,
                          damping: 18,
                          mass: 0.55,
                          delay: i * 0.04,
                        }
                      : {
                          duration: 0.3,
                          ease: [0.25, 1, 0.5, 1],
                        }
                  }
                  onClick={() => setIsCardsSplit((prev) => !prev)}
                  className="absolute w-[160px] sm:w-[200px] rounded-2xl overflow-hidden bg-white/10 border border-white/25 p-2 text-left backdrop-blur-md shadow-2xl hover:border-[#fef08a] hover:bg-white/20 hover:shadow-[0_15px_35px_rgba(184,134,11,0.35)] cursor-pointer select-none transform-gpu transition-colors duration-300"
                  style={{ zIndex: isCardsSplit ? 10 + i : 10 - i }}
                >
                  <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden group">
                    <img
                      src={card.image}
                      alt={card.city}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                    <span className="absolute top-2 left-2 rounded-full bg-black/65 border border-white/20 px-2 py-0.5 text-[9px] font-bold text-[#fef08a] uppercase tracking-wider backdrop-blur-sm pointer-events-none">
                      {card.badge}
                    </span>
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-white pointer-events-none">
                      <p className="font-playfair text-base sm:text-lg font-bold leading-tight drop-shadow-md">{card.city}</p>
                      <p className="text-[10px] sm:text-xs text-slate-200 font-sans">{card.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── FILTER TABS & SEARCH BAR ── */}
      <section className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-4">
        <Container className="max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#0f2c3f] text-white shadow-md border border-[#0f2c3f]'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70 hover:text-[#0f2c3f]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination or country..."
                className="w-full rounded-full border border-slate-300 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
              />
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── DESTINATIONS GRID WITH STACK-AND-SPLIT ANIMATIONS ── */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-7xl">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
              <MapPinIcon className="h-12 w-12 text-slate-400 mx-auto mb-3 animate-bounce" />
              <h3 className="font-playfair text-2xl font-bold text-[#0f2c3f]">No destinations found</h3>
              <p className="text-sm text-slate-500 mt-1">Try resetting your search query or category filter.</p>
              <button
                type="button"
                onClick={() => {
                  handleCategorySelect('all');
                  setSearchQuery('');
                }}
                className="mt-5 rounded-full bg-[#0f2c3f] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#1e4d6b]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredDestinations.map((dest, idx) => {
                const matchedPackages = getPackagesForDestination(dest.id);
                const targetPackage =
                  matchedPackages[0] ||
                  packages.find((p) => p.destinationId.toLowerCase() === dest.id.toLowerCase()) ||
                  packages[0];

                const targetUrl = `/package/${targetPackage.id}`;
                const delay = (idx % 3) * 0.08;

                return (
                  <motion.div
                    key={`${dest.id}-${activeCategory}-${filterKey}`}
                    initial={{
                      opacity: 0,
                      y: 45,
                      scale: 0.98,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 110,
                      damping: 18,
                      mass: 0.7,
                      delay,
                    }}
                    className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:-translate-y-2 hover:shadow-2xl hover:border-[#b8860b]/50 flex flex-col transform-gpu transition-all duration-300"
                  >
                    {/* Image Header with Hover Scale */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-[#0f2c3f]">
                      <img
                        src={dest.image}
                        alt={dest.city}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Code Tag */}
                      {dest.code && (
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/25 px-3 py-1 backdrop-blur-md shadow-md">
                          <MapPinIcon className="h-3 w-3 text-[#fef08a]" />
                          <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                            {dest.code}
                          </span>
                        </div>
                      )}

                      {dest.featured && (
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-[#b8860b] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                          <SparklesIcon className="h-3 w-3" />
                          <span>Signature</span>
                        </div>
                      )}

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#fef08a] block mb-0.5">
                          {dest.country}
                        </span>
                        <h3 className="font-playfair text-2xl font-black group-hover:text-[#fef08a] transition-colors leading-tight">
                          {dest.city}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content (No Price Tags) */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {dest.description}
                        </p>

                        {/* Matching Package Tag */}
                        {targetPackage && (
                          <div className="mt-4 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                            <CheckBadgeIcon className="h-4 w-4 text-[#b8860b] shrink-0" />
                            <span className="font-sans text-xs font-semibold text-slate-700 truncate">
                              {targetPackage.title}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Footer CTA Buttons */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        {targetPackage && (
                          <BookNowButton
                            pkg={targetPackage}
                            className="flex-1 inline-flex items-center justify-center rounded-full bg-[#b8860b] px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-[#a17509] shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            Book Now
                          </BookNowButton>
                        )}
                        <Link
                          href={targetUrl}
                          className={`${targetPackage ? 'flex-1' : 'w-full'} inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0f2c3f] px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-[#1e4d6b] shadow-md group-hover:shadow-lg group-hover:scale-[1.02] active:scale-95`}
                        >
                          <span>View Details</span>
                          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
