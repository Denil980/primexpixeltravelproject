import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { siteConfig } from '@/lib/config';
import { AboutTimeline } from '@/components/about/AboutTimeline';
import {
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon,
  MapPinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { value: '9+ Yrs', label: 'In Operation' },
  { value: '15,000+', label: 'Travellers Served' },
  { value: '4.9★', label: 'Customer Rating' },
  { value: '24/7', label: 'Dedicated Support' },
];

const corePillars = [
  {
    icon: ShieldCheckIcon,
    badge: 'OUR MISSION',
    title: 'Our Mission',
    description:
      'To make every journey safe, seamless and memorable — for every kind of traveller.',
    color: '#0f2c3f',
  },
  {
    icon: GlobeAltIcon,
    badge: 'OUR VISION',
    title: 'Our Vision',
    description:
      'To be the most trusted name in curated travel experiences, known for reliability and genuine hospitality.',
    color: '#b8860b',
  },
  {
    icon: HeartIcon,
    badge: 'OUR VALUES',
    title: 'Our Values',
    description:
      'Transparency, safety, local expertise and a relentless focus on the traveller’s comfort guide everything we do.',
    color: '#22C55E',
  },
];

const teamHighlights = [
  'Local travel specialist with years of authentic destination expertise',
  'Direct personal WhatsApp access for 24/7 support throughout your trip',
  'Trusted by solo travellers, couples, families & corporate groups',
  'Curated network of partner hotels, houseboats, guides & private cabs',
  'Customized itineraries tailored to your exact budget & schedule',
];

export const metadata = {
  title: `About Us | ${siteConfig.name}`,
  description:
    'Learn about Tours & Travels — a premier travel company trusted by thousands, offering seamless journeys across Kashmir, Maharashtra, and top international destinations.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0f2c3f] text-white pt-28 sm:pt-36 pb-20 sm:pb-28">
        <ResponsiveImage
          src="/images/kashmir.jpg"
          alt="About our travel agency"
          priority
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2c3f]/90 via-[#0f2c3f]/75 to-[#0f2c3f]" />

        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#fef08a] text-xs font-semibold uppercase tracking-widest mb-6">
            <MapPinIcon className="h-4 w-4 text-[#b8860b]" />
            <span>Our Story & Legacy</span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight tracking-tight">
            Crafting Extraordinary Journeys <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#fef08a]">
              With Passion & Authenticity
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to {siteConfig.name} — your trusted travel partner dedicated to creating safe, seamless, and unforgettable experiences in Kashmir, Maharashtra, and top international destinations.
          </p>
        </Container>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-10 bg-white border-b border-slate-200/80 shadow-sm">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="font-playfair text-3xl sm:text-4xl font-black text-[#0f2c3f] mb-1">
                  {stat.value}
                </div>
                <div className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── STORY & WHO WE ARE ── */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image Card */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-slate-200 hover:border-[#b8860b]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(15,44,63,0.35)] transform-gpu">
              <ResponsiveImage
                src="/images/kashmir.jpg"
                alt="Kashmir valley — our home and expertise"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                width={600}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2c3f]/85 via-[#0f2c3f]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="font-mono text-[10px] font-bold text-[#fef08a] uppercase tracking-widest mb-1 block">
                  Our Heartland
                </span>
                <p className="font-playfair text-2xl font-bold text-white">Paradise on Earth</p>
                <p className="font-sans text-xs text-slate-200 mt-1">Kashmir Valley & Beyond</p>
              </div>
            </div>

            {/* Right Details */}
            <div className="flex flex-col text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#b8860b]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#b8860b]">
                  WHO WE ARE
                </span>
              </div>

              <h2 className="font-playfair text-3xl sm:text-4xl font-black text-[#0f2c3f] mb-6 leading-tight">
                A Dedicated Travel Specialist <br /> Who Treats You Like Family
              </h2>

              <div className="space-y-4 font-sans text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  At <strong className="text-[#0f2c3f] font-semibold">{siteConfig.name}</strong>, we believe travel should be deeply personal and stress-free. When you reach out, you communicate directly with <strong className="text-[#0f2c3f] font-semibold">{siteConfig.ownerName}</strong>, who personally oversees your itinerary from day one until your return home.
                </p>
                <p>
                  With roots grounded in warm hospitality and years of local expertise, we specialize in authentic valley tours, Maharashtra outstation getaways, and luxury international getaways to Dubai, Maldives, Switzerland, Thailand, and Paris.
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <ul className="space-y-3">
                  {teamHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-slate-700 text-xs sm:text-sm">
                      <CheckCircleIcon className="h-5 w-5 shrink-0 text-[#b8860b] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── WHAT DRIVES US (MISSION, VISION & VALUES) ── */}
      <section className="py-16 sm:py-24 bg-[#0f2c3f] text-white">
        <Container className="max-w-6xl">
          <div className="text-center mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#fef08a]">
              WHAT DRIVES US
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-black mt-2 mb-4">
              Mission, Vision & Values
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
              Principles we practice daily to ensure every guest enjoys a safe, seamless, and truly memorable travel experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-[#b8860b]/50 hover:bg-white/10 hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15"
                      style={{ color: '#fef08a' }}
                    >
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-[#fef08a] border border-white/15">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-playfair text-2xl font-bold mb-3 text-white">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#fef08a]">
                  <SparklesIcon className="h-4 w-4" />
                  <span>Guiding Principle</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── OUR JOURNEY (TIMELINE & GROWTH) ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <Container className="max-w-5xl">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#b8860b]">
              NEARLY A DECADE OF EXPERIENCE
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-black text-[#0f2c3f] mt-2 mb-4">
              Our Journey
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
              From a small local operation to a full-fleet travel company trusted by thousands — here's a quick look at our growth.
            </p>
          </div>

          <AboutTimeline />
        </Container>
      </section>



      {/* ── CALL TO ACTION ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0f2c3f] via-[#163c54] to-[#0f2c3f] text-white">
        <Container className="max-w-3xl text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-black mb-4">
            Ready To Start Planning Your Trip?
          </h2>
          <p className="font-sans text-sm sm:text-base mb-8 text-slate-300">
            Get in touch directly with {siteConfig.ownerName} for custom itinerary options and instant assistance.
          </p>
          <div className="flex justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#b8860b] text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-[#a17509] transition-all shadow-lg hover:scale-105"
            >
              <span>Send an Inquiry</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
