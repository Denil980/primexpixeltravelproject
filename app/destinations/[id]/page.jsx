import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Button } from '@/components/ui/Button';
import { PackageCard } from '@/components/packages/PackageCard';
import { getDestinationById, getPackagesForDestination } from '@/lib/data/destinations';
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default async function DestinationPage({ params }) {
    const { id } = await params;
    const destination = getDestinationById(id);

    if (!destination) {
        notFound();
    }

    const destinationPackages = getPackagesForDestination(destination.id);

    return (<div className="min-h-screen bg-[#F8FAFC]">
      <section className="relative overflow-hidden bg-[#0A3D62] py-24 text-white sm:py-32">
        <ResponsiveImage src={destination.image} alt={`${destination.city}, ${destination.country}`} priority className="absolute inset-0 h-full w-full object-cover opacity-35" width={1920} height={1080}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62] via-[#0A3D62]/60 to-transparent"/>
        <Container className="relative z-10 max-w-5xl">
          <Link href="/#destinations" className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white">
            <ArrowLeftIcon className="h-4 w-4"/> Back to all destinations
          </Link>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
            <MapPinIcon className="h-4 w-4"/> {destination.country}
          </p>
          <h1 className="font-playfair text-5xl font-bold sm:text-7xl">{destination.city}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">{destination.description}</p>
        </Container>
      </section>

      <Section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Curated itineraries</p>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 sm:text-4xl">Packages for {destination.city}</h2>
            </div>
            <Link href="/#contact">
              <Button intent="secondary" className="border border-[#0A3D62] text-[#0A3D62]">Plan a custom journey <ArrowRightIcon className="ml-2 h-4 w-4"/></Button>
            </Link>
          </div>
          {destinationPackages.length > 0 ? (<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{destinationPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg}/>)}</div>) : (<div className="rounded-2xl border border-gray-200 bg-white p-8 text-center"><p className="text-gray-600">We are currently preparing packages for this destination.</p><Link href="/#contact" className="mt-4 inline-flex font-semibold text-[#0A3D62]">Speak with a specialist <ArrowRightIcon className="ml-1 h-4 w-4"/></Link></div>)}
        </Container>
      </Section>
    </div>);
}