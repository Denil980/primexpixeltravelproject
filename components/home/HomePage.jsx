"use client";

import { useState } from 'react';
import { HeroExperience } from '@/components/home/HeroExperience';
import { HomeAboutSection } from '@/components/home/HomeAboutSection';
import { DestinationsSection } from '@/components/home/DestinationsSection';
import { FeaturedPackages } from '@/components/home/FeaturedPackages';
import { ServicesSection } from '@/components/home/ServicesSection';
import { HomeBookingSection } from '@/components/home/HomeBookingSection';
import { BookingModal } from '@/components/home/BookingModal';
import { packages } from '@/lib/data/packages';

export function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState(packages.find((pkg) => pkg.featured) || packages[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  };

  return (
    <>
      <HeroExperience onBookNow={() => setModalOpen(true)} />
      <HomeAboutSection />
      <DestinationsSection />
      <FeaturedPackages onBookNow={handleBookNow} />
      <ServicesSection />
      <HomeBookingSection />

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </>
  );
}