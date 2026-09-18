"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { packages } from '@/lib/data/packages';
import { getDestinationById } from '@/lib/data/destinations';
import { ClockIcon } from '@heroicons/react/24/outline';

/* ─── Card dimensions ─────────────────────────────────────────────────────── */
const CARD_W = 210;   // px
const CARD_GAP = 22;  // px
const CARD_SLOT = CARD_W + CARD_GAP;

/* ─── Per-distance visual weights ────────────────────────────────────────── */
const SCALES   = [1.10, 0.88, 0.74, 0.62, 0.52];
const OPACITIES= [1.00, 0.78, 0.54, 0.34, 0.18];
const ROT_Y_PER_SLOT = 10; // degrees of Y-rotation per slot away from center

/* ─── Portrait Package Card ──────────────────────────────────────────────── */
function Luxury3DCard({ pkg, onBookNow, isActive }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const destination = getDestinationById(pkg.destinationId);
  const destName = destination
    ? `${destination.city}, ${destination.country}`
    : pkg.destination;

  const handleMouseMove = (e) => {
    if (!isActive) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: Number(((0.5 - y) * 10).toFixed(2)),
      y: Number(((x - 0.5) * 11).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '900px' }}
    >
      <article
        className="relative overflow-hidden w-full"
        style={{
          height: '300px',
          borderRadius: '18px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          /* Active card glows gold; others have dark shadow only */
          boxShadow: isActive
            ? '0 0 0 2px rgba(201,164,92,0.70), 0 22px 55px -8px rgba(0,0,0,0.85), 0 0 40px 4px rgba(201,164,92,0.28)'
            : '0 12px 36px -6px rgba(0,0,0,0.72)',
        }}
      >
        {/* Full-bleed image */}
        <ResponsiveImage
          src={pkg.image}
          alt={pkg.title}
          width={420}
          height={300}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ transform: hovered && isActive ? 'scale(1.06)' : 'scale(1)' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/28 to-transparent" />

        {/* Active badge */}
        {isActive && (
          <div className="absolute top-3 left-3 z-10">
            <span className="rounded-full bg-[#c9a45c]/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#0d1f1f]">
              Featured
            </span>
          </div>
        )}

        {/* Duration top-right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 rounded-full bg-black/50 border border-white/20 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md">
            <ClockIcon className="h-2.5 w-2.5 text-[#e2c78b]" />
            {pkg.duration}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-3 py-3">
          <h3 className="font-playfair text-[15px] font-bold leading-tight text-white drop-shadow-[0_1px_5px_rgba(0,0,0,1)] line-clamp-1">
            {pkg.title}
          </h3>
          <p className="mt-0.5 text-[9px] font-medium text-white/60 tracking-wide line-clamp-1">
            {destName}
          </p>

          {/* Buttons */}
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onBookNow) onBookNow(pkg);
              }}
              className="flex-1 text-center rounded-full py-1.5 text-[10px] font-bold shadow-md transition-all duration-300 active:scale-95"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, #c9a45c, #f3dfab)'
                  : 'rgba(255,255,255,0.18)',
                color: isActive ? '#051417' : 'rgba(255,255,255,0.85)',
              }}
            >
              Book Now
            </button>
            <Link
              href={`/package/${pkg.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 text-center rounded-full py-1.5 text-[10px] font-bold border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 active:scale-95"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Shimmer on hover when active */}
        {isActive && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              borderRadius: '18px',
              opacity: hovered ? 0.15 : 0,
              background: 'radial-gradient(circle at 38% 28%, rgba(255,255,255,0.6) 0%, transparent 55%)',
            }}
          />
        )}
      </article>
    </div>
  );
}

/* ─── FeaturedPackages Section ───────────────────────────────────────────── */
export const FeaturedPackages = ({ onBookNow }) => {
  const sectionRef = useRef(null);

  const featuredPkgs = packages.filter((p) => p.featured).slice(0, 5);
  const total = featuredPkgs.length; // 5

  /*
   * Infinite carousel:  render 3 copies of the cards.
   *   Copy 1: indices  0 –  5  (left  buffer)
   *   Copy 2: indices  6 – 11  (visible start area)
   *   Copy 3: indices 12 – 17  (right buffer)
   *
   * stripIdx starts at `total` (first card of copy 2).
   * Auto-advance increments stripIdx.
   * When stripIdx reaches total*2 (copy 3 start), we silently snap back to total.
   */
  const tripled = [...featuredPkgs, ...featuredPkgs, ...featuredPkgs];

  const [stripIdx, setStripIdx] = useState(total);
  const [animEnabled, setAnimEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  /* Auto-advance every 2.0 s */
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setStripIdx((p) => p + 1), 2000);
    return () => clearInterval(t);
  }, [isPaused]);

  /*
   * Seamless reset: when stripIdx hits total*2, the card at that position
   * is visually identical to the card at total (same real index mod total).
   * We wait for the 0.5s transition to complete, then snap silently.
   */
  useEffect(() => {
    if (stripIdx >= total * 2) {
      const id = setTimeout(() => {
        setAnimEnabled(false);
        setStripIdx(total);
      }, 520);
      return () => clearTimeout(id);
    }
  }, [stripIdx, total]);

  /* Re-enable animation after instant snap */
  useEffect(() => {
    if (!animEnabled) {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimEnabled(true))
      );
      return () => cancelAnimationFrame(raf);
    }
  }, [animEnabled]);

  /* Active real index (for dot indicators) */
  const activeRealIdx = stripIdx % total;

  return (
    <section
      ref={sectionRef}
      id="featured-packages"
      className="relative w-full overflow-hidden bg-[#07191d]"
    >
      {/* ── Ambient Backdrop ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
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

      {/* ── Section sub-header ── */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#c9a45c] animate-ping" />
            <span className="font-inter text-xs font-bold uppercase tracking-[0.3em] text-[#e2c78b]">
              Handcrafted Itineraries
            </span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white sm:text-4xl">
            Featured journeys of a lifetime.
          </h2>
        </div>
      </div>

      {/* ── Infinite Coverflow Carousel ── */}
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: 20, paddingBottom: 36 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left + Right fade vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-20 bg-gradient-to-r from-[#07191d] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-20 bg-gradient-to-l from-[#07191d] to-transparent" />

        {/* Sliding strip */}
        <div
          className="flex"
          style={{
            gap: CARD_GAP,
            /* Translate so stripIdx card is horizontally centered */
            transform: `translateX(calc(50% - ${stripIdx * CARD_SLOT + CARD_W / 2}px))`,
            transition: animEnabled
              ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              : 'none',
          }}
        >
          {tripled.map((pkg, idx) => {
            const signed = idx - stripIdx;              // negative = left, positive = right
            const dist   = Math.abs(signed);
            const clamped = Math.min(dist, SCALES.length - 1);

            const scale   = SCALES[clamped];
            const opacity = OPACITIES[clamped];
            /* Coverflow Y-rotation: left cards tilt right (+), right cards tilt left (-) */
            const rotY = Math.max(-32, Math.min(32, -signed * ROT_Y_PER_SLOT));
            const isActive = dist === 0;

            return (
              <div
                key={`${pkg.id}-${idx}`}
                className="flex-none cursor-pointer"
                style={{
                  width: CARD_W,
                  zIndex: 30 - clamped,
                  /* Apply scale + perspective rotateY on the wrapper */
                  transform: `perspective(1000px) scale(${scale}) rotateY(${rotY}deg)`,
                  opacity,
                  transformOrigin: signed < 0 ? 'right center' : signed > 0 ? 'left center' : 'center center',
                  transition: animEnabled
                    ? 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease'
                    : 'none',
                }}
                onClick={() => {
                  if (!isActive) {
                    setStripIdx(idx);
                  }
                }}
              >
                <Luxury3DCard
                  pkg={pkg}
                  index={idx % total}
                  onBookNow={onBookNow}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-10">
        {featuredPkgs.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to package ${i + 1}`}
            onClick={() => setStripIdx(total + i)}
            className="transition-all duration-400"
            style={{
              width: i === activeRealIdx ? 22 : 7,
              height: 7,
              borderRadius: 999,
              background: i === activeRealIdx
                ? 'linear-gradient(90deg, #c9a45c, #f3dfab)'
                : 'rgba(255,255,255,0.22)',
            }}
          />
        ))}
      </div>
    </section>
  );
};
