"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export function Destination3DStack({ destinations }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const total = destinations ? destinations.length : 0;

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotation timer: advances cards every 2.0s
  // Pauses on hover/drag; resumes when cursor leaves
  useEffect(() => {
    if (isDragging || isHovered || total <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(timer);
  }, [isDragging, isHovered, total, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full flex flex-col items-center"
    >
      {/* ── 3D Fan / Stack Stage Container (Compact Height) ── */}
      <div
        className="relative w-full max-w-5xl h-[440px] sm:h-[480px] md:h-[510px] flex items-center justify-center overflow-visible select-none"
        style={{ perspective: '1200px', perspectiveOrigin: 'center 45%' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient Stage Spotlight Glow */}
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-b from-[#c9a45c]/20 via-[#173f3d]/25 to-transparent blur-[90px] rounded-full" />

        {/* ── Layered 3D Cards Deck ── */}
        <div
          className="relative w-[250px] sm:w-[290px] md:w-[325px] h-[360px] sm:h-[405px] md:h-[445px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {destinations.map((dest, idx) => {
            // Circular relative offset
            let offset = (idx - activeIndex + total) % total;
            if (offset > total / 2) offset -= total;

            const isFront = offset === 0;
            const isVisible = Math.abs(offset) <= 2; // Render top 5 cards for clean fan

            if (!isVisible) return null;

            // 3D Transform calculations with physical translateZ depth
            let x = 0;
            let y = 0;
            let z = 0;
            let rotateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let zIndex = 40;
            let opacity = 1;

            if (isFront) {
              x = 0;
              y = 0;
              z = 100;
              rotateZ = 0;
              rotateY = 0;
              scale = 1;
              zIndex = 50;
              opacity = 1;
            } else if (offset === 1) {
              // Right side card 1
              x = 95;
              y = 12;
              z = 10;
              rotateZ = 5.5;
              rotateY = -12;
              scale = 0.9;
              zIndex = 38;
              opacity = 0.88;
            } else if (offset === 2) {
              // Right side card 2
              x = 175;
              y = 24;
              z = -70;
              rotateZ = 10.5;
              rotateY = -18;
              scale = 0.81;
              zIndex = 28;
              opacity = 0.65;
            } else if (offset === -1) {
              // Left side card 1
              x = -95;
              y = 12;
              z = 10;
              rotateZ = -5.5;
              rotateY = 12;
              scale = 0.9;
              zIndex = 37;
              opacity = 0.88;
            } else if (offset === -2) {
              // Left side card 2
              x = -175;
              y = 24;
              z = -70;
              rotateZ = -10.5;
              rotateY = 18;
              scale = 0.81;
              zIndex = 27;
              opacity = 0.65;
            }

            return (
              <motion.div
                key={dest.id}
                className={`absolute inset-0 rounded-[2rem] overflow-hidden cursor-pointer ${
                  isFront
                    ? 'shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_30px_rgba(201,164,92,0.35)] border-2 border-[#c9a45c]'
                    : 'shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-white/15 hover:border-[#c9a45c]/50'
                }`}
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d',
                  backgroundColor: '#051417',
                }}
                animate={{
                  x,
                  y,
                  z,
                  rotateZ,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 24,
                  mass: 0.6,
                }}
                onClick={() => {
                  if (!isFront) {
                    setActiveIndex(idx);
                  }
                }}
                drag={isFront ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, { offset: dragOffset, velocity }) => {
                  setIsDragging(false);
                  if (dragOffset.x > 70 || velocity.x > 250) {
                    handlePrev();
                  } else if (dragOffset.x < -70 || velocity.x < -250) {
                    handleNext();
                  }
                }}
              >
                {/* Destination Image */}
                <div className="relative w-full h-full bg-[#051417]">
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-full object-cover object-center pointer-events-none"
                    loading="eager"
                  />

                  {/* Dimmer Scrim for Background Cards */}
                  {!isFront && (
                    <div className="absolute inset-0 bg-[#051417]/50 backdrop-blur-[0.5px] transition-opacity duration-300" />
                  )}

                  {/* Dark Multi-layer Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030a0c] via-[#040e10]/60 to-black/25" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                  {/* Top Badge Ribbon */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                      <MapPinIcon className="h-3 w-3 text-[#e2c78b]" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        {dest.code || dest.country.slice(0, 3).toUpperCase()}
                      </span>
                    </div>

                    {dest.featured && (
                      <div className="flex items-center gap-1 rounded-full border border-[#c9a45c]/50 bg-[#c9a45c]/25 px-2.5 py-0.5 backdrop-blur-md">
                        <SparklesIcon className="h-2.5 w-2.5 text-[#f3dfab]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#f3dfab]">
                          Signature
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Content Area (Matches Reference Image) */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between z-10">
                    <div className="flex flex-col text-left">
                      {/* Destination City Title */}
                      <h3 className="font-playfair text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                        {dest.city || dest.name}
                      </h3>
                      
                      {/* Subtitle */}
                      <p className="mt-1 text-xs text-white/70 font-sans tracking-wide">
                        {dest.subtitle || dest.description?.slice(0, 30) || 'Scenic Escape'}
                      </p>
                    </div>

                    {/* Circular Arrow Button (Matches Reference) */}
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#c9a45c] group-hover:bg-[#c9a45c] group-hover:text-[#051417] shadow-lg shrink-0 ml-3">
                      <ArrowRightIcon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Physical 3D Glare Rim */}
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Navigation Controls & Pagination Deck ── */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl px-4 gap-3 sm:gap-4">
        {/* Destination Index Counter */}
        <div className="flex items-center gap-2.5">
          <span className="font-playfair text-xl font-bold text-[#e2c78b]">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className="h-3.5 w-[1px] bg-white/20" />
          <span className="font-mono text-xs text-white/50">
            {String(total).padStart(2, '0')} Expeditions
          </span>
        </div>

        {/* Thumbnail Pagination Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs py-1 px-2 scrollbar-none">
          {destinations.map((dest, i) => (
            <button
              key={dest.id}
              type="button"
              onClick={() => {
                setActiveIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-7 bg-gradient-to-r from-[#c9a45c] to-[#e2c78b] shadow-[0_0_8px_rgba(201,164,92,0.8)]'
                  : 'w-1.5 bg-white/25 hover:bg-white/45'
              }`}
              aria-label={`Go to ${dest.city}`}
            />
          ))}
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Destination"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c9a45c] hover:bg-[#c9a45c] hover:text-[#051417] hover:shadow-[0_0_15px_rgba(201,164,92,0.5)] active:scale-95"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Destination"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c9a45c] hover:bg-[#c9a45c] hover:text-[#051417] hover:shadow-[0_0_15px_rgba(201,164,92,0.5)] active:scale-95"
          >
            <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}