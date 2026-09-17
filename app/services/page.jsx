import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { siteConfig } from '@/lib/config';
import { GlobeAltIcon, HomeIcon, SparklesIcon, HeartIcon, CameraIcon, ShieldCheckIcon, PhoneIcon, StarIcon, CheckCircleIcon, ArrowRightIcon, } from '@heroicons/react/24/outline';
const services = [
    {
        id: 'international-tours',
        icon: GlobeAltIcon,
        title: 'International Tour Packages',
        description: 'Curated luxury getaways to Dubai, Maldives, Switzerland, Thailand, Singapore, Paris and beyond. Every detail handled — flights, hotels, sightseeing and transfers.',
        features: ['Custom itineraries', 'Visa guidance', 'Group & solo packages', 'VIP airport assistance'],
        accent: '#D4AF37',
    },
    {
        id: 'kashmir-tours',
        icon: HomeIcon,
        title: 'Kashmir Valley Tours',
        description: 'Specialist Kashmir experiences — houseboat stays on Dal Lake, alpine meadows of Gulmarg, the Betaab Valleys of Pahalgam and the glaciers of Sonamarg.',
        features: ['Houseboat stays', 'Gulmarg Gondola access', 'Shikara cruises', 'Heated private transport'],
        accent: '#22C55E',
    },
    {
        id: 'honeymoon',
        icon: HeartIcon,
        title: 'Honeymoon Packages',
        description: 'Romantic escapes tailored for couples — candlelit dinners, flower-decorated Shikara rides, overwater villas, and private sunset experiences in Kashmir and international destinations.',
        features: ['Private couple excursions', 'Welcome amenities', 'Romantic dining setups', 'Floral room decoration'],
        accent: '#EC4899',
    },
    {
        id: 'hotel-accommodation',
        icon: SparklesIcon,
        title: 'Hotel & Accommodation',
        description: 'Handpicked 4-star and 5-star properties, boutique resorts, and authentic heritage houseboats. We negotiate the best rates and ensure seamless check-in for all guests.',
        features: ['4★ & 5★ verified hotels', 'Heritage houseboats', 'Alpine resort bookings', 'VIP check-in assistance'],
        accent: '#6366F1',
    },
    {
        id: 'photography-tours',
        icon: CameraIcon,
        title: 'Photography & Couple Tours',
        description: 'Dedicated photography experiences at iconic locations — Mughal Gardens, Dal Lake at sunrise, Gulmarg snow meadows, and international landmarks captured in perfect frames.',
        features: ['Expert location scouting', 'Golden hour sessions', 'Candid travel photography', 'Shareable digital moments'],
        accent: '#F97316',
    },
    {
        id: 'travel-insurance',
        icon: ShieldCheckIcon,
        title: 'Travel Protection & Support',
        description: 'Round-the-clock trip support, emergency assistance, and travel insurance coordination. Our team is reachable on WhatsApp throughout your journey.',
        features: ['24/7 WhatsApp support', 'Insurance coordination', 'Emergency assistance', 'Trip disruption help'],
        accent: '#14B8A6',
    },
];
const process = [
    { step: '01', title: 'Choose Your Package', body: 'Browse our curated Kashmir and international packages, or share your dream trip idea with us.' },
    { step: '02', title: 'WhatsApp Consultation', body: 'Chat directly with Deshin on WhatsApp. We customize the itinerary and pricing to fit your needs.' },
    { step: '03', title: 'Confirm & Relax', body: 'Once satisfied, confirm your booking and let us handle every detail from start to finish.' },
    { step: '04', title: 'Travel & Enjoy', body: 'Depart worry-free. Our team remains available throughout your journey for any support.' },
];
const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi ${siteConfig.ownerName}, I'd like to know more about your travel services.`)}`;
export const metadata = {
    title: `Our Services | ${siteConfig.name}`,
    description: 'Explore our full range of travel services — international tour packages, Kashmir valley tours, honeymoon packages, hotel bookings, and 24/7 travel support.',
};
export default function ServicesPage() {
    return (<div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0A3D62] text-white py-20 sm:py-28">
        <ResponsiveImage src="/images/hero-travel.jpg" alt="Travel services" priority className="absolute inset-0 w-full h-full object-cover opacity-20" width={1920} height={1080}/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D62]/80 via-[#0A3D62]/60 to-[#0A3D62]"/>
        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6">
            <SparklesIcon className="h-4 w-4"/>
            <span>What We Offer</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Travel Services That<br />
            <span className="text-[#D4AF37]">Go the Extra Mile</span>
          </h1>
          <p className="font-inter text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            From luxury international escapes to bespoke Kashmir valley journeys — we craft end-to-end travel experiences with personal care and attention to every detail.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <PhoneIcon className="h-5 w-5"/>
              Chat on WhatsApp
            </a>
            <Link href="/#featured-packages" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Browse Packages
              <ArrowRightIcon className="h-4 w-4"/>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Our Expertise</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0A3D62] mb-4">Everything You Need for a Perfect Trip</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-inter">Six core service pillars designed to cover every aspect of your travel experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (<article key={service.id} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-transform group-hover:scale-110" style={{ backgroundColor: `${service.accent}20` }}>
                  <service.icon className="h-6 w-6" style={{ color: service.accent }}/>
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#0A3D62] mb-3">{service.title}</h3>
                <p className="font-inter text-sm text-gray-500 leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feat) => (<li key={feat} className="flex items-center gap-2 text-sm text-gray-600 font-inter">
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0" style={{ color: service.accent }}/>
                      {feat}
                    </li>))}
                </ul>
              </article>))}
          </div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 sm:py-24 bg-[#0A3D62] text-white">
        <Container className="max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">How We Make It Happen</h2>
            <p className="text-gray-300 max-w-xl mx-auto font-inter">From first inquiry to landing back home — four simple steps to your dream trip.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (<div key={step.step} className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/10 border border-white/20">
                <div className="text-4xl font-playfair font-bold text-[#D4AF37] mb-3">{step.step}</div>
                <h3 className="font-playfair text-lg font-bold mb-2">{step.title}</h3>
                <p className="font-inter text-sm text-gray-300 leading-relaxed">{step.body}</p>
                {i < process.length - 1 && (<ArrowRightIcon className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-[#D4AF37]"/>)}
              </div>))}
          </div>
        </Container>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-2">Why Customers Choose Us</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#0A3D62] mb-6 leading-snug">
                Personal Service.<br />Local Expertise.
              </h2>
              <p className="font-inter text-gray-500 leading-relaxed mb-6">
                We are not a faceless booking engine. We are a personally-run travel consultancy where your trip is planned by a real expert with on-the-ground Kashmir knowledge and international travel experience.
              </p>
              <ul className="space-y-4">
                {[
            'Personally designed itineraries — not off-the-shelf packages',
            'Direct WhatsApp access to your travel consultant',
            'Kashmir-specialist expertise since years of local knowledge',
            'Handpicked hotels, houseboats, and transport partners',
            '100% transparent pricing — no hidden charges',
        ].map((item) => (<li key={item} className="flex items-start gap-3 font-inter text-gray-600 text-sm">
                    <StarIcon className="h-5 w-5 flex-shrink-0 text-[#D4AF37] mt-0.5"/>
                    {item}
                  </li>))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <ResponsiveImage src="/images/kashmir.jpg" alt="Kashmir valley beauty" className="w-full h-full object-cover" width={800} height={600}/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/60 to-transparent"/>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-playfair text-xl font-bold">Kashmir Valley Specialist</p>
                <p className="font-inter text-sm text-gray-200">Trusted by hundreds of happy travellers</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37] to-[#B8952A] text-white">
        <Container className="max-w-3xl text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">Ready to Plan Your Dream Trip?</h2>
          <p className="font-inter text-lg mb-8 text-yellow-100">
            Chat with {siteConfig.ownerName} directly on WhatsApp and get a free customised itinerary within hours.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-[#B8952A] font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-50 transition-colors shadow-lg">
            <PhoneIcon className="h-6 w-6"/>
            Start on WhatsApp
          </a>
        </Container>
      </section>
    </div>);
}
