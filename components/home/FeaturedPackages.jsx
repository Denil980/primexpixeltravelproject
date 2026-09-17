"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { packages } from '@/lib/data/packages';
import { getDestinationById } from '@/lib/data/destinations';
import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  SparklesIcon,
  ShieldCheckIcon,
  StarIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { Packages3DText } from "../three/homepage/Packages3DText";

/* ─── 3D Tilt Interactive Package Card ────────────────────────────────────── */
function Luxury3DCard({ pkg, index, onBookNow }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const destination = getDestinationById(pkg.destinationId);
  const destName = destination
    ? `${destination.city}, ${destination.country}`
    : pkg.destination;

  // Intersection observer for progressive entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: Number(((0.5 - y) * 15).toFixed(2)),
      y: Number(((x - 0.5) * 16).toFixed(2)),
    });
    setGlare({
      x: Number((x * 100).toFixed(1)),
      y: Number((y * 100).toFixed(1)),
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000 h-full"
      style={{
        perspective: '1200px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(45px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.14}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.14}s`,
      }}
    >
      <article
        className="relative flex flex-col h-full rounded-3xl bg-white border border-[#173f3d]/10 shadow-[0_12px_35px_-8px_rgba(13,41,43,0.12)] transition-all duration-300 ease-out group-hover:shadow-[0_25px_60px_-12px_rgba(13,41,43,0.28)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${tilt.x !== 0 ? 12 : 0}px)`,
        }}
      >
        {/* Dynamic Holographic Glass Glare reflection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, rgba(201,164,92,0.15) 30%, transparent 65%)`,
          }}
        />

        {/* ── Image with 3D Depth Layering ── */}
        <div
          className="relative h-60 w-full overflow-hidden rounded-t-3xl bg-gray-950"
          style={{ transform: 'translateZ(20px)' }}
        >
          <ResponsiveImage
            src={pkg.image}
            alt={pkg.title}
            width={700}
            height={460}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Rich cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f1e] via-[#0a1f1e]/30 to-black/25" />

          {/* Destination & Featured floating badges */}
          <div className="absolute left-4 top-4 flex items-center gap-2 z-10">
            <span className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-md">
              <MapPinIcon className="h-3.5 w-3.5 text-[#e2c78b]" />
              {destName}
            </span>
          </div>

          {/* Rating / Tier Badge */}
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-[#c9a45c]/40 bg-[#0d292b]/85 px-2.5 py-1 text-[11px] font-bold text-[#e2c78b] backdrop-blur-md shadow-md z-10">
            <StarIcon className="h-3.5 w-3.5 text-[#e2c78b] fill-[#e2c78b]" />
            <span>4.9 / 5</span>
          </div>

          {/* Duration & Inclusions chips */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 z-10">
            <span className="flex items-center gap-1 rounded-full bg-black/55 border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <ClockIcon className="h-3.5 w-3.5 text-[#e2c78b]" />
              {pkg.duration}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#173f3d]/80 border border-[#c9a45c]/30 px-2.5 py-1 text-[11px] font-medium text-[#ead8ad] backdrop-blur-sm">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-[#e2c78b]" />
              All-Inclusive
            </span>
          </div>
        </div>

        {/* ── Body Details ── */}
        <div
          className="flex flex-1 flex-col p-6"
          style={{ transform: 'translateZ(25px)' }}
        >
          {/* Title with hover color transformation */}
          <h3 className="font-playfair text-xl font-bold leading-tight text-gray-900 group-hover:text-[#173f3d] transition-colors line-clamp-1">
            {pkg.title}
          </h3>

          <p className="mt-2.5 font-inter text-xs leading-relaxed text-gray-600 line-clamp-2">
            {pkg.description}
          </p>

          {/* Curated Tour Highlights */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#c9a45c]">
              Signature Highlights
            </p>
            <ul className="mt-2 space-y-1.5">
              {pkg.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-xs text-gray-700">
                  <SparklesIcon className="h-3.5 w-3.5 text-[#c9a45c] shrink-0 mt-0.5" />
                  <span className="line-clamp-1 font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Card Footer: Pricing & 3D Interactive Action Buttons ── */}
          <div
            className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4"
            style={{ transform: 'translateZ(30px)' }}
          >
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-playfair text-2xl font-black text-[#173f3d]">
                  {pkg.price}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">/ person</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/package/${pkg.id}`}
                className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 text-gray-600 hover:border-[#173f3d] hover:text-[#173f3d] transition-colors"
                title="View Package Itinerary"
              >
                <EyeIcon className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => onBookNow(pkg)}
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#173f3d] to-[#0d292b] px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:from-[#1b5c4e] hover:to-[#173f3d] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c]"
              >
                <span>Book Now</span>
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ─── FeaturedPackages Main Section ───────────────────────────────────────── */
export const FeaturedPackages = ({ onBookNow }) => {
  const sectionRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  const featuredPkgs = packages.filter((p) => p.featured).slice(0, 6);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const current = windowH - rect.top;
      setScrollRatio(Math.max(0, Math.min(1, current / total)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-packages"
      className="relative w-full overflow-hidden bg-[#07191d]"
    >
      {/* ── 3D Ambient Stage Lights & Starfield ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#173f3d]/40 blur-3xl" />
        <div className="absolute top-48 right-1/4 h-96 w-96 rounded-full bg-[#c9a45c]/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(234,216,173,0.3) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040d0f] to-transparent" />
      </div>

      {/* ── Upper Section: 3D Typography Centerpiece ── */}
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <Packages3DText scrollProgress={scrollRatio} />
      </div>

      {/* ── Middle Showcase: Curated Packages Grid with 3D Depth ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header Ribbon */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#c9a45c] animate-ping" />
              <span className="font-inter text-xs font-bold uppercase tracking-[0.3em] text-[#e2c78b]">
                Handcrafted Itineraries
              </span>
            </div>
            <h2 className="font-playfair text-3xl font-bold text-white sm:text-4xl">
              Featured journeys of a lifetime.
            </h2>
          </div>


        </div>

        {/* 3-Column Luxury 3D Cards Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPkgs.map((pkg, idx) => (
            <Luxury3DCard
              key={pkg.id}
              pkg={pkg}
              index={idx}
              onBookNow={onBookNow}
            />
          ))}
        </div>

        {/* Bottom Destination Quick-Access Bar */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="font-playfair text-2xl font-bold text-white">
              Need a bespoke custom itinerary?
            </h4>
            <p className="mt-1 text-xs text-white/70 font-inter max-w-lg">
              Our travel specialists will custom-tailor private transfers, 5-star heritage houseboats, private flights, and VIP excursions to match your pace.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/#contact-booking"
              className="inline-flex items-center gap-2 rounded-full bg-[#c9a45c] px-6 py-3 text-xs font-bold text-[#0d292b] shadow-lg transition-all duration-300 hover:bg-[#e2c78b] hover:shadow-[0_0_25px_rgba(201,164,92,0.5)] active:scale-95"
            >
              <span>Speak to an Advisor</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-white/15"
            >
              <span>All Destinations</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
