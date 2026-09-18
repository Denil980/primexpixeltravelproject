import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { PackageItineraryAccordion } from '@/components/packages/PackageItineraryAccordion';
import { getDestinationById } from '@/lib/data/destinations';
import { packages } from '@/lib/data/packages';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  SparklesIcon,
  ShieldCheckIcon,
  PhoneIcon,
  CameraIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const REVIEWS = [
  {
    id: 1,
    name: 'Priya Menon',
    location: 'Bengaluru, India',
    rating: 5,
    date: 'August 2025',
    avatar: 'PM',
    color: '#c9a45c',
    text: 'Absolutely breathtaking experience. Every detail was taken care of — the houseboat stay on Dal Lake was magical and the Gulmarg gondola views left us speechless. PrimexPixel made our dream trip effortless.',
  },
  {
    id: 2,
    name: 'Rahul & Sneha Sharma',
    location: 'Mumbai, India',
    rating: 5,
    date: 'July 2025',
    avatar: 'RS',
    color: '#5c9ec9',
    text: 'We booked the honeymoon package and it exceeded every expectation. The flower-decorated shikara ride and candlelit dinners were unforgettable. Highly recommend to all couples!',
  },
  {
    id: 3,
    name: 'Arjun Nair',
    location: 'Kochi, India',
    rating: 4,
    date: 'June 2025',
    avatar: 'AN',
    color: '#5cc9a4',
    text: 'Great itinerary, punctual drivers, and very helpful guides throughout. The Mughal Gardens were stunning. Minor suggestion: the check-in process could be smoother, but overall a 9/10 trip.',
  },
];

function Stars({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) =>
        i < rating
          ? <StarSolid key={i} className="h-4 w-4 text-[#c9a45c]" />
          : <StarIcon key={i} className="h-4 w-4 text-white/20" />
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-[#c9a45c] to-[#e2c78b]" />
      <h2 className="font-playfair text-xl sm:text-2xl font-bold text-white">{children}</h2>
    </div>
  );
}

