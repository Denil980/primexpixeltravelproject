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
      x: Number(((0.5 - y) * 10).toFixed(2)),
      y: Number(((x - 0.5) * 12).toFixed(2)),
    });
    setGlare({
      x: Number((x * 100).toFixed(1)),
      y: Number((y * 100).toFixed(1)),
      opacity: 0.3,
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
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 10 : 0}px)`,
          boxShadow: isHovered
            ? '0 20px 45px -10px rgba(15, 23, 42, 0.15), 0 0 20px -5px rgba(184, 134, 11, 0.2)'
            : '0 10px 25px -8px rgba(15, 23, 42, 0.08)',
        }}
      >
        <article className="relative flex flex-col h-full w-full overflow-hidden rounded-[1.95rem] bg-white border border-slate-200">
          {/* Holographic Specular Glare */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-[1.95rem] transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, rgba(212,175,55,0.1) 35%, transparent 70%)`,
            }}
          />

          {/* Top Image Header */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0 bg-slate-100">
            <img
              src={svc.image}
              alt={svc.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            {/* Subtle bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-60" />

            {/* Step Index Badge */}
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="font-mono text-xs font-bold tracking-widest text-[#0f2c3f] border border-slate-200 rounded-full px-3 py-1 bg-white/90 backdrop-blur-md shadow-sm">
                {svc.index}
              </span>
            </div>
          </div>

          {/* Body: Title & Features */}
          <div className="flex-1 flex flex-col p-6 sm:p-7 pt-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b8860b] mb-1.5">
              {svc.subtitle}
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#0f2c3f] group-hover:text-[#b8860b] transition-colors leading-snug">
              {svc.title}
            </h3>

            <p className="mt-3 font-inter text-xs leading-relaxed text-slate-700 font-medium">
              {svc.description}
            </p>

            {/* Service Feature Checkpoints */}
            <ul className="mt-6 space-y-2.5 border-t border-slate-200 pt-4">
              {svc.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold">
                  <CheckBadgeIcon className="h-4 w-4 text-[#b8860b] shrink-0" />
                  <span>{feat}</span>
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
      className="relative w-full overflow-hidden bg-[#F1F5F9] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full blur-[160px] opacity-15 transition-transform duration-500 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle, #b8860b 0%, #0f2c3f 50%, transparent 75%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="mb-16">
          <div className="max-w-2xl">
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-black text-[#0f2c3f] tracking-tight leading-[1.05]">
              Why Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#a17a24]">With Us.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <ServiceCard key={svc.title} svc={svc} />
          ))}
        </div>
      </Container>
    </section>
  );
};