import React from 'react';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SparklesIcon } from '@heroicons/react/24/outline';
export const PackageHero = () => {
    return (<section className="relative overflow-hidden bg-[#0A3D62] text-white py-24 sm:py-32">
      <ResponsiveImage src="/images/hero-travel.jpg" alt="Hand-crafted travel packages landscape" priority className="absolute inset-0 w-full h-full object-cover opacity-25" width={1920} height={1080}/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62] via-[#0A3D62]/65 to-transparent"/>

      <Container className="relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6">
          <SparklesIcon className="h-4 w-4"/>
          <span>Bespoke Travel Collection</span>
        </div>

        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
          Explore Our Travel Packages
        </h1>

        <p className="font-inter text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover hand-crafted itineraries designed for unforgettable journeys across Kashmir and iconic global destinations.
        </p>
      </Container>
    </section>);
};
