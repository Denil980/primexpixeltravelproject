import React, { Suspense } from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { WhatsAppBookingForm } from '@/components/booking/WhatsAppBookingForm';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
export default function BookingPage() {
    return (<div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#0A3D62] text-white py-16 sm:py-24">
        <ResponsiveImage src="/images/hero-travel.jpg" alt="Luxury travel booking and inquiry" priority className="absolute inset-0 w-full h-full object-cover opacity-20" width={1920} height={1080}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62] via-[#0A3D62]/70 to-transparent"/>

        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <PaperAirplaneIcon className="h-4 w-4"/>
            <span>Fast WhatsApp Reservation</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Book Your Custom Journey
          </h1>

          <p className="font-inter text-base sm:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
            Enter your details below to connect directly with our travel specialists on WhatsApp.
          </p>
        </Container>
      </section>

      {/* 2. BOOKING FLOW SECTION */}
      <Section className="py-12 sm:py-16">
        <Container className="max-w-6xl">
          <Suspense fallback={<div className="p-12 text-center text-gray-500 font-medium">Loading booking inquiry...</div>}>
            <WhatsAppBookingForm />
          </Suspense>
        </Container>
      </Section>
    </div>);
}
