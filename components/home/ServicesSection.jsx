"use client";

import React, { useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import {
  ShieldCheckIcon,
  ClockIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

// ── Photorealistic Premium Service Emblems (SVG-based) ───────────────────────

/**
 * Photorealistic Brass Compass – Tailored Itineraries
 */
function RealisticItineraryEmblem() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center select-none cursor-default group">
      <div className="absolute inset-[-8px] rounded-full bg-amber-400/30 blur-[16px] transition-all duration-500 group-hover:bg-amber-300/55 group-hover:blur-[22px]" />
      <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-500 group-hover:scale-110" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(212,175,55,0.6))' }}>
        <defs>
          <radialGradient id="c2-brass" cx="36%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#fff8dc" />
            <stop offset="18%" stopColor="#f5d060" />
            <stop offset="45%" stopColor="#c8860a" />
            <stop offset="75%" stopColor="#7a3d00" />
            <stop offset="100%" stopColor="#2d1200" />
          </radialGradient>
          <radialGradient id="c2-dial" cx="33%" cy="26%" r="72%">
            <stop offset="0%" stopColor="#244b72" />
            <stop offset="30%" stopColor="#0f2e4e" />
            <stop offset="65%" stopColor="#061828" />
            <stop offset="100%" stopColor="#010810" />
          </radialGradient>
          <linearGradient id="c2-needle-n" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="30%" stopColor="#dc2626" />
            <stop offset="65%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="c2-needle-s" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <radialGradient id="c2-ruby" cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fca5a5" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>
          <radialGradient id="c2-glare" cx="28%" cy="22%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="c2-inner-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <filter id="c2-ndl">
            <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.9" />
          </filter>
          <filter id="c2-glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Brass bezel */}
        <circle cx="50" cy="50" r="48" fill="url(#c2-brass)" />
        {/* Bezel edge shadow */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" />
        {/* Bezel inner rim highlight */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,248,180,0.5)" strokeWidth="0.8" />

        {/* Tick marks */}
        {Array.from({length: 72}).map((_, i) => {
          const angle = (i * 5 - 90) * (Math.PI / 180);
          const isMajor = i % 18 === 0;
          const isMed = i % 9 === 0;
          const len = isMajor ? 5.5 : isMed ? 3.5 : 1.8;
          const r1 = 44;
          return (
            <line key={i}
              x1={(50 + r1 * Math.cos(angle)).toFixed(2)} y1={(50 + r1 * Math.sin(angle)).toFixed(2)}
              x2={(50 + (r1 - len) * Math.cos(angle)).toFixed(2)} y2={(50 + (r1 - len) * Math.sin(angle)).toFixed(2)}
              stroke={isMajor ? '#fff8dc' : isMed ? '#e5c050' : '#9a6f10'}
              strokeWidth={isMajor ? 1.8 : isMed ? 1.1 : 0.6}
              strokeLinecap="round"
            />
          );
        })}

        {/* Deep dial */}
        <circle cx="50" cy="50" r="37" fill="url(#c2-dial)" />
        <circle cx="50" cy="50" r="37" fill="url(#c2-inner-glow)" />

        {/* Dial rings */}
        <circle cx="50" cy="50" r="36.5" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.7" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" strokeDasharray="2 3" />

        {/* Cardinal lines */}
        <line x1="50" y1="14.5" x2="50" y2="85.5" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6" />
        <line x1="14.5" y1="50" x2="85.5" y2="50" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6" />

        {/* N S E W labels */}
        <text x="50" y="25" textAnchor="middle" fill="#fde68a" fontSize="8" fontFamily="Georgia,serif" fontWeight="bold" filter="url(#c2-glow)">N</text>
        <text x="50" y="80" textAnchor="middle" fill="#7fb3d3" fontSize="6.5" fontFamily="Georgia,serif">S</text>
        <text x="78" y="53" textAnchor="middle" fill="#7fb3d3" fontSize="6.5" fontFamily="Georgia,serif">E</text>
        <text x="22" y="53" textAnchor="middle" fill="#7fb3d3" fontSize="6.5" fontFamily="Georgia,serif">W</text>

        {/* South needle (silver) */}
        <polygon points="50,82 47.5,50 52.5,50" fill="url(#c2-needle-s)" filter="url(#c2-ndl)" />
        <polygon points="50,82 49,65 51,65" fill="rgba(255,255,255,0.25)" />

        {/* North needle (red/gold) */}
        <polygon points="50,18 47.5,50 52.5,50" fill="url(#c2-needle-n)" filter="url(#c2-ndl)" />
        <polygon points="50,18 49,35 51,35" fill="rgba(255,200,200,0.4)" />

        {/* Ruby pivot */}
        <circle cx="50" cy="50" r="6" fill="url(#c2-ruby)" filter="url(#c2-glow)" />
        <circle cx="50" cy="50" r="6" fill="none" stroke="rgba(255,220,220,0.6)" strokeWidth="0.7" />
        <ellipse cx="48.2" cy="48" rx="2.2" ry="1.6" fill="rgba(255,255,255,0.75)" />

        {/* Crystal dome glare */}
        <circle cx="50" cy="50" r="37" fill="url(#c2-glare)" />
        {/* Outer rim light */}
        <circle cx="50" cy="50" r="47.5" fill="none" stroke="rgba(255,248,180,0.25)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

/**
 * Photorealistic Gold Concierge Bell – Luxury Accommodations
 */
function RealisticHotelEmblem() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center select-none cursor-default group">
      <div className="absolute inset-[-8px] rounded-full bg-amber-400/30 blur-[16px] transition-all duration-500 group-hover:bg-amber-300/55 group-hover:blur-[22px]" />
      <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-500 group-hover:scale-110" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(245,158,11,0.55))' }}>
        <defs>
          <radialGradient id="b2-ring" cx="34%" cy="26%" r="70%">
            <stop offset="0%" stopColor="#fff3a0" />
            <stop offset="22%" stopColor="#e8b830" />
            <stop offset="55%" stopColor="#9a5c00" />
            <stop offset="85%" stopColor="#4a1e00" />
            <stop offset="100%" stopColor="#1a0800" />
          </radialGradient>
          <radialGradient id="b2-bg" cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#1a0e04" />
            <stop offset="50%" stopColor="#0d0702" />
            <stop offset="100%" stopColor="#050200" />
          </radialGradient>
          <radialGradient id="b2-dome" cx="30%" cy="18%" r="80%">
            <stop offset="0%" stopColor="#fffde0" />
            <stop offset="12%" stopColor="#ffe878" />
            <stop offset="30%" stopColor="#f5a800" />
            <stop offset="58%" stopColor="#b05e00" />
            <stop offset="82%" stopColor="#6b2c00" />
            <stop offset="100%" stopColor="#2d0e00" />
          </radialGradient>
          <linearGradient id="b2-base" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff3a0" />
            <stop offset="25%" stopColor="#e8b830" />
            <stop offset="60%" stopColor="#9a5c00" />
            <stop offset="100%" stopColor="#2d0e00" />
          </linearGradient>
          <radialGradient id="b2-cap" cx="28%" cy="22%" r="72%">
            <stop offset="0%" stopColor="#fffde0" />
            <stop offset="35%" stopColor="#f5c842" />
            <stop offset="75%" stopColor="#9a5c00" />
            <stop offset="100%" stopColor="#3d1800" />
          </radialGradient>
          <radialGradient id="b2-glare" cx="28%" cy="16%" r="52%">
            <stop offset="0%" stopColor="rgba(255,255,240,0.95)" />
            <stop offset="30%" stopColor="rgba(255,240,150,0.4)" />
            <stop offset="70%" stopColor="rgba(255,200,50,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="b2-shadow">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.9" />
          </filter>
          <filter id="b2-glow">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="b2-shine">
            <feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Outer gold ring */}
        <circle cx="50" cy="50" r="48" fill="url(#b2-ring)" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,248,150,0.4)" strokeWidth="0.8" />
        {/* Dark inner background */}
        <circle cx="50" cy="50" r="41" fill="url(#b2-bg)" />

        {/* 5 glowing stars */}
        {[-16,-8,0,8,16].map((x, i) => (
          <text key={i} x={50+x} y="27" textAnchor="middle" fill="#fbbf24" fontSize="8" filter="url(#b2-glow)">★</text>
        ))}

        {/* Bell handle/stem */}
        <rect x="47" y="29" width="6" height="7" rx="3" fill="url(#b2-cap)" filter="url(#b2-shadow)" />
        <ellipse cx="48.5" cy="30" rx="1.8" ry="1.1" fill="rgba(255,255,220,0.7)" />

        {/* Bell dome – proper parabolic curve */}
        <path d="M50,35 C37,35 26,43 24,58 L76,58 C74,43 63,35 50,35 Z" fill="url(#b2-dome)" filter="url(#b2-shadow)" />

        {/* Strong specular highlight on dome */}
        <path d="M50,37 C42,37 36,42 34,50 C39,43 45,39 50,39 C55,39 61,43 66,50 C64,42 58,37 50,37 Z" fill="url(#b2-glare)" />

        {/* Secondary softer glare streak */}
        <ellipse cx="42" cy="44" rx="5" ry="3" fill="rgba(255,255,200,0.3)" transform="rotate(-20,42,44)" />

        {/* Rim collar */}
        <rect x="24" y="57" width="52" height="5" rx="2.5" fill="url(#b2-base)" filter="url(#b2-shadow)" />
        <line x1="24" y1="59" x2="76" y2="59" stroke="rgba(255,248,150,0.5)" strokeWidth="0.7" />

        {/* Base tiers */}
        <rect x="30" y="62" width="40" height="5" rx="2.5" fill="url(#b2-base)" filter="url(#b2-shadow)" />
        <rect x="26" y="67" width="48" height="5" rx="2.5" fill="url(#b2-base)" filter="url(#b2-shadow)" />

        {/* Foot highlight */}
        <line x1="27" y1="68.5" x2="73" y2="68.5" stroke="rgba(255,248,150,0.35)" strokeWidth="0.7" />

        {/* Outer ring glare */}
        <circle cx="50" cy="50" r="48" fill="url(#b2-glare)" opacity="0.18" />
        <circle cx="50" cy="50" r="47.5" fill="none" stroke="rgba(255,248,150,0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * Photorealistic Premium Headset – 24/7 Dedicated Concierge
 */
function RealisticConciergeEmblem() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center select-none cursor-default group">
      <div className="absolute inset-[-8px] rounded-full bg-cyan-400/25 blur-[16px] transition-all duration-500 group-hover:bg-cyan-300/50 group-hover:blur-[22px]" />
      <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-500 group-hover:scale-110" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(6,182,212,0.5))' }}>
        <defs>
          {/* Outer teal ring */}
          <radialGradient id="h2-ring" cx="34%" cy="26%" r="70%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="22%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#0e7490" />
            <stop offset="85%" stopColor="#164e63" />
            <stop offset="100%" stopColor="#042f3d" />
          </radialGradient>
          {/* Dark inner bg */}
          <radialGradient id="h2-bg" cx="35%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#0a2030" />
            <stop offset="55%" stopColor="#051018" />
            <stop offset="100%" stopColor="#020810" />
          </radialGradient>
          {/* Chrome headband */}
          <linearGradient id="h2-band" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="20%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="80%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          {/* Ear cup outer shell */}
          <radialGradient id="h2-cup" cx="28%" cy="22%" r="70%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="28%" stopColor="#94a3b8" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="85%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#050910" />
          </radialGradient>
          {/* Ear cushion pad */}
          <radialGradient id="h2-pad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="55%" stopColor="#0c1f35" />
            <stop offset="100%" stopColor="#050f1c" />
          </radialGradient>
          {/* Teal accent ring on cup */}
          <radialGradient id="h2-accent" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0e4f5e" />
          </radialGradient>
          {/* Mic boom */}
          <linearGradient id="h2-mic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          {/* Active mic */}
          <radialGradient id="h2-active" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="45%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0a4a5a" />
          </radialGradient>
          <radialGradient id="h2-glare" cx="28%" cy="20%" r="52%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="40%" stopColor="rgba(200,250,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="h2-shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.95" />
          </filter>
          <filter id="h2-glow">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="h2-micglow">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Outer teal ring */}
        <circle cx="50" cy="50" r="48" fill="url(#h2-ring)" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(165,243,252,0.3)" strokeWidth="0.8" />
        {/* Dark inner disc */}
        <circle cx="50" cy="50" r="41" fill="url(#h2-bg)" />

        {/* Chrome headband arc */}
        <path d="M27,57 C27,28 73,28 73,57" fill="none" stroke="url(#h2-band)" strokeWidth="6" strokeLinecap="round" filter="url(#h2-shadow)" />
        {/* Band top highlight */}
        <path d="M27,57 C27,28 73,28 73,57" fill="none" stroke="rgba(248,250,252,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Band center line (seam) */}
        <path d="M31,52 C33,34 67,34 69,52" fill="none" stroke="rgba(100,116,139,0.4)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Left ear cup */}
        <ellipse cx="27" cy="58" rx="11" ry="13" fill="url(#h2-cup)" filter="url(#h2-shadow)" />
        <ellipse cx="27" cy="58" rx="11" ry="13" fill="none" stroke="rgba(100,116,139,0.5)" strokeWidth="0.7" />
        {/* Teal accent ring */}
        <ellipse cx="27" cy="58" rx="8.5" ry="10" fill="none" stroke="url(#h2-accent)" strokeWidth="1.2" />
        {/* Cushion */}
        <ellipse cx="27" cy="58" rx="7" ry="9" fill="url(#h2-pad)" />
        {/* Cup highlight */}
        <ellipse cx="24.5" cy="54.5" rx="3.5" ry="2.5" fill="rgba(255,255,255,0.22)" />

        {/* Right ear cup */}
        <ellipse cx="73" cy="58" rx="11" ry="13" fill="url(#h2-cup)" filter="url(#h2-shadow)" />
        <ellipse cx="73" cy="58" rx="11" ry="13" fill="none" stroke="rgba(100,116,139,0.5)" strokeWidth="0.7" />
        {/* Teal accent ring */}
        <ellipse cx="73" cy="58" rx="8.5" ry="10" fill="none" stroke="url(#h2-accent)" strokeWidth="1.2" />
        {/* Cushion */}
        <ellipse cx="73" cy="58" rx="7" ry="9" fill="url(#h2-pad)" />
        {/* Cup highlight */}
        <ellipse cx="70.5" cy="54.5" rx="3.5" ry="2.5" fill="rgba(255,255,255,0.22)" />

        {/* Mic boom arm */}
        <path d="M66,66 Q58,74 50,76" fill="none" stroke="url(#h2-mic)" strokeWidth="3.5" strokeLinecap="round" filter="url(#h2-shadow)" />
        <path d="M66,66 Q58,74 50,76" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round" />

        {/* Mic capsule */}
        <ellipse cx="48" cy="76" rx="6" ry="4.5" fill="url(#h2-cup)" filter="url(#h2-shadow)" />
        <ellipse cx="48" cy="76" rx="6" ry="4.5" fill="none" stroke="rgba(100,116,139,0.5)" strokeWidth="0.7" />
        {/* Active glow dot */}
        <circle cx="48" cy="76" r="3" fill="url(#h2-active)" filter="url(#h2-micglow)" />
        <circle cx="46.8" cy="74.8" r="1.1" fill="rgba(255,255,255,0.85)" />

        {/* 24/7 label */}
        <text x="50" y="41" textAnchor="middle" fill="rgba(103,232,249,0.92)" fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="800" letterSpacing="1" filter="url(#h2-glow)">24/7</text>

        {/* Disc glare overlay */}
        <circle cx="50" cy="50" r="41" fill="url(#h2-glare)" opacity="0.28" />
        <circle cx="50" cy="50" r="47.5" fill="none" stroke="rgba(165,243,252,0.15)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * Photorealistic Mountain Vista – Expert Local Guides
 */
function RealisticGuidesEmblem() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center select-none cursor-default group">
      <div className="absolute inset-[-8px] rounded-full bg-emerald-400/30 blur-[16px] transition-all duration-500 group-hover:bg-emerald-300/55 group-hover:blur-[22px]" />
      <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-500 group-hover:scale-110" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(16,185,129,0.5))' }}>
        <defs>
          <radialGradient id="m2-ring" cx="34%" cy="26%" r="70%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="22%" stopColor="#34d399" />
            <stop offset="55%" stopColor="#065f46" />
            <stop offset="85%" stopColor="#022c22" />
            <stop offset="100%" stopColor="#011008" />
          </radialGradient>
          <linearGradient id="m2-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020b16" />
            <stop offset="30%" stopColor="#0c1f35" />
            <stop offset="60%" stopColor="#1a3a58" />
            <stop offset="85%" stopColor="#2a5570" />
            <stop offset="100%" stopColor="#1e4060" />
          </linearGradient>
          <radialGradient id="m2-sunrise" cx="50%" cy="68%" r="55%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#f97316" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
          </radialGradient>
          {/* Sun disc */}
          <radialGradient id="m2-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffde0" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          {/* Far mountains – cold blue */}
          <linearGradient id="m2-far" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b6b8a" />
            <stop offset="50%" stopColor="#1e3d52" />
            <stop offset="100%" stopColor="#0d1f2c" />
          </linearGradient>
          {/* Main peak lit face */}
          <linearGradient id="m2-peak-lit" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="25%" stopColor="#4ade80" />
            <stop offset="55%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          {/* Main peak shadow face */}
          <linearGradient id="m2-peak-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="55%" stopColor="#052e16" />
            <stop offset="100%" stopColor="#01140a" />
          </linearGradient>
          <linearGradient id="m2-snow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="45%" stopColor="#d1fae5" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
          <linearGradient id="m2-fore" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="55%" stopColor="#052e16" />
            <stop offset="100%" stopColor="#010f07" />
          </linearGradient>
          <radialGradient id="m2-glare" cx="28%" cy="20%" r="52%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <clipPath id="m2-clip"><circle cx="50" cy="50" r="41" /></clipPath>
          <filter id="m2-shadow">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.85" />
          </filter>
          <filter id="m2-sunglow">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="m2-starglow">
            <feGaussianBlur stdDeviation="1" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Outer emerald ring */}
        <circle cx="50" cy="50" r="48" fill="url(#m2-ring)" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(187,247,208,0.3)" strokeWidth="0.8" />

        <g clipPath="url(#m2-clip)">
          {/* Night-dawn sky */}
          <rect x="9" y="9" width="82" height="82" fill="url(#m2-sky)" />

          {/* Stars */}
          {[[15,16],[25,11],[38,14],[62,11],[75,16],[82,22],[18,26],[85,28]].map(([sx,sy], i) => (
            <circle key={i} cx={sx} cy={sy} r="1.1" fill="#e0f2fe" opacity="0.8" filter="url(#m2-starglow)" />
          ))}

          {/* Sunrise horizon glow */}
          <ellipse cx="50" cy="68" rx="46" ry="28" fill="url(#m2-sunrise)" filter="url(#m2-sunglow)" />

          {/* Sun disc peeking at horizon */}
          <circle cx="50" cy="67" r="5" fill="url(#m2-sun)" filter="url(#m2-sunglow)" />
          {/* Sun rays */}
          {Array.from({length: 8}).map((_, i) => {
            const a = (i * 45 - 90) * Math.PI / 180;
            return <line key={i} x1={(50 + 6 * Math.cos(a)).toFixed(2)} y1={(67 + 6 * Math.sin(a)).toFixed(2)} x2={(50 + 10 * Math.cos(a)).toFixed(2)} y2={(67 + 10 * Math.sin(a)).toFixed(2)} stroke="#fde047" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />;
          })}

          {/* Far mountain silhouettes */}
          <polygon points="5,68 18,46 28,56 40,42 52,52 62,40 74,50 86,45 95,68" fill="url(#m2-far)" opacity="0.9" />

          {/* Right secondary peak – lit */}
          <polygon points="72,28 56,70 88,70" fill="url(#m2-peak-lit)" opacity="0.85" filter="url(#m2-shadow)" />
          <polygon points="72,28 64,70 88,70" fill="url(#m2-peak-shadow)" opacity="0.7" />
          {/* Right peak snow */}
          <polygon points="72,28 65,44 72,42 79,44" fill="url(#m2-snow)" />
          <polygon points="72,28 65,44 72,42" fill="rgba(200,240,220,0.5)" />

          {/* Main central peak – lit right face */}
          <polygon points="50,14 76,70 50,70" fill="url(#m2-peak-lit)" filter="url(#m2-shadow)" />
          {/* Shadow left face */}
          <polygon points="50,14 24,70 50,70" fill="url(#m2-peak-shadow)" />
          {/* Ridge highlight */}
          <line x1="50" y1="14" x2="60" y2="40" stroke="rgba(167,243,208,0.35)" strokeWidth="1" />
          {/* Snow cap */}
          <polygon points="50,14 41,34 50,32 59,34" fill="url(#m2-snow)" />
          <polygon points="50,14 41,34 50,32" fill="rgba(200,240,220,0.55)" />
          {/* Snow crevice detail */}
          <line x1="50" y1="14" x2="45" y2="28" stroke="rgba(165,243,208,0.5)" strokeWidth="0.7" />
          <line x1="50" y1="14" x2="55" y2="30" stroke="rgba(165,243,208,0.3)" strokeWidth="0.5" />

          {/* Foreground tree ridge */}
          <polygon points="0,90 14,74 24,80 36,72 50,68 64,72 76,78 86,73 100,80 100,92 0,92" fill="url(#m2-fore)" />

          {/* Pine trees */}
          {[12,22,32,42,58,68,78,88].map((x, i) => (
            <g key={i}>
              <polygon points={`${x},76 ${x-5},86 ${x+5},86`} fill="#011f13" opacity="0.95" />
              <polygon points={`${x},70 ${x-4},80 ${x+4},80`} fill="#022c22" opacity="0.9" />
              <polygon points={`${x},65 ${x-3},74 ${x+3},74`} fill="#052e16" opacity="0.85" />
            </g>
          ))}
        </g>

        {/* Outer disc glare */}
        <circle cx="50" cy="50" r="48" fill="url(#m2-glare)" opacity="0.18" />
        <circle cx="50" cy="50" r="47.5" fill="none" stroke="rgba(187,247,208,0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}

