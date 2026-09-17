import React from 'react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Card } from '@/components/ui/Card';
import { getDestinationById } from '@/lib/data/destinations';
import { CheckCircleIcon, ClockIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
export const PackageCard = ({ pkg, priority = false }) => {
    const destinationObj = getDestinationById(pkg.destinationId);
    const destinationName = destinationObj
        ? `${destinationObj.city}, ${destinationObj.country}`
        : pkg.destination;
    const detailUrl = `/package/${pkg.id}`;
    const bookingUrl = `/booking?package=${pkg.id}`;
    return (<Card className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white border border-gray-200/80 group rounded-2xl">
      {/* Image Container */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-900">
        <ResponsiveImage src={pkg.image} alt={pkg.title} width={600} height={400} priority={priority} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

        {/* Destination Pill */}
        <div className="absolute top-3 left-3 bg-[#0A3D62]/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-white/10">
          <MapPinIcon className="h-3.5 w-3.5 text-[#D4AF37]"/>
          <span>{destinationName}</span>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/20">
          <ClockIcon className="h-3.5 w-3.5 text-[#D4AF37]"/>
          <span>{pkg.duration}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-900 mb-1.5 group-hover:text-[#0A3D62] transition-colors leading-snug line-clamp-1">
            {pkg.title}
          </h3>

          <p className="font-inter text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
            {pkg.description}
          </p>

          {/* Highlights List */}
          <ul className="space-y-1.5 mb-4">
            {pkg.highlights.slice(0, 2).map((highlight, index) => (<li key={index} className="flex items-start gap-1.5 text-xs text-gray-700">
                <CheckCircleIcon className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5"/>
                <span className="line-clamp-1">{highlight}</span>
              </li>))}
          </ul>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block">Starting From</span>
            <div className="text-xl font-bold text-[#0A3D62] font-sans">
              {pkg.price}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href={detailUrl} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-2.5 rounded-xl text-xs text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] inline-flex items-center justify-center gap-1">
              <span>Details</span>
              <ArrowRightIcon className="h-3 w-3"/>
            </Link>
            <Link href={bookingUrl} className="w-full bg-[#0A3D62] hover:bg-[#082e4a] text-white font-semibold py-2 px-2.5 rounded-xl text-xs text-center transition-all shadow-sm hover:shadow active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D62] inline-flex items-center justify-center">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </Card>);
};
