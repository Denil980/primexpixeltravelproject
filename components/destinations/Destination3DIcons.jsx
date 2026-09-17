"use client";

import React, { useState } from 'react';

/**
 * High-end Realistic 3D Globe Icon:
 * - Uses the actual NASA / Blue Marble high-res satellite earth texture
 * - Continuous slow rotational orbit
 * - Realistic atmospheric spherical shading: dark terminator side, specular sunlight crescent,
 *   subtle iridescent cyan atmosphere rim glow, and outer depth shadows
 * - Mouse tilt responsiveness on hover
 */
export function Globe3DIcon({ className = "w-14 h-14" }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: Number((y * -16).toFixed(2)), y: Number((x * 18).toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ perspective: "800px" }}
    >
      {/* Outer Atmospheric Aura / Corona */}
      <div className="absolute inset-[-4px] rounded-full bg-cyan-400/20 blur-[8px] transition-all duration-500 group-hover:bg-cyan-300/35 group-hover:blur-[12px]" />

      {/* 3D Tilted Rotating Sphere Container */}
      <div
        className="relative h-full w-full rounded-full overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          boxShadow: `
            0 12px 28px -4px rgba(0, 0, 0, 0.75),
            0 4px 12px rgba(10, 61, 98, 0.4),
            inset -8px -8px 18px rgba(0, 0, 0, 0.95),
            inset 6px 6px 14px rgba(175, 230, 255, 0.45)
          `,
        }}
      >
        {/* Actual NASA satellite Earth surface with continuous slow rotation */}
        <div
          className="earth-globe-rotation absolute inset-0 w-full h-full rounded-full bg-cover bg-position-[52%_42%]"
          style={{
            backgroundImage: "url('/textures/earth/earth_atmos_2048.jpg')",
          }}
        />

        {/* Photorealistic Spherical Lighting & Night Shadow (Terminator) */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 25%, transparent 20%, rgba(2, 6, 12, 0.55) 55%, rgba(1, 4, 8, 0.92) 85%)",
          }}
        />

        {/* Sunlight Specular Glint & Fresnel Highlight */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 26% 22%, rgba(255, 255, 255, 0.5) 0%, rgba(200, 240, 255, 0.15) 28%, transparent 55%)",
          }}
        />

        {/* Cyan Atmospheric Edge Halo */}
        <span
          className="absolute inset-0 rounded-full border border-cyan-300/35 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 8px rgba(125, 211, 252, 0.5), inset -2px -2px 6px rgba(0, 20, 40, 0.8)",
          }}
        />
      </div>
    </div>
  );
}

export function Mountain3DIcon({ className = "w-6 h-6" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ perspective: "400px" }}>
      <div
        className="relative flex items-center justify-center h-full w-full rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-x-12"
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, #1e524f 0%, #0d292b 100%)",
          boxShadow: "0 6px 14px rgba(13,41,43,0.4), inset 0 1px 1px rgba(234,216,173,0.6)",
          border: "1px solid rgba(201,164,92,0.3)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#e2c78b] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          <path d="M3 20L10 6L14 13L17 8L22 20H3Z" fill="currentColor" opacity="0.9" />
          <path d="M10 6L7 12L10 13L12 9.5L10 6Z" fill="#ffffff" opacity="0.95" />
          <path d="M17 8L15.5 10.5L17 11.5L18.5 10L17 8Z" fill="#ffffff" opacity="0.95" />
        </svg>
      </div>
    </div>
  );
}

export function Plane3DIcon({ className = "w-6 h-6" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ perspective: "400px" }}>
      <div
        className="relative flex items-center justify-center h-full w-full rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-y-12"
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, #0284c7 0%, #072e42 100%)",
          boxShadow: "0 6px 14px rgba(2,132,199,0.4), inset 0 1px 1px rgba(255,255,255,0.6)",
          border: "1px solid rgba(56,189,248,0.3)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-sky-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
        </svg>
      </div>
    </div>
  );
}

export function Compass3DIcon({ className = "w-6 h-6" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ perspective: "400px" }}>
      <div
        className="relative flex items-center justify-center h-full w-full rounded-full transition-all duration-500 group-hover:rotate-90 group-hover:scale-110"
        style={{
          transformStyle: "preserve-3d",
          background: "radial-gradient(circle at 35% 35%, #3a7572 0%, #173f3d 60%, #081a1b 100%)",
          boxShadow: "0 6px 14px rgba(0,0,0,0.4), inset 0 1px 2px rgba(201,164,92,0.7)",
          border: "1px solid rgba(226,199,139,0.5)",
        }}
      >
        <div className="h-3.5 w-1 bg-gradient-to-b from-[#e2c78b] to-transparent rounded-t-full shadow-xs" />
        <div className="h-3.5 w-1 bg-gradient-to-t from-rose-400 to-transparent rounded-b-full shadow-xs" />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-xs" />
      </div>
    </div>
  );
}

export function Star3DIcon({ className = "w-6 h-6" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ perspective: "400px" }}>
      <div
        className="relative flex items-center justify-center h-full w-full rounded-xl transition-all duration-300 group-hover:scale-115"
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
          boxShadow: "0 6px 16px rgba(245,158,11,0.45), inset 0 1px 1px rgba(255,255,255,0.7)",
          border: "1px solid rgba(254,243,199,0.5)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      </div>
    </div>
  );
}
