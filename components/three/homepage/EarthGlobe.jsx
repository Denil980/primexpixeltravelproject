"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const globeMarkers = [
  {
    id: 'switzerland',
    city: 'Switzerland',
    subtitle: 'Alps & Beyond',
    image: '/images/kashmir.jpg',
    pin: { top: '22%', left: '28%' },
    card: { top: '-5%', left: '-14%' },
    side: 'left',
  },
  {
    id: 'paris',
    city: 'Paris',
    subtitle: 'City of Love',
    image: '/images/international.jpg',
    pin: { top: '27%', left: '23%' },
    card: { top: '13%', left: '-14%' },
    side: 'left',
  },
  {
    id: 'dubai',
    city: 'Dubai',
    subtitle: 'Modern Wonders',
    image: '/images/dubai.jpg',
    pin: { top: '38%', left: '57%' },
    card: { top: '34%', right: '-14%' },
    side: 'right',
  },
  {
    id: 'srinagar',
    city: 'Srinagar',
    subtitle: 'Heaven on Earth',
    image: '/images/hero-travel.jpg',
    pin: { top: '30%', left: '67%' },
    card: { top: '16%', right: '-14%' },
    side: 'right',
  },
  {
    id: 'maldives',
    city: 'Maldives',
    subtitle: 'Island Paradise',
    image: '/images/international-thumb.jpg',
    pin: { top: '50%', left: '64%' },
    card: { top: '52%', right: '-14%' },
    side: 'right',
  },
];

function pct(str, total = 540) {
  return (parseFloat(str) / 100) * total;
}

const CARD_W = 150;
const CARD_H = 46;

function cardAnchor(m) {
  const isLeft = m.side === 'left';
  if (isLeft) {
    const cardLeft = pct(m.card.left);
    const cardTop = pct(m.card.top);
    return {
      x: cardLeft + CARD_W,
      y: cardTop + CARD_H / 2,
    };
  } else {
    const cardRight = pct(m.card.right);
    const cardLeft_x = 540 - -cardRight - CARD_W;
    const cardTop = pct(m.card.top);
    return {
      x: cardLeft_x,
      y: cardTop + CARD_H / 2,
    };
  }
}

function pinXY(m) {
  return {
    x: pct(m.pin.left),
    y: pct(m.pin.top),
  };
}

