import React from 'react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { packages } from '@/lib/data/packages';
import { getDestinationById } from '@/lib/data/destinations';
import { MapPinIcon, ArrowRightIcon, SparklesIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
export const FeaturedPackagesShowcase = () => {
    const featured = packages.filter((p) => p.featured);
    const lead = featured[0];
    const supporting = featured.slice(1, 4);
    if (!lead)
        return null;
    const leadDest = getDestinationById(lead.destinationId);
    const leadDestName = leadDest ? `${leadDest.city}, ${leadDest.country}` : lead.destination;
    return (<div className="space-y-8">
      {/* Lead Featured Package Spotlight */}
      <div className="bg-[#0A192F] text-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800 grid lg:grid-cols-12 items-center group">
        <div className="lg:col-span-7 h-72 sm:h-96 lg:h-[480px] relative overflow-hidden bg-gray-900">
          <ResponsiveImage src={lead.image} alt={lead.title} width={800} height={600} priority className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent hidden lg:block"/>
          <div className="absolute top-4 left-4 bg-[#D4AF37] text-black font-semibold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <SparklesIcon className="h-4 w-4"/>
            <span>Signature Spotlight</span>
          </div>
        </div>

        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold uppercase tracking-widest mb-3">
              <MapPinIcon className="h-4 w-4"/>
              <span>{leadDestName}</span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1 font-mono text-gray-300">
                <ClockIcon className="h-3.5 w-3.5 text-[#D4AF37]"/>
                {lead.duration}
              </span>
            </div>

            <h3 className="font-playfair text-3xl sm:text-4xl font-bold mb-4 text-white leading-tight">
              {lead.title}
            </h3>

            <p className="font-inter text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
              {lead.description}
            </p>

            <ul className="space-y-2 mb-8">
              {lead.highlights.slice(0, 3).map((h, i) => (<li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                  <CheckCircleIcon className="h-4 w-4 text-[#D4AF37] shrink-0"/>
                  <span>{h}</span>
                </li>))}
            </ul>
          </div>

          <div className="flex items-center justify-between border-t border-gray-800 pt-6">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Starting From</span>
              <span className="text-3xl font-bold text-[#D4AF37] font-sans">{lead.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/package/${lead.id}`} className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E2C876] text-black font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
                <span>View Details</span>
                <ArrowRightIcon className="h-4 w-4"/>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Featured Packages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {supporting.map((pkg) => {
            const destObj = getDestinationById(pkg.destinationId);
            const destName = destObj ? `${destObj.city}, ${destObj.country}` : pkg.destination;
            return (<div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                <ResponsiveImage src={pkg.image} alt={pkg.title} width={500} height={350} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3 inline"/>
                    {destName}
                  </span>
                  <h4 className="font-playfair text-lg font-bold line-clamp-1">{pkg.title}</h4>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white font-mono text-xs px-2.5 py-1 rounded border border-white/20">
                  {pkg.duration}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <p className="font-inter text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{pkg.description}</p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium uppercase">Starting From</span>
                    <span className="text-xl font-bold text-[#0A3D62] font-sans">{pkg.price}</span>
                  </div>
                  <Link href={`/package/${pkg.id}`} className="text-xs font-semibold text-[#0A3D62] hover:text-[#D4AF37] transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] rounded px-1">
                    <span>View Details</span>
                    <ArrowRightIcon className="h-3.5 w-3.5"/>
                  </Link>
                </div>
              </div>
            </div>);
        })}
      </div>
    </div>);
};
