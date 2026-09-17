"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getPackageById } from '@/lib/data/packages';
import { getDestinationById } from '@/lib/data/destinations';
import { buildWhatsAppBookingUrl } from '@/lib/whatsapp';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Button } from '@/components/ui/Button';
import { MapPinIcon, ClockIcon, UserIcon, PhoneIcon, ExclamationCircleIcon, ChatBubbleLeftRightIcon, ArrowRightIcon, ShieldCheckIcon, } from '@heroicons/react/24/outline';
export const WhatsAppBookingForm = () => {
    const searchParams = useSearchParams();
    const packageParam = searchParams.get('package') || '';
    const selectedPackage = packageParam ? getPackageById(packageParam) : undefined;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    // If no package parameter or invalid package ID, show empty state
    if (!selectedPackage) {
        return (<div className="bg-white rounded-3xl p-10 sm:p-14 border border-gray-200 shadow-sm max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-[#0A3D62]/10 text-[#0A3D62] rounded-2xl flex items-center justify-center mx-auto">
          <ExclamationCircleIcon className="h-8 w-8 text-[#D4AF37]"/>
        </div>

        <div className="space-y-2">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900">
            Please select a travel package first.
          </h2>
          <p className="font-inter text-sm text-gray-600 leading-relaxed">
            To inquire or book an itinerary, please select your preferred travel package from our curated collection.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/#featured-packages">
            <Button intent="primary" size="lg" className="bg-[#0A3D62] hover:bg-[#082e4a] text-white px-8 py-3 rounded-xl inline-flex items-center gap-2">
              <span>Explore Packages</span>
              <ArrowRightIcon className="h-4 w-4"/>
            </Button>
          </Link>
        </div>
      </div>);
    }
    const destObj = getDestinationById(selectedPackage.destinationId);
    const destName = destObj ? `${destObj.city}, ${destObj.country}` : selectedPackage.destination;
    const validate = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Please enter your full name.';
        }
        else if (name.trim().length < 2) {
            newErrors.name = 'Full name must be at least 2 characters.';
        }
        if (!phone.trim()) {
            newErrors.phone = 'Please enter your phone or WhatsApp number.';
        }
        else if (phone.trim().length < 6) {
            newErrors.phone = 'Please enter a valid phone number.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const whatsappUrl = buildWhatsAppBookingUrl({
                packageTitle: selectedPackage.title,
                destination: destName,
                duration: selectedPackage.duration,
                price: selectedPackage.price,
                customerName: name.trim(),
                customerPhone: phone.trim(),
            });
            // Open WhatsApp inquiry link
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    };
    return (<div className="grid lg:grid-cols-12 gap-10 items-start">
      {/* Left Column: Selected Package Summary Card */}
      <div className="lg:col-span-6 bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg space-y-6">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900">
          <ResponsiveImage src={selectedPackage.image} alt={selectedPackage.title} width={700} height={450} priority className="object-cover w-full h-full"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"/>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">
              <MapPinIcon className="h-4 w-4"/>
              <span>{destName}</span>
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
              {selectedPackage.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs text-gray-400 font-medium block uppercase tracking-wider">Duration</span>
              <span className="text-base font-bold text-gray-900 font-mono flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4 text-[#D4AF37]"/>
                {selectedPackage.duration}
              </span>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-medium block uppercase tracking-wider">Starting Price</span>
              <span className="text-2xl font-bold text-[#0A3D62] font-sans">{selectedPackage.price}</span>
            </div>
          </div>

          <p className="font-inter text-xs sm:text-sm text-gray-600 leading-relaxed">
            {selectedPackage.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <ShieldCheckIcon className="h-4 w-4 text-[#D4AF37] shrink-0"/>
            <span>Direct WhatsApp inquiry with guaranteed priority response from our travel team.</span>
          </div>
        </div>
      </div>

      {/* Right Column: Customer WhatsApp Inquiry Form */}
      <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-lg space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-1">
            Instant Inquiry
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Enter Your Details
          </h2>
          <p className="font-inter text-xs sm:text-sm text-gray-600">
            Provide your name and phone number to start your custom travel consultation directly on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
              <UserIcon className="h-4 w-4 text-[#D4AF37]"/>
              <span>Full Name <span className="text-rose-500">*</span></span>
            </label>
            <input id="fullName" type="text" value={name} onChange={(e) => {
            setName(e.target.value);
            if (errors.name)
                setErrors((prev) => (Object.assign(Object.assign({}, prev), { name: undefined })));
        }} placeholder="e.g. John Doe" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'fullName-error' : undefined} className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.name
            ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
            : 'border-gray-300 focus:border-[#0A3D62] focus:ring-2 focus:ring-[#0A3D62]/20'}`}/>
            {errors.name && (<p id="fullName-error" className="text-xs font-semibold text-rose-600 mt-1">
                {errors.name}
              </p>)}
          </div>

          {/* Phone / WhatsApp Input */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
              <PhoneIcon className="h-4 w-4 text-[#D4AF37]"/>
              <span>Phone / WhatsApp Number <span className="text-rose-500">*</span></span>
            </label>
            <input id="phoneNumber" type="tel" value={phone} onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone)
                setErrors((prev) => (Object.assign(Object.assign({}, prev), { phone: undefined })));
        }} placeholder="e.g. +91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phoneNumber-error' : undefined} className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all ${errors.phone
            ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
            : 'border-gray-300 focus:border-[#0A3D62] focus:ring-2 focus:ring-[#0A3D62]/20'}`}/>
            {errors.phone && (<p id="phoneNumber-error" className="text-xs font-semibold text-rose-600 mt-1">
                {errors.phone}
              </p>)}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" intent="primary" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg border-none text-base inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99]">
              <ChatBubbleLeftRightIcon className="h-5 w-5"/>
              <span>Book Now on WhatsApp</span>
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-400 text-center font-inter">
          Clicking will open WhatsApp with a pre-formatted inquiry message for this package.
        </p>
      </div>
    </div>);
};