const services = [
  {
    index: '01',
    title: 'Tailored Itineraries',
    subtitle: 'Private Bespoke Design',
    description: 'Every route is customized to match your tempo, preferences, and personal travel philosophy.',
    features: ['Hand-drawn itineraries', 'Private chauffeurs', 'Flexible daily pacing', 'Exclusive local access'],
    Emblem: RealisticItineraryEmblem,
    glow: '#eab308',
  },
  {
    index: '02',
    title: 'Luxury Accommodations',
    subtitle: '5-Star & Heritage Sanctuaries',
    description: 'Heritage houseboats on Dal Lake, alpine chalets in Gulmarg, and overwater bungalows in Maldives.',
    features: ['Verified 5★ luxury stays', 'VIP check-in courtesy', 'Complimentary upgrades', 'Curated suite views'],
    Emblem: RealisticHotelEmblem,
    glow: '#f59e0b',
  },
  {
    index: '03',
    title: '24/7 Dedicated Concierge',
    subtitle: 'Round-The-Clock On-Ground Support',
    description: 'Our senior specialists remain directly on call for dinner reservations, weather adjustments, and VIP care.',
    features: ['Direct phone & messaging line', 'Emergency trip assistance', 'Flight coordination', 'Immediate response time'],
    Emblem: RealisticConciergeEmblem,
    glow: '#0284c7',
  },
  {
    index: '04',
    title: 'Private Regional Guides',
    subtitle: 'Native Cultural Specialists',
    description: 'Discover hidden mountain trails, artisan saffron growers, ancient architecture, and private dining.',
    features: ['Multilingual historians', 'Unmapped hidden gems', 'Photography scouting', 'Local cultural entry'],
    Emblem: RealisticGuidesEmblem,
    glow: '#10b981',
  },
];

