"use client";

import React, { useState, useMemo, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { destinations } from '@/lib/data/destinations';
import { Destination3DStack } from '@/components/destinations/Destination3DStack';
import {
  Mountain3DIcon,
  Plane3DIcon,
  Compass3DIcon,
  Star3DIcon,
} from '@/components/destinations/Destination3DIcons';
import { MagnifyingGlassIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

const tabs = [
  { id: 'all', label: 'All Expeditions', count: 10, Icon: Compass3DIcon },
  { id: 'kashmir', label: 'Kashmir Valley', count: 4, Icon: Mountain3DIcon },
  { id: 'international', label: 'International', count: 6, Icon: Plane3DIcon },
  { id: 'featured', label: 'Signature Tours', count: 7, Icon: Star3DIcon },
];

export function DestinationsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Fluid 3D spotlight tracking cursor across the entire section
  const handleSectionMouseMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (activeTab === 'kashmir' && dest.country !== 'India') return false;
      if (activeTab === 'international' && dest.country === 'India') return false;
      if (activeTab === 'featured' && !dest.featured) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchCity = dest.city.toLowerCase().includes(query);
        const matchCountry = dest.country.toLowerCase().includes(query);
        const matchDesc = dest.description.toLowerCase().includes(query);
        const matchCode = dest.code?.toLowerCase().includes(query);
        return matchCity || matchCountry || matchDesc || matchCode;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <section
      ref={sectionRef}
      id="destinations"
      onMouseMove={handleSectionMouseMove}
      className="relative w-full overflow-hidden bg-[#051417] py-24 sm:py-32"
    >
      {/* ── 3D Volumetric Stage Lighting & Atmospheric Star Dust ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Real-time Cursor Spotlight */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[150px] opacity-30 transition-transform duration-500 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle, #e2c78b 0%, #173f3d 55%, transparent 75%)',
          }}
        />

        {/* Ambient Spheres */}
        <div className="absolute -top-32 left-1/5 h-[450px] w-[450px] rounded-full bg-[#173f3d]/45 blur-[120px]" />
        <div className="absolute top-1/2 -right-20 h-[500px] w-[500px] rounded-full bg-[#c9a45c]/12 blur-[130px]" />

        {/* Micro-Dot Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(226,199,139,0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Atmospheric Seamless Blending Top & Bottom */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#071c2b] via-[#051417]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07191d] via-[#051417]/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* ── Header Area with 3D Globe Centerpiece ── */}
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {/* Headline */}
            <div className="flex items-center gap-5 sm:gap-6 mt-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.7)] border border-[#c9a45c]/40 bg-[#07191d] flex items-center justify-center">
                <video
                  src="/videos/icon-morph.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
                World-Class{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3dfab] via-[#c9a45c] to-[#e2c78b] drop-shadow-[0_2px_15px_rgba(201,164,92,0.3)]">
                  Destinations.
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* ── Filter & Search Control Panel ── */}
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-[2rem] border border-white/15 bg-white/[0.04] p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const { Icon } = tab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-2.5 rounded-2xl px-5 py-3 text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c9a45c] via-[#dfbe78] to-[#f3dfab] text-[#051417] shadow-[0_4px_25px_rgba(201,164,92,0.5)] scale-102'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-[#051417]/20 text-[#051417]' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px] lg:w-80">
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-2.5 shadow-inner focus-within:border-[#c9a45c] focus-within:ring-2 focus-within:ring-[#c9a45c]/30 transition-all">
              <MagnifyingGlassIcon className="h-4 w-4 text-[#e2c78b] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, country, or code..."
                className="w-full bg-transparent text-xs font-medium text-white placeholder:text-white/40 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="rounded-full p-1 text-white/50 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── 3D Stack / Fan Interactive Cards Deck ── */}
        {filteredDestinations.length > 0 ? (
          <Destination3DStack destinations={filteredDestinations} />
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-16 text-center shadow-2xl backdrop-blur-md">
            <Compass3DIcon className="mx-auto mb-5 w-16 h-16" />
            <h3 className="font-playfair text-2xl font-bold text-white">
              No matching destinations found
            </h3>
            <p className="mt-2 text-xs text-white/60 max-w-sm mx-auto">
              Try adjusting your search query or switch between the categories above to see our hand-crafted destinations.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-6 rounded-full bg-gradient-to-r from-[#c9a45c] to-[#e2c78b] px-6 py-2.5 text-xs font-bold text-[#051417] shadow-lg hover:shadow-[0_0_20px_rgba(201,164,92,0.4)] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
