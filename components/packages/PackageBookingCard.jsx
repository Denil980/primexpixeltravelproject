import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ClockIcon, MapPinIcon, ShieldCheckIcon, PhoneIcon } from '@heroicons/react/24/outline';
export const PackageBookingCard = ({ pkg, destinationName }) => {
    const bookingUrl = `/booking?package=${pkg.id}`;
    return (<div className="space-y-6 lg:sticky lg:top-28">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="border-b border-gray-100 pb-6">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1">
            Total Starting Price
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#0A3D62] font-sans">{pkg.price}</span>
            <span className="text-xs text-gray-500 font-medium">/ per person</span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700 font-medium">
          <div className="flex items-center gap-3">
            <ClockIcon className="h-5 w-5 text-[#D4AF37] shrink-0"/>
            <span>Duration: <strong>{pkg.duration}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 text-[#D4AF37] shrink-0"/>
            <span>Destination: <strong>{destinationName}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-5 w-5 text-[#D4AF37] shrink-0"/>
            <span>Instant Confirmation & 24/7 Support</span>
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <Link href={bookingUrl} className="block w-full">
            <Button intent="primary" size="lg" className="w-full bg-[#0A3D62] hover:bg-[#082e4a] text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all text-base">
              Book Now
            </Button>
          </Link>

          <Link href="/#contact" className="block w-full text-center">
            <Button intent="secondary" size="md" className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors text-sm inline-flex items-center justify-center gap-2">
              <PhoneIcon className="h-4 w-4 text-[#D4AF37]"/>
              <span>Inquire Specialist</span>
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center font-inter">
          No credit card required upfront. Flexible cancellation available.
        </p>
      </div>
    </div>);
};
