import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { PackageItineraryAccordion } from '@/components/packages/PackageItineraryAccordion';
import { BookNowButton } from '@/components/home/BookNowButton';
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
    color: '#b8860b',
    text: 'Absolutely breathtaking experience. Every detail was taken care of — the houseboat stay on Dal Lake was magical and the Gulmarg gondola views left us speechless. PrimexPixel made our dream trip effortless.',
  },
  {
    id: 2,
    name: 'Rahul & Sneha Sharma',
    location: 'Mumbai, India',
    rating: 5,
    date: 'July 2025',
    avatar: 'RS',
    color: '#0f2c3f',
    text: 'We booked the honeymoon package and it exceeded every expectation. The flower-decorated shikara ride and candlelit dinners were unforgettable. Highly recommend to all couples!',
  },
  {
    id: 3,
    name: 'Arjun Nair',
    location: 'Kochi, India',
    rating: 4,
    date: 'June 2025',
    avatar: 'AN',
    color: '#0284c7',
    text: 'Great itinerary, punctual drivers, and very helpful guides throughout. The Mughal Gardens were stunning. Minor suggestion: the check-in process could be smoother, but overall a 9/10 trip.',
  },
];

function Stars({ rating, max = 5, size = 'sm' }) {
  const cls = size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) =>
        i < rating
          ? <StarSolid key={i} className={cls + ' text-[#b8860b]'} />
          : <StarIcon key={i} className={cls + ' text-slate-300'} />
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-[#b8860b] to-[#d4af37]" />
      <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#0f2c3f]">{children}</h2>
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
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] max-h-[640px] overflow-hidden">
        <ResponsiveImage
          src={pkg.image}
          alt={pkg.title}
          priority
          className="absolute inset-0 h-full w-full object-cover scale-105"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2c3f] via-[#0f2c3f]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2c3f]/70 via-[#0f2c3f]/20 to-transparent" />

        <div className="absolute top-6 left-0 right-0 px-4 sm:px-8 z-10">
          <Link href="/#featured-packages" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Packages
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#fef08a] mb-3 backdrop-blur-md">
              <SparklesIcon className="h-3 w-3 text-[#fef08a]" />
              Featured Package
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] max-w-3xl">
              {pkg.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Stars rating={5} size="lg" />
                <span className="text-white font-bold">{avgRating}</span>
                <span className="text-white/60 text-sm">({reviewCount} verified reviews)</span>
              </div>
              <span className="h-3.5 w-px bg-white/20 hidden sm:block" />
              <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
                <ClockIcon className="h-4 w-4 text-[#fef08a]" /> {pkg.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
                <MapPinIcon className="h-4 w-4 text-[#fef08a]" /> {destinationName}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center divide-x divide-slate-200">
            {[
              { icon: ClockIcon,       label: 'Duration',    value: pkg.duration },
              { icon: MapPinIcon,      label: 'Destination', value: destinationName },
              { icon: UsersIcon,       label: 'Group',       value: 'Private · Min 2' },
              { icon: ShieldCheckIcon, label: 'Confirmation',value: 'Instant · 24/7 Support' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-4 first:pl-0 last:pr-0">
                <Icon className="h-4 w-4 text-[#b8860b] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{label}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-3 px-6 py-4 last:pr-0 border-l border-slate-200">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Starting from</p>
                <p className="font-playfair text-xl font-black text-[#b8860b] mt-0.5">{pkg.price} <span className="text-xs font-normal text-slate-500">/ person</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CameraIcon className="h-4 w-4 text-[#b8860b]" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Photo Gallery</span>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden shadow-sm" style={{ height: '380px' }}>
          <div className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer">
            <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
          </div>
          {['object-top', 'object-right', 'object-bottom', 'object-left'].map((pos, i) => (
            <div key={i} className={'col-span-1 relative overflow-hidden group cursor-pointer' + (i === 3 ? ' relative' : '')}>
              <img src={pkg.image} alt={pkg.title + ' view ' + (i + 2)} className={'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ' + pos} />
              {i === 3 && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1.5">
                  <CameraIcon className="h-5 w-5 text-white" />
                  <span className="text-white text-xs font-semibold">View all photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Body Top — 2 columns */}
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-0 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px]">

          {/* Left: About + Highlights */}
          <div className="space-y-10">
            <section>
              <SectionLabel>About This Package</SectionLabel>
              <p className="text-base text-slate-600 leading-relaxed font-sans">{pkg.description}</p>
            </section>

            {pkg.highlights && pkg.highlights.length > 0 && (
              <section>
                <SectionLabel>Trip Highlights</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <SparklesIcon className="h-4 w-4 text-[#b8860b] mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-700 leading-snug font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Booking Card */}
          <div className="lg:sticky lg:top-8 h-fit space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#b8860b] to-[#d4af37]" />
              <div className="p-6 space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Starting from</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-playfair text-4xl font-black text-[#b8860b]">{pkg.price}</span>
                    <span className="text-xs text-slate-500">/ per person</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <ClockIcon className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <MapPinIcon className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>{destinationName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <ShieldCheckIcon className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <UsersIcon className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>Private group · Min 2 persons</span>
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                <BookNowButton
                  pkg={pkg}
                  className="block w-full text-center rounded-xl py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#1e4d6b] active:scale-95 shadow-md bg-[#0f2c3f]"
                >
                  Book Now
                </BookNowButton>
                <p className="text-[10px] text-slate-400 text-center">
                  No upfront payment · Flexible cancellation
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full width below — Itinerary, Inclusions, Reviews */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 space-y-14">

        <section>
          <SectionLabel>Day-by-Day Itinerary</SectionLabel>
          <PackageItineraryAccordion itinerary={pkg.itinerary} />
        </section>

        <section>
          <SectionLabel>What is Included</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#b8860b]">✓ Included</p>
              <ul className="space-y-2.5">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircleIcon className="h-4 w-4 text-[#b8860b] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">✗ Not Included</p>
              <ul className="space-y-2.5">
                {pkg.exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-500">
                    <XCircleIcon className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="h-5 w-1 rounded-full bg-gradient-to-b from-[#b8860b] to-[#d4af37]" />
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#0f2c3f]">Traveller Reviews</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Stars rating={5} />
              <span className="text-sm font-bold text-[#0f2c3f]">{avgRating}</span>
              <span className="text-xs text-slate-400">/ 5</span>
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="text-center shrink-0 w-24">
                <p className="font-playfair text-5xl font-black text-[#b8860b]">{avgRating}</p>
                <div className="mt-1 flex justify-center"><Stars rating={5} /></div>
                <p className="mt-1.5 text-[10px] text-slate-400 font-medium">{reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 5 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2.5">
                      <span className="w-3 text-right text-[11px] text-slate-400 font-mono">{star}</span>
                      <StarSolid className="h-3 w-3 text-[#b8860b] shrink-0" />
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#b8860b] to-[#d4af37]" style={{ width: pct + '%' }} />
                      </div>
                      <span className="w-7 text-[11px] text-slate-400 font-mono">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0" style={{ background: review.color }}>
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f2c3f] leading-tight">{review.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{review.location}</p>
                    </div>
                  </div>
                </div>
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-sans">"{review.text}"</p>
                <p className="mt-3 text-[10px] text-slate-400">{review.date}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Bottom CTA */}
      <div className="mt-16 border-t border-slate-200 bg-[#0f2c3f] text-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-white">{pkg.title}</p>
            <p className="text-xs text-white/60 mt-0.5">Ready to explore? Book your spot today.</p>
          </div>
          <BookNowButton
            pkg={pkg}
            className="shrink-0 rounded-xl px-8 py-3.5 text-sm font-bold text-[#0f2c3f] transition-all hover:brightness-110 active:scale-95 shadow-md bg-gradient-to-r from-[#fef08a] to-[#d4af37]"
          >
            Book Now
          </BookNowButton>
        </div>
      </div>

    </div>
  );
}