function BookingCard({ pkg, destinationName }) {
  return (
    <div className="lg:sticky lg:top-28 space-y-4">
      <div className="rounded-2xl border border-white/10 bg-[#0d2a2d] shadow-2xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-[#c9a45c] to-[#e2c78b]" />
        <div className="p-6 space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Starting from</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-playfair text-4xl font-black text-[#e2c78b]">{pkg.price}</span>
              <span className="text-xs text-white/40 font-medium">/ per person</span>
            </div>
          </div>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-3 text-white/70">
              <ClockIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
              <span>{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <MapPinIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
              <span>{destinationName}</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <ShieldCheckIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
              <span>Instant confirmation · 24/7 support</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <UsersIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
              <span>Private group · Min 2 persons</span>
            </div>
          </div>
          <div className="border-t border-white/8" />
          <div className="space-y-3">
            <a
              href={"https://wa.me/919496963784?text=Hi%2C%20I%20am%20interested%20in%20the%20package%3A%20" + encodeURIComponent(pkg.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-xl py-3.5 text-sm font-bold text-[#051417] transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #c9a45c, #f3dfab)' }}
            >
              Book Now via WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-semibold text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <PhoneIcon className="h-4 w-4 text-[#c9a45c]" />
              Talk to a Travel Specialist
            </Link>
          </div>
          <p className="text-[10px] text-white/30 text-center leading-relaxed">
            No upfront payment required. Flexible cancellation policy.
          </p>
        </div>
      </div>
      {(pkg.accommodation || pkg.transport) && (
        <div className="rounded-2xl border border-white/10 bg-[#0d2a2d] p-5 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a45c]">Stay & Travel</p>
          {pkg.accommodation && (
            <div>
              <span className="text-white/40 text-xs block mb-0.5">Accommodation</span>
              <p className="text-sm text-white/65 leading-relaxed">{pkg.accommodation}</p>
            </div>
          )}
          {pkg.transport && (
            <div>
              <span className="text-white/40 text-xs block mb-0.5">Transport</span>
              <p className="text-sm text-white/65 leading-relaxed">{pkg.transport}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default async function PackagePage({ params }) {
  const { id } = await params;
  const pkg = packages.find((item) => item.id === id);
  if (!pkg) notFound();

  const destination = getDestinationById(pkg.destinationId);
  const destinationName = destination
    ? destination.city + ', ' + destination.country
    : pkg.destination;

  const avgRating = 4.8;
  const reviewCount = REVIEWS.length;

  return (
    <div className="min-h-screen bg-[#07191d]">

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[440px] max-h-[640px] overflow-hidden">
        <ResponsiveImage
          src={pkg.image}
          alt={pkg.title}
          priority
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07191d] via-[#07191d]/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07191d]/60 via-transparent to-transparent" />

        <div className="absolute top-6 left-0 right-0 px-4 sm:px-8">
          <Link
            href="/#featured-packages"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Packages
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 sm:px-8 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a45c]/20 border border-[#c9a45c]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#e2c78b]">
                <SparklesIcon className="h-3 w-3" />
                Featured Package
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/40 border border-white/15 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-md">
                <ClockIcon className="h-3 w-3 text-[#c9a45c]" />
                {pkg.duration}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/40 border border-white/15 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-md">
                <MapPinIcon className="h-3 w-3 text-[#c9a45c]" />
                {destinationName}
              </span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-5xl font-black text-white leading-tight max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {pkg.title}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <Stars rating={5} />
              <span className="text-sm font-bold text-white">{avgRating}</span>
              <span className="text-sm text-white/50">({reviewCount} reviews)</span>
              <span className="h-3.5 w-px bg-white/20" />
              <span className="text-sm text-white/50">Verified bookings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

          {/* Left column */}
          <div className="space-y-12">

            {/* About */}
            <div>
              <SectionLabel>About This Package</SectionLabel>
              <p className="mt-3 text-base text-white/65 leading-relaxed font-inter">{pkg.description}</p>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>Photo Gallery</SectionLabel>
                <span className="flex items-center gap-1.5 text-xs text-white/40">
                  <CameraIcon className="h-3.5 w-3.5" />
                  Trip highlights
                </span>
              </div>
              <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden" style={{ height: '360px' }}>
                <div className="col-span-2 row-span-2 relative overflow-hidden group">
                  <img src={pkg.image} alt={pkg.title + ' main'} className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="col-span-1 relative overflow-hidden group">
                  <img src={pkg.image} alt={pkg.title + ' 2'} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="col-span-1 relative overflow-hidden group">
                  <img src={pkg.image} alt={pkg.title + ' 3'} className="h-full w-full object-cover object-right transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="col-span-1 relative overflow-hidden group">
                  <img src={pkg.image} alt={pkg.title + ' 4'} className="h-full w-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="col-span-1 relative overflow-hidden group cursor-pointer">
                  <img src={pkg.image} alt={pkg.title + ' 5'} className="h-full w-full object-cover object-left-bottom transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1.5">
                    <CameraIcon className="h-5 w-5 text-white/80" />
                    <span className="text-white text-xs font-semibold">View all</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div>
                <SectionLabel>Trip Highlights</SectionLabel>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#0d2a2d] px-4 py-3">
                      <SparklesIcon className="h-4 w-4 text-[#c9a45c] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/75 leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            <div>
              <SectionLabel>Day-by-Day Itinerary</SectionLabel>
              <div className="mt-4">
                <PackageItineraryAccordion itinerary={pkg.itinerary} />
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div>
              <SectionLabel>What is Included</SectionLabel>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#c9a45c]/20 bg-[#0d2a2d] p-5 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a45c]">Included</p>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                        <CheckCircleIcon className="h-4 w-4 text-[#c9a45c] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/8 bg-[#0d2a2d] p-5 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Not Included</p>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                        <XCircleIcon className="h-4 w-4 text-white/25 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <SectionLabel>Traveller Reviews</SectionLabel>
                <div className="flex items-center gap-2">
                  <Stars rating={5} />
                  <span className="text-sm font-bold text-white">{avgRating}</span>
                  <span className="text-xs text-white/40">/ 5</span>
                </div>
              </div>

              {/* Rating bar summary */}
              <div className="mb-6 rounded-2xl border border-white/8 bg-[#0d2a2d] p-5">
                <div className="flex items-center gap-6">
                  <div className="text-center shrink-0">
                    <p className="font-playfair text-5xl font-black text-[#e2c78b]">{avgRating}</p>
                    <div className="mt-1 flex justify-center"><Stars rating={5} /></div>
                    <p className="mt-1 text-[10px] text-white/40">{reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 5 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="w-3 text-right text-[10px] text-white/40">{star}</span>
                          <StarSolid className="h-3 w-3 text-[#c9a45c] shrink-0" />
                          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-[#c9a45c] to-[#e2c78b]" style={{ width: pct + '%' }} />
                          </div>
                          <span className="w-6 text-[10px] text-white/40">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Review cards */}
              <div className="space-y-4">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-white/8 bg-[#0d2a2d] p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm text-[#051417] shrink-0" style={{ background: review.color }}>
                          {review.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{review.name}</p>
                          <p className="text-[11px] text-white/40">{review.location}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Stars rating={review.rating} />
                        <p className="mt-1 text-[10px] text-white/35">{review.date}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-white/60 leading-relaxed font-inter">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right column */}
          <BookingCard pkg={pkg} destinationName={destinationName} />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-white/8 bg-[#0d2a2d] mt-10">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Ready to experience this journey?</p>
            <p className="text-xs text-white/40 mt-0.5">Speak to a specialist or book directly via WhatsApp.</p>
          </div>
          <a
            href={"https://wa.me/919496963784?text=Hi%2C%20I%20am%20interested%20in%20the%20package%3A%20" + encodeURIComponent(pkg.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold text-[#051417] transition-all hover:brightness-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #c9a45c, #f3dfab)' }}
          >
            Book on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}