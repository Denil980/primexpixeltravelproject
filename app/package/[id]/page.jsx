import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { PackageBookingCard } from '@/components/packages/PackageBookingCard';
import { PackageItineraryAccordion } from '@/components/packages/PackageItineraryAccordion';
import { getDestinationById } from '@/lib/data/destinations';
import { packages } from '@/lib/data/packages';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default async function PackagePage({ params }) {
    const { id } = await params;
    const pkg = packages.find((item) => item.id === id);

    if (!pkg) {
        notFound();
    }

    const destination = getDestinationById(pkg.destinationId);
    const destinationName = destination ? `${destination.city}, ${destination.country}` : pkg.destination;

    return (<div className="min-h-screen bg-[#F8FAFC]">
      <section className="relative overflow-hidden bg-[#0A3D62] py-20 text-white sm:py-28">
        <ResponsiveImage src={pkg.image} alt={pkg.title} priority className="absolute inset-0 h-full w-full object-cover opacity-35" width={1920} height={1080}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62] via-[#0A3D62]/65 to-transparent"/>
        <Container className="relative z-10 max-w-5xl">
          <Link href={`/destinations/${pkg.destinationId}`} className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"><ArrowLeftIcon className="h-4 w-4"/> Back to {destinationName}</Link>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">{destinationName} · {pkg.duration}</p>
          <h1 className="max-w-3xl font-playfair text-4xl font-bold sm:text-6xl">{pkg.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">{pkg.description}</p>
        </Container>
      </section>

      <Section className="py-12 sm:py-16">
        <Container className="grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-10">
            <div><h2 className="mb-5 font-playfair text-3xl font-bold text-gray-900">What is included</h2><ul className="grid gap-3 sm:grid-cols-2">{pkg.inclusions.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircleIcon className="h-5 w-5 shrink-0 text-[#D4AF37]"/>{item}</li>)}</ul></div>
            <div><h2 className="mb-5 font-playfair text-3xl font-bold text-gray-900">Your itinerary</h2><PackageItineraryAccordion itinerary={pkg.itinerary}/></div>
          </div>
          <PackageBookingCard pkg={pkg} destinationName={destinationName}/>
        </Container>
      </Section>
    </div>);
}