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

  // Left column drifts up-left on scroll
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Globe drifts up-right slightly
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#071924]">
      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden"
      >
        {/* Night Sky Volumetric Gradient */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_35%,#13334c_0%,#081b2a_45%,#040d15_100%)]" />

        {/* Twinkling Stars */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(1.5px 1.5px at 15% 20%, #ffffff 100%, transparent), radial-gradient(1.5px 1.5px at 45% 15%, #fef08a 100%, transparent), radial-gradient(1px 1px at 80% 25%, #ffffff 100%, transparent), radial-gradient(1.5px 1.5px at 30% 65%, #38bdf8 100%, transparent), radial-gradient(1.2px 1.2px at 70% 70%, #ffffff 100%, transparent), radial-gradient(1px 1px at 85% 85%, #fef08a 100%, transparent)',
            backgroundSize: '240px 240px',
          }}
        />

        {/* Ground fade */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-[#040e16] via-[#071a28]/60 to-transparent z-0" />

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
                className="inline-flex items-center gap-2 mb-3 sm:mb-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a45c] animate-ping" />
                <span className="font-mono text-[10px] sm:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#e2c78b]">
                  EXPLORE • DREAM • DISCOVER
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-playfair text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[0.95] drop-shadow-lg"
              >
                The World <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fef08a] via-[#dfbe78] to-[#c9a45c] drop-shadow-[0_4px_25px_rgba(201,164,92,0.35)]">
                  Awaits You
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mt-4 sm:mt-5 max-w-md font-sans text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal"
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
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#c9a45c] via-[#dfbe78] to-[#f3dfab] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-[#051417] shadow-[0_4px_25px_rgba(201,164,92,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_35px_rgba(201,164,92,0.7)] active:scale-95"
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
                      className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-[#051417] object-cover"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-playfair text-sm sm:text-base font-bold text-white leading-tight">
                    10K+
                  </span>
                  <span className="text-[11px] text-[#e2c78b] font-medium tracking-wide">
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

              {/* Rustic Signpost — hidden on small mobile */}
              <div className="pointer-events-none absolute bottom-4 -right-2 sm:right-2 hidden sm:flex flex-col items-end gap-1.5 z-20">
                {['NEW PLACES', 'NEW STORIES', 'SAME YOU', 'A HAPPIER YOU'].map((text, idx) => (
                  <div
                    key={text}
                    className="relative bg-gradient-to-r from-[#2c1d11] to-[#452f1e] text-[#f4ebd0] text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-sm shadow-md border-l-2 border-[#8c6239]"
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
            className="group flex flex-col items-center gap-1.5 text-white/70 hover:text-[#e2c78b] transition-colors"
          >
            <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1 group-hover:border-[#c9a45c]">
              <span className="w-1 h-2 rounded-full bg-[#e2c78b] animate-bounce" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold">
              SCROLL TO EXPLORE
            </span>
            <ChevronDownIcon className="h-3 w-3 animate-pulse -mt-0.5" />
          </button>
        </motion.div>
      </section>

      {/* ── Trust Ribbon ── */}
      <motion.section
        ref={ribbonRef}
        className="relative w-full bg-[#f6f2e9] text-[#0f2427] py-8 sm:py-10 z-20 shadow-2xl"
        initial="hidden"
        animate={isRibbonInView ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Torn Paper Top */}
        <div
          className="absolute -top-3.5 inset-x-0 h-4 bg-repeat-x bg-top opacity-95"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 C 150 0 300 16 450 4 C 600 20 750 2 900 14 C 1050 0 1200 16 1200 16 L1200 16 L0 16 Z' fill='%23f6f2e9'/%3E%3C/svg%3E\")",
            backgroundSize: '1200px 16px',
          }}
        />

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
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c9a45c]/15 text-[#9a752a] group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h4 className="font-playfair text-sm sm:text-base font-bold text-[#0c2225]">{title}</h4>
                <p className="mt-0.5 text-xs text-[#526466]">{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Torn Paper Bottom */}
        <div
          className="absolute -bottom-3.5 inset-x-0 h-4 bg-repeat-x bg-bottom opacity-95"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 C 150 16 300 0 450 12 C 600 -4 750 14 900 2 C 1050 16 1200 0 1200 0 L1200 0 L0 0 Z' fill='%23f6f2e9'/%3E%3C/svg%3E\")",
            backgroundSize: '1200px 16px',
          }}
        />
      </motion.section>
    </div>
  );
}