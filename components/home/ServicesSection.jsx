"use client";

import React, { useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

const services = [
  {
    index: '01',
    title: 'Tailored Itineraries',
    subtitle: 'Private Bespoke Design',
    image: '/images/services/itinerary.jpg',
    description: 'Every route is customized to match your tempo, preferences, and personal travel philosophy.',
    features: ['Hand-drawn itineraries', 'Private chauffeurs', 'Flexible daily pacing', 'Exclusive local access'],
    glow: '#eab308',
  },
  {
    index: '02',
    title: 'Luxury Accommodations',
    subtitle: '5-Star & Heritage Sanctuaries',
    image: '/images/services/accommodations.jpg',
    description: 'Heritage houseboats on Dal Lake, alpine chalets in Gulmarg, and overwater bungalows in Maldives.',
    features: ['Verified 5★ luxury stays', 'VIP check-in courtesy', 'Complimentary upgrades', 'Curated suite views'],
    glow: '#f59e0b',
  },
  {
    index: '03',
    title: '24/7 Dedicated Concierge',
    subtitle: 'Round-The-Clock On-Ground Support',
    image: '/images/services/concierge.jpg',
    description: 'Our senior specialists remain directly on call for dinner reservations, weather adjustments, and VIP care.',
    features: ['Direct phone & messaging line', 'Emergency trip assistance', 'Flight coordination', 'Immediate response time'],
    glow: '#0284c7',
  },
  {
    index: '04',
    title: 'Private Regional Guides',
    subtitle: 'Native Cultural Specialists',
    image: '/images/services/guides.jpg',
    description: 'Discover hidden mountain trails, artisan saffron growers, ancient architecture, and private dining.',
    features: ['Multilingual historians', 'Unmapped hidden gems', 'Photography scouting', 'Local cultural entry'],
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
      x: Number(((0.5 - y) * 14).toFixed(2)),
      y: Number(((x - 0.5) * 16).toFixed(2)),
    });
    setGlare({
      x: Number((x * 100).toFixed(1)),
      y: Number((y * 100).toFixed(1)),
      opacity: 0.4,
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
      style={{ perspective: '1400px' }}
    >
      <div
        className="relative h-full w-full rounded-[2rem] p-[1.5px] transition-all duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 14 : 0}px)`,
          background: isHovered
            ? 'linear-gradient(135deg, rgba(226,199,139,0.7) 0%, rgba(201,164,92,0.3) 40%, rgba(255,255,255,0.06) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
          boxShadow: isHovered
            ? '0 28px 70px -15px rgba(0,0,0,0.85), 0 0 35px -5px rgba(201,164,92,0.35)'
            : '0 16px 40px -12px rgba(0,0,0,0.65)',
        }}
      >
        <article className="relative flex flex-col h-full w-full overflow-hidden rounded-[1.95rem] bg-[#07191d]">
          {/* Holographic Specular Glare */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-[1.95rem] transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,248,225,0.4) 0%, rgba(201,164,92,0.15) 35%, transparent 70%)`,
            }}
          />

          {/* Ambient Corner Accent Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-45"
            style={{ background: svc.glow }}
          />

          {/* ── Top Image Header (Replaces icons) ── */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0 bg-[#051417]">
            <img
              src={svc.image}
              alt={svc.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            {/* Dark bottom gradient overlay for seamless flow into content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07191d] via-[#07191d]/40 to-black/25" />

            {/* Step Index Badge Floating in Top Corner */}
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="font-mono text-xs font-bold tracking-widest text-[#e2c78b] border border-[#c9a45c]/45 rounded-full px-3 py-1 bg-black/65 backdrop-blur-md shadow-lg">
                {svc.index}
              </span>
            </div>
          </div>

          {/* ── Body: Title & Features ── */}
          <div className="flex-1 flex flex-col p-6 sm:p-7 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e2c78b] mb-1.5">
              {svc.subtitle}
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-black text-white group-hover:text-[#f3dfab] transition-colors leading-snug">
              {svc.title}
            </h3>

            <p className="mt-3 font-inter text-xs leading-relaxed text-white/75">
              {svc.description}
            </p>

            {/* Service Feature Checkpoints */}
            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4">
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
        {/* ── Section Header ── */}
        <div className="mb-16">
          <div className="max-w-2xl">
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Why Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3dfab] via-[#c9a45c] to-[#e2c78b] drop-shadow-[0_2px_15px_rgba(201,164,92,0.3)]">With Us.</span>
            </h2>
          </div>
        </div>

        {/* ── 4-Column Luxury Services Grid with Photography Cards ── */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <ServiceCard key={svc.title} svc={svc} />
          ))}
        </div>
      </Container>
    </section>
  );
};
