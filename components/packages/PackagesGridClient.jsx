"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { BookNowButton } from '@/components/home/BookNowButton';
import { ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function getCardAnimationProps(index) {
  const colIndex = index % 3;
  const rowIndex = Math.floor(index / 3);

  // ROW 1: ELEGANT SCROLL LIFT & FADE (Cards 1, 2, 3)
  if (rowIndex === 0) {
    const delay = colIndex * 0.12;
    return {
      initial: {
        opacity: 0,
        y: 60,
        scale: 0.97,
      },
      whileInView: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      viewport: { once: true, amount: 0.15 },
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 17,
        mass: 0.8,
        delay,
      },
    };
  }

  // ROW 2: 3D PERSPECTIVE LIFT (Cards 4, 5, 6 - Elegant Tilt & Upward Rise)
  if (rowIndex === 1) {
    const delay = colIndex * 0.14 + 0.05;
    return {
      initial: {
        opacity: 0,
        y: 75,
        rotateX: -22,
        scale: 0.98,
      },
      whileInView: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      },
      viewport: { once: true, amount: 0.2 },
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 16,
        mass: 0.8,
        delay,
      },
    };
  }

  // ROW 3: LATERAL CONVERGING REVEAL (Cards 7, 8, 9 - Converging Waves)
  if (rowIndex === 2) {
    const delay = colIndex * 0.14 + 0.05;
    const initialX = colIndex === 0 ? -70 : colIndex === 2 ? 70 : 0;
    return {
      initial: {
        opacity: 0,
        x: initialX,
        y: 40,
        scale: 1,
      },
      whileInView: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      },
      viewport: { once: true, amount: 0.2 },
      transition: {
        type: 'spring',
        stiffness: 95,
        damping: 17,
        mass: 0.8,
        delay,
      },
    };
  }

  // ROW 4+: SOFT GLASS BLUR-REVEAL (Cards 10+ - Smooth Fade & Blur Clearance)
  const delay = colIndex * 0.12;
  return {
    initial: {
      opacity: 0,
      y: 60,
      filter: 'blur(8px)',
      scale: 1,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
    },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  };
}

export function PackagesGridClient({ packages }) {
  return (
    <section className="relative py-12 sm:py-20 z-20">
      <Container className="max-w-7xl">
        {/* Row-by-Row Custom Scroll-Animated Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {packages.map((pkg, i) => {
            const animProps = getCardAnimationProps(i);

            return (
              <motion.div
                key={pkg.id}
                {...animProps}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#b8860b]/40 flex flex-col transform-gpu"
              >
                {/* Image Header */}
                <div className="relative h-64 w-full overflow-hidden shrink-0">
                  <ResponsiveImage
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    width={650}
                    height={440}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/25 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md shadow-md">
                    <ClockIcon className="h-3 w-3 text-[#fef08a]" />
                    <span>{pkg.duration}</span>
                  </div>

                  {pkg.featured && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-[#b8860b] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                      <span>Featured</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#fef08a] block mb-0.5">
                      {pkg.destination}
                    </span>
                    <h3 className="font-playfair text-xl font-bold leading-snug line-clamp-2">{pkg.title}</h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4 space-y-1.5">
                      {pkg.highlights.slice(0, 3).map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#b8860b] shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Price Per Guest</span>
                      <span className="font-playfair text-2xl font-bold text-[#0f2c3f]">{pkg.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <BookNowButton
                        pkg={pkg}
                        className="inline-flex items-center justify-center rounded-full bg-[#b8860b] px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-[#a17509] shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        Book Now
                      </BookNowButton>

                      <Link
                        href={`/package/${pkg.id}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0f2c3f] px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-[#1e4d6b] shadow-md hover:scale-105"
                      >
                        <span>View Details</span>
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