function ServiceCard({ svc }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

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

  const { Emblem } = svc;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000 h-full select-none"
      style={{ perspective: '1400px' }}
    >
      <div
        className="relative h-full w-full rounded-[2.25rem] p-[1.5px] transition-all duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 16 : 0}px)`,
          background: isHovered
            ? 'linear-gradient(135deg, rgba(226,199,139,0.7) 0%, rgba(201,164,92,0.3) 40%, rgba(255,255,255,0.06) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 100%)',
          boxShadow: isHovered
            ? '0 30px 75px -15px rgba(0,0,0,0.85), 0 0 35px -5px rgba(201,164,92,0.4)'
            : '0 16px 40px -12px rgba(0,0,0,0.65)',
        }}
      >
        <article className="relative flex flex-col h-full w-full overflow-hidden rounded-[2.2rem] bg-[#07191d] p-8 sm:p-9">
          {/* Holographic Specular Glare */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-[2.2rem] transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,248,225,0.45) 0%, rgba(201,164,92,0.18) 35%, transparent 70%)`,
            }}
          />

          {/* Ambient Corner Accent Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-45"
            style={{ background: svc.glow }}
          />

          {/* ── Top Header Row: 3D Emblem & Step Index (Elevated 3D Layer) ── */}
          <div
            className="flex items-center justify-between mb-8"
            style={{ transform: 'translateZ(30px)' }}
          >
            <Emblem />
            <span className="font-mono text-xs font-bold tracking-widest text-[#e2c78b] border border-[#c9a45c]/45 rounded-full px-3.5 py-1.5 bg-black/50 backdrop-blur-md shadow-lg">
              {svc.index}
            </span>
          </div>

          {/* ── Body: Title & Teaser (Elevated 3D Layer) ── */}
          <div style={{ transform: 'translateZ(38px)' }} className="flex-1 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e2c78b] mb-1.5">
              {svc.subtitle}
            </span>
            <h3 className="font-playfair text-2xl sm:text-[1.7rem] font-black text-white group-hover:text-[#f3dfab] transition-colors leading-snug">
              {svc.title}
            </h3>

            <p className="mt-3.5 font-inter text-xs leading-relaxed text-white/75">
              {svc.description}
            </p>

            {/* Service Feature Checkpoints */}
            <ul className="mt-7 space-y-3 border-t border-white/10 pt-5">
              {svc.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5 text-xs text-white/85">
                  <CheckBadgeIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

export const ServicesSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#051417] py-24 sm:py-32"
    >
      {/* ── 3D Ambient Stage Lights & Micro-Grid ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Real-time Cursor Spotlight */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full blur-[160px] opacity-25 transition-transform duration-500 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle, #c9a45c 0%, #173f3d 50%, transparent 75%)',
          }}
        />

        {/* Backing Ambient Spheres */}
        <div className="absolute top-20 left-10 h-[450px] w-[450px] rounded-full bg-[#173f3d]/35 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-[#c9a45c]/12 blur-[140px]" />

        {/* Elegant Dot Matrix */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(226,199,139,0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Seamless Vignettes */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07191d] via-[#051417]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#040d0f] to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* ── Section Header (Clean, Premium, High-Impact) ── */}
        <div className="mb-16">
          <div className="max-w-2xl">
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3dfab] via-[#c9a45c] to-[#e2c78b] drop-shadow-[0_2px_15px_rgba(201,164,92,0.3)]">Services.</span>
            </h2>
          </div>
        </div>

        {/* ── 4-Column Luxury 3D Services Grid ── */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <ServiceCard key={svc.title} svc={svc} />
          ))}
        </div>

        {/* ── Bottom Assurance Bar ── */}
        <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl flex flex-wrap items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c9a45c]/20 border border-[#c9a45c]/40 text-[#e2c78b] shadow-md">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">100% Financial & Travel Guarantee</p>
              <p className="text-xs text-white/60">Verified properties, insured itineraries, and guaranteed bookings.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0284c7]/20 border border-[#0284c7]/40 text-sky-300 shadow-md">
              <ClockIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Instant WhatsApp Response</p>
              <p className="text-xs text-white/60">Dedicated travel advisor assigned directly to your party.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
