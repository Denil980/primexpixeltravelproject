"use client";

import { useState } from 'react';
import { HeroExperience } from '@/components/home/HeroExperience';
import { DestinationsSection } from '@/components/home/DestinationsSection';
import { FeaturedPackages } from '@/components/home/FeaturedPackages';
import { ServicesSection } from '@/components/home/ServicesSection';
import { HomeBookingSection } from '@/components/home/HomeBookingSection';
import { packages } from '@/lib/data/packages';

export function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState(packages.find((pkg) => pkg.featured) || packages[0]);

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    window.requestAnimationFrame(() => document.getElementById('contact-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <>
      <HeroExperience />
      <DestinationsSection />
      <FeaturedPackages onBookNow={handleBookNow} />
      <ServicesSection />
      <HomeBookingSection selectedPackage={selectedPackage} />
    </>
  );
}