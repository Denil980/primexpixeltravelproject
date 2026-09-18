"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowRightIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  StarIcon,
  HeartIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';

const EarthGlobe = dynamic(
  () => import('@/components/three/homepage/EarthGlobe').then((mod) => mod.EarthGlobe),
  { ssr: false }
);

/* ─── Stagger helper ─────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Trust ribbon item ───────────────────────────────────────────────────── */
const ribbonItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function HeroExperience() {
  const heroRef = useRef(null);
  const ribbonRef = useRef(null);
  const isRibbonInView = useInView(ribbonRef, { once: true, margin: '-60px' });

  /* Scroll-driven parallax */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const globeY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#F8FAFC]">
      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden"
      >
        {/* Soft Volumetric Gradient */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_35%,#E2E8F0_0%,#F8FAFC_55%,#FFFFFF_100%)]" />

        {/* Subtle Ambient Dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(1.5px 1.5px at 15% 20%, #0f2c3f 100%, transparent), radial-gradient(1.5px 1.5px at 45% 15%, #b8860b 100%, transparent), radial-gradient(1px 1px at 80% 25%, #0f2c3f 100%, transparent), radial-gradient(1.5px 1.5px at 30% 65%, #0284c7 100%, transparent)',
            backgroundSize: '240px 240px',
          }}
        />

        {/* Ground fade */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/70 to-transparent z-0" />

        {/* ── Main Content Grid ── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-6 items-center">

            {/* ── Left Column ── */}
            <motion.div
              className="lg:col-span-5 flex flex-col items-start text-left z-20 pt-2 sm:pt-0"
              style={{ y: leftY, opacity: leftOpacity }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/25"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#b8860b] animate-ping" />
                <span className="font-mono text-[10px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#a17a24]">
                  EXPLORE • DREAM • DISCOVER
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-playfair text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#0f2c3f] tracking-tight leading-[0.95]"
              >
                The World <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#a17a24]">
                  Awaits You
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mt-4 sm:mt-5 max-w-md font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
              >
                Discover breathtaking destinations, curated travel experiences, and unforgettable memories — all in one place.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-5"
              >
                <button
                  type="button"
                  onClick={scrollToDestinations}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#0f2c3f] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#0f2c3f]/20 transition-all duration-300 hover:bg-[#1e4d6b] hover:scale-105 active:scale-95"
                >
                  <span>Start Your Journey</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                variants={fadeUp}
                className="mt-8 sm:mt-10 flex items-center gap-3.5"
              >
                <div className="flex -space-x-2.5 overflow-hidden">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
                  ].map((imgUrl, i) => (
                    <img
                      key={i}
                      src={imgUrl}
                      alt="Traveler"
                      className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-playfair text-sm sm:text-base font-bold text-[#0f2c3f] leading-tight">
                    10K+
                  </span>
                  <span className="text-[11px] text-[#b8860b] font-semibold tracking-wide">
                    Happy Travellers
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right Column: Globe ── */}
            <motion.div
              className="lg:col-span-7 relative w-full h-[300px] sm:h-[480px] lg:h-[650px] flex items-center justify-center"
              style={{ y: globeY, scale: globeScale }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <EarthGlobe />

              {/* Rustic Signpost */}
              <div className="pointer-events-none absolute bottom-4 -right-2 sm:right-2 hidden sm:flex flex-col items-end gap-1.5 z-20">
                {['NEW PLACES', 'NEW STORIES', 'SAME YOU', 'A HAPPIER YOU'].map((text, idx) => (
                  <div
                    key={text}
                    className="relative bg-[#0f2c3f] text-white text-[11px] font-black font-mono tracking-widest px-3 py-1 rounded-sm shadow-lg border-l-4 border-[#b8860b]"
                    style={{ transform: `rotate(${idx % 2 === 0 ? 2 : -2}deg)` }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          className="relative z-10 mx-auto mt-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: 'easeOut' }}
        >
          <button
            type="button"
            onClick={scrollToDestinations}
            aria-label="Scroll to explore"
            className="group flex flex-col items-center gap-1.5 text-slate-500 hover:text-[#b8860b] transition-colors"
          >
            <div className="w-5 h-8 rounded-full border-2 border-slate-400 flex items-start justify-center p-1 group-hover:border-[#b8860b]">
              <span className="w-1 h-2 rounded-full bg-[#b8860b] animate-bounce" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold">
              SCROLL TO EXPLORE
            </span>
            <ChevronDownIcon className="h-3 w-3 animate-pulse -mt-0.5" />
          </button>
        </motion.div>
      </section>

      {/* ── Trust Ribbon Bar ── */}
      <motion.section
        ref={ribbonRef}
        className="relative w-full bg-[#0f2c3f] text-white py-8 sm:py-10 z-20 shadow-xl"
        initial="hidden"
        animate={isRibbonInView ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
            {[
              { icon: <PaperAirplaneIcon className="h-5 w-5" />, title: 'Curated Packages', sub: 'Handpicked experiences' },
              { icon: <ShieldCheckIcon className="h-5 w-5" />, title: 'Trusted & Safe', sub: 'Your safety is our priority' },
              { icon: <StarIcon className="h-5 w-5" />, title: 'Best Price Guarantee', sub: 'Unforgettable trips, great value' },
              { icon: <HeartIcon className="h-5 w-5" />, title: '24/7 Support', sub: "We're always here for you" },
            ].map(({ icon, title, sub }) => (
              <motion.div
                key={title}
                variants={ribbonItem}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#fef08a] group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h4 className="font-playfair text-sm sm:text-base font-bold text-white">{title}</h4>
                <p className="mt-0.5 text-xs text-white/65">{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}