export function EarthGlobe() {
  const containerRef = useRef(null);
  const frontPlaneRef = useRef(null);
  const backPlaneRef = useRef(null);

  /* Zero-Re-render Mouse Parallax via CSS Variables */
  useEffect(() => {
    let rAF = null;
    const handleMouseMove = (e) => {
      if (rAF) return;
      rAF = requestAnimationFrame(() => {
        if (containerRef.current) {
          const x = ((e.clientX / window.innerWidth - 0.5) * 16).toFixed(2);
          const y = ((e.clientY / window.innerHeight - 0.5) * 12).toFixed(2);
          containerRef.current.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
        }
        rAF = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  /* High-Performance 60fps Airplane Orbit via Direct Ref Mutation (0 React Re-renders) */
  useEffect(() => {
    let animId = null;
    let start = null;
    const PERIOD = 24000;
    const GW = 540;
    const GH = 540;
    const cx = GW / 2;
    const cy = GH / 2;
    const ORBIT_RX = 292;
    const ORBIT_RY = 88;

    const tick = (ts) => {
      if (!start) start = ts;
      const angle = (((ts - start) % PERIOD) / PERIOD) * 360;
      const rad = (angle * Math.PI) / 180;

      const planeX = cx + Math.cos(rad) * ORBIT_RX;
      const planeY = cy + Math.sin(rad) * ORBIT_RY;

      const rad2 = rad + 0.06;
      const plane2X = cx + Math.cos(rad2) * ORBIT_RX;
      const plane2Y = cy + Math.sin(rad2) * ORBIT_RY;
      const heading = Math.atan2(plane2Y - planeY, plane2X - planeX) * (180 / Math.PI);

      const isBehind = Math.sin(rad) < 0;

      if (frontPlaneRef.current) {
        if (isBehind) {
          frontPlaneRef.current.style.display = 'none';
        } else {
          frontPlaneRef.current.style.display = 'block';
          frontPlaneRef.current.style.left = `${((planeX / GW) * 100).toFixed(2)}%`;
          frontPlaneRef.current.style.top = `${((planeY / GH) * 100).toFixed(2)}%`;
          frontPlaneRef.current.style.transform = `translate(-50%, -50%) rotate(${heading.toFixed(1)}deg)`;
        }
      }

      if (backPlaneRef.current) {
        if (isBehind) {
          backPlaneRef.current.style.display = 'block';
          const planeElem = backPlaneRef.current.querySelector('.back-plane-group');
          if (planeElem) {
            planeElem.setAttribute('transform', `translate(${planeX.toFixed(1)},${planeY.toFixed(1)}) rotate(${heading.toFixed(1)})`);
          }
        } else {
          backPlaneRef.current.style.display = 'none';
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const GW = 540;
  const GH = 540;

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-visible">
      {/* Responsive scale wrapper */}
      <div
        className="relative flex items-center justify-center"
        style={{
          transform: 'scale(var(--globe-scale, 1))',
          transformOrigin: 'center center',
        }}
      >
        <style>{`
          :root { --globe-scale: 0.55; }
          @media (min-width: 400px) { :root { --globe-scale: 0.65; } }
          @media (min-width: 640px) { :root { --globe-scale: 0.80; } }
          @media (min-width: 768px) { :root { --globe-scale: 0.90; } }
          @media (min-width: 1024px) { :root { --globe-scale: 1; } }
        `}</style>

        {/* Outer atmospheric aura */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(14,165,233,0.08) 50%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Globe container */}
        <div
          ref={containerRef}
          className="relative transition-transform duration-300 ease-out transform-gpu"
          style={{
            width: GW,
            height: GH,
          }}
        >
          {/* Earth surface */}
          <div
            className="earth-globe-rotation absolute inset-0 rounded-full overflow-hidden"
            style={{
              backgroundImage: "url('/textures/earth/earth_atmos_2048.jpg')",
              backgroundSize: '200% 100%',
              backgroundPosition: '62% 50%',
              filter: 'brightness(1.10) contrast(1.08) saturate(1.20)',
              boxShadow: [
                'inset -2.5rem -2.5rem 4rem rgba(15,23,42,0.45)',
                'inset 1.5rem 1.5rem 3rem rgba(255,255,255,0.35)',
                '0 12px 40px rgba(14,165,233,0.25)',
                '0 0 45px rgba(56,189,248,0.35)',
              ].join(', '),
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: 'inset 0 0 20px rgba(56,189,248,0.60), inset 0 0 8px rgba(255,255,255,0.30)' }}
            />
          </div>

          {/* Atmospheric rim glow ring */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              inset: -8,
              borderRadius: '50%',
              boxShadow: '0 0 36px 12px rgba(56,189,248,0.17), 0 0 72px 28px rgba(34,211,238,0.07)',
            }}
          />

          {/* SVG layer: flight arcs + pins + threads + orbit */}
          <svg
            viewBox={`0 0 ${GW} ${GH}`}
            className="pointer-events-none absolute inset-0 overflow-visible"
            style={{ width: '100%', height: '100%', zIndex: 10 }}
          >
            <defs>
              <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8dc" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#e2c78b" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#c9a45c" stopOpacity="0.15" />
              </linearGradient>
              <filter id="f-pin">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Flight-path arcs */}
            <path
              d={`M ${pct('28%')} ${pct('22%')} Q ${pct('24%')} ${pct('22%')} ${pct('23%')} ${pct('27%')}`}
              fill="none" stroke="url(#arc-grad)" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.7"
            />
            <path
              d={`M ${pct('23%')} ${pct('27%')} Q ${pct('40%')} ${pct('28%')} ${pct('57%')} ${pct('38%')}`}
              fill="none" stroke="url(#arc-grad)" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.75"
            />
            <path
              d={`M ${pct('57%')} ${pct('38%')} Q ${pct('62%')} ${pct('32%')} ${pct('67%')} ${pct('30%')}`}
              fill="none" stroke="url(#arc-grad)" strokeWidth="1.4" strokeDasharray="3 5" opacity="0.65"
            />
            <path
              d={`M ${pct('67%')} ${pct('30%')} Q ${pct('68%')} ${pct('42%')} ${pct('64%')} ${pct('50%')}`}
              fill="none" stroke="url(#arc-grad)" strokeWidth="1.4" strokeDasharray="3 5" opacity="0.60"
            />

            {/* Pins */}
            {globeMarkers.map((m, i) => {
              const { x, y } = pinXY(m);
              return (
                <g key={`pin-${m.id}`} filter="url(#f-pin)">
                  <circle cx={x} cy={y} r="12" fill="none" stroke="#fef08a" strokeWidth="1.2" opacity="0.35">
                    <animate attributeName="r" values="9;15;9" dur={`${1.8 + i * 0.25}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.05;0.5" dur={`${1.8 + i * 0.25}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy={y} r="6.5" fill="rgba(254,240,138,0.22)" stroke="#fde68a" strokeWidth="1.1" opacity="0.75" />
                  <circle cx={x} cy={y} r="3.8" fill="#fef08a" opacity="0.97" />
                  <circle cx={x - 1} cy={y - 1} r="1.4" fill="#ffffff" opacity="0.88" />
                </g>
              );
            })}

            {/* Threads */}
            {globeMarkers.map((m) => {
              const p = pinXY(m);
              const a = cardAnchor(m);
              const mx = (p.x + a.x) / 2;
              const my = (p.y + a.y) / 2 - 14;
              return (
                <path
                  key={`thread-${m.id}`}
                  d={`M ${p.x.toFixed(1)} ${p.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${a.x.toFixed(1)} ${a.y.toFixed(1)}`}
                  fill="none"
                  stroke="#fef08a"
                  strokeWidth="1.1"
                  strokeDasharray="3 4"
                  opacity="0.50"
                />
              );
            })}

            {/* Orbit guide */}
            <ellipse
              cx={270}
              cy={270}
              rx={292}
              ry={88}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />

            {/* Airplane BEHIND globe */}
            <g ref={backPlaneRef} opacity="0.30" style={{ display: 'none' }}>
              <g className="back-plane-group">
                <path d="M6,-4 L-5,0 L6,4 L4,0 Z" fill="#a0c4e4" />
              </g>
            </g>
          </svg>

          {/* Destination cards */}
          {globeMarkers.map((marker, idx) => {
            return (
              <motion.div
                key={marker.id}
                initial={{ opacity: 0, scale: 0.78, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.16, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute z-30 group cursor-pointer"
                style={marker.card}
              >
                <div
                  className="absolute w-2.5 h-2.5 rounded-full bg-[#fef08a] shadow-[0_0_8px_3px_rgba(254,240,138,0.65)] -translate-y-1/2"
                  style={{
                    top: '50%',
                    [marker.side === 'left' ? 'right' : 'left']: '-5px',
                  }}
                />

                <div className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-black/62 px-2 pr-3.5 py-1.5 shadow-[0_14px_38px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#c9a45c]/65">
                  <div className="h-[38px] w-[38px] rounded-xl overflow-hidden shrink-0 border border-white/15">
                    <img src={marker.image} alt={marker.city} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-playfair text-[11px] font-bold text-white leading-tight group-hover:text-[#f3dfab] transition-colors whitespace-nowrap">
                      {marker.city}
                    </span>
                    <span className="text-[9px] text-white/55 font-sans font-medium tracking-wide whitespace-nowrap">
                      {marker.subtitle}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Airplane IN FRONT of globe */}
          <div
            ref={frontPlaneRef}
            className="pointer-events-none absolute z-40"
            style={{ display: 'none' }}
          >
            <svg
              width="60"
              height="12"
              style={{ position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)' }}
              overflow="visible"
            >
              <defs>
                <linearGradient id="contrail-grad" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
                  <stop offset="50%" stopColor="rgba(160,210,255,0.30)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path d="M 60 6 L 0 6" stroke="url(#contrail-grad)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 55 4 L 10 4" stroke="rgba(200,235,255,0.20)" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="white"
              style={{
                transform: 'rotate(90deg)',
                filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(150,220,255,0.6))',
              }}
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}