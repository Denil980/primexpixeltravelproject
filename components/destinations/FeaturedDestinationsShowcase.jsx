import React from 'react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { destinations, getPackageCountForDestination } from '@/lib/data/destinations';
import { MapPinIcon, ArrowRightIcon, SparklesIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
export const FeaturedDestinationsShowcase = () => {
    const featured = destinations.filter((d) => d.featured);
    const lead = featured[0]; // Lead featured destination (e.g. Dubai)
    const supporting = featured.slice(1, 4); // Supporting featured destinations
    if (!lead)
        return null;
    const leadPackageCount = getPackageCountForDestination(lead.id);
    return (<div className="space-y-8">
      {/* Lead Featured Destination Banner */}
      <div className="bg-[#0A192F] text-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800 grid lg:grid-cols-12 items-center group">
        <div className="lg:col-span-7 h-72 sm:h-96 lg:h-[460px] relative overflow-hidden bg-gray-900">
          <ResponsiveImage src={lead.image} alt={`${lead.city}, ${lead.country}`} width={800} height={600} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent hidden lg:block"/>
          <div className="absolute top-4 left-4 bg-[#D4AF37] text-black font-semibold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <SparklesIcon className="h-4 w-4"/>
            <span>Featured Spotlight</span>
          </div>
        </div>

        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold uppercase tracking-widest mb-2">
              <MapPinIcon className="h-4 w-4"/>
              <span>{lead.country}</span>
              {lead.code ? <span className="font-mono text-gray-400">({lead.code})</span> : null}
            </div>

            <h3 className="font-playfair text-3xl sm:text-4xl font-bold mb-4 text-white">
              {lead.city}
            </h3>

            <p className="font-inter text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
              {lead.description}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 rounded-xl text-xs sm:text-sm text-gray-200 font-medium border border-white/15 mb-8">
              <BriefcaseIcon className="h-4 w-4 text-[#D4AF37]"/>
              <span>{leadPackageCount} Hand-crafted {leadPackageCount === 1 ? 'Package' : 'Packages'} Available</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-800 pt-6">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Starting From</span>
              <span className="text-2xl font-bold text-[#D4AF37] font-sans">{lead.startingPrice}</span>
            </div>

            <Link href={`/destinations/${lead.id}`} className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#E2C876] text-black font-semibold text-sm py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
              <span>Explore {lead.city}</span>
              <ArrowRightIcon className="h-4 w-4"/>
            </Link>
          </div>
        </div>
      </div>

      {/* Supporting Featured Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {supporting.map((dest) => {
            const count = getPackageCountForDestination(dest.id);
            return (<div key={dest.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                <ResponsiveImage src={dest.image} alt={`${dest.city}, ${dest.country}`} width={500} height={350} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block">{dest.country}</span>
                  <h4 className="font-playfair text-xl font-bold">{dest.city}</h4>
                </div>
                {dest.code ? (<div className="absolute top-3 right-3 bg-black/50 text-white font-mono text-xs px-2 py-0.5 rounded border border-white/20">
                    {dest.code}
                  </div>) : null}
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <p className="font-inter text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{dest.description}</p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <div>
                    <span className="text-xs text-gray-400 block font-mono">{count} {count === 1 ? 'Package' : 'Packages'}</span>
                    <span className="text-lg font-bold text-[#0A3D62] font-sans">{dest.startingPrice}</span>
                  </div>
                  <Link href={`/destinations/${dest.id}`} className="text-xs font-semibold text-[#0A3D62] hover:text-[#D4AF37] transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] rounded px-1">
                    <span>View</span>
                    <ArrowRightIcon className="h-3.5 w-3.5"/>
                  </Link>
                </div>
              </div>
            </div>);
        })}
      </div>
    </div>);
};
