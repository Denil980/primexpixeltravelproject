"use client";

import React, { useRef, useState } from 'react';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { getPackageCountForDestination } from '@/lib/data/destinations';
import { MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline';

export const DestinationGridCard = ({ destination, index = 0 }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const packageCount = getPackageCountForDestination(destination.id);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Fluid 3D tilting
    setTilt({
      x: Number(((0.5 - y) * 16).toFixed(2)),
      y: Number(((x - 0.5) * 18).toFixed(2)),
    });
    setGlare({
      x: Number((x * 100).toFixed(1)),
      y: Number((y * 100).toFixed(1)),
      opacity: 0.45,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000 h-full select-none"
      style={{
        perspective: '1400px',
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div
        className="block relative h-[450px] sm:h-[480px] w-full rounded-[2.25rem] p-[1.5px] transition-all duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 16 : 0}px)`,
          background: isHovered
            ? 'linear-gradient(135deg, rgba(226,199,139,0.7) 0%, rgba(201,164,92,0.3) 40%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)',
          boxShadow: isHovered
            ? '0 28px 70px -15px rgba(0,0,0,0.8), 0 0 35px -5px rgba(201,164,92,0.35)'
            : '0 16px 40px -12px rgba(0,0,0,0.6)',
        }}
      >
        <article className="relative flex flex-col h-full w-full overflow-hidden rounded-[2.2rem] bg-[#091e22]">
          {/* Specular Liquid Glare Layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-40 rounded-[2.2rem] transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,248,225,0.45) 0%, rgba(201,164,92,0.18) 35%, transparent 68%)`,
            }}
          />

          {/* Background Photography with Zoom and Parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <ResponsiveImage
              src={destination.image}
              alt={`${destination.city}, ${destination.country}`}
              width={750}
              height={550}
              className="h-full w-full object-cover transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-115 group-hover:brightness-108"
            />

            {/* Gradient Overlays for High-Contrast Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#051417] via-[#051417]/50 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#051417]/90" />
          </div>

          {/* ── Top Ribbon (3D Floating Plane) ── */}
          <div
            className="relative z-20 flex items-center justify-between p-5 sm:p-6"
            style={{ transform: 'translateZ(28px)' }}
          >
            {/* Airport / Country Badge */}
            {destination.code ? (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-mono font-bold tracking-widest text-[#e2c78b] backdrop-blur-md shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e2c78b] animate-pulse" />
                <span>{destination.code}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-bold tracking-widest text-[#e2c78b] backdrop-blur-md shadow-lg">
                <span>EXPEDITION</span>
              </div>
            )}

            {/* Tour Count Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-[#c9a45c]/40 bg-[#07191d]/80 px-3.5 py-1 text-[11px] font-bold text-[#e2c78b] backdrop-blur-md shadow-md">
              <SparklesIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
              <span>{packageCount} {packageCount === 1 ? 'Itinerary' : 'Itineraries'}</span>
            </div>
          </div>

          {/* ── Bottom Content Card (3D Floating Plane) ── */}
          <div
            className="relative z-20 mt-auto flex flex-col p-6 sm:p-7"
            style={{ transform: 'translateZ(38px)' }}
          >
            {/* Country Subtitle */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#e2c78b] mb-1.5">
              <MapPinIcon className="h-3.5 w-3.5 text-[#c9a45c]" />
              <span>{destination.country}</span>
            </div>

            {/* City Title */}
            <h3 className="font-playfair text-3xl sm:text-4xl font-black text-white leading-tight drop-shadow-lg transition-colors duration-300 group-hover:text-[#f3dfab]">
              {destination.city}
            </h3>

            {/* Description */}
            <p className="mt-2.5 font-inter text-xs leading-relaxed text-white/75 line-clamp-2 drop-shadow-sm font-normal">
              {destination.description}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
