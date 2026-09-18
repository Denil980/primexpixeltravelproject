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
  CameraIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

/* ─── Static reviews ──────────────────────────────────────────────────── */
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

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function Stars({ rating, max = 5, size = 'sm' }) {
  const cls = size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) =>
        i < rating
          ? <StarSolid key={i} className={cls + ' text-[#c9a45c]'} />
          : <StarIcon key={i} className={cls + ' text-white/20'} />
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-[#c9a45c] to-[#e2c78b]" />
      <h2 className="font-playfair text-xl sm:text-2xl font-bold text-white">{children}</h2>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────────── */
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

  const whatsappUrl = 'https://wa.me/919496963784?text=Hi%2C%20I%20am%20interested%20in%20the%20package%3A%20' + encodeURIComponent(pkg.title);

  return (
    <div className="min-h-screen bg-[#07191d]">

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-[65vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <ResponsiveImage
          src={pkg.image}
          alt={pkg.title}
          priority
          className="absolute inset-0 h-full w-full object-cover scale-105"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07191d] via-[#07191d]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07191d]/70 via-[#07191d]/20 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-0 right-0 px-4 sm:px-8 z-10">
          <Link href="/#featured-packages" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Packages
          </Link>
        </div>

        {/* Hero text — bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a45c]/20 border border-[#c9a45c]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#e2c78b] mb-3">
              <SparklesIcon className="h-3 w-3" />
              Featured Package
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] max-w-3xl">
              {pkg.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Stars rating={5} size="lg" />
                <span className="text-white font-bold">{avgRating}</span>
                <span className="text-white/45 text-sm">({reviewCount} verified reviews)</span>
              </div>
              <span className="h-3.5 w-px bg-white/20 hidden sm:block" />
              <span className="inline-flex items-center gap-1.5 text-sm text-white/60">
                <ClockIcon className="h-4 w-4 text-[#c9a45c]" /> {pkg.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/60">
                <MapPinIcon className="h-4 w-4 text-[#c9a45c]" /> {destinationName}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. STATS BAR
      ══════════════════════════════════════════ */}
      <div className="border-b border-white/8 bg-[#0d2a2d]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center divide-x divide-white/8">
            {[
              { icon: ClockIcon,       label: 'Duration',    value: pkg.duration },
              { icon: MapPinIcon,      label: 'Destination', value: destinationName },
              { icon: UsersIcon,       label: 'Group',       value: 'Private · Min 2' },
              { icon: ShieldCheckIcon, label: 'Confirmation',value: 'Instant · 24/7 Support' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-4 first:pl-0 last:pr-0">
                <Icon className="h-4 w-4 text-[#c9a45c] shrink-0" />
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">{label}</p>
                  <p className="text-xs font-semibold text-white/80 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
            {/* Price — right side */}
            <div className="ml-auto flex items-center gap-3 px-6 py-4 last:pr-0 border-l border-white/8">
              <div>
                <p className="text-[10px] text-white/35 uppercase tracking-widest">Starting from</p>
                <p className="font-playfair text-xl font-black text-[#e2c78b] mt-0.5">{pkg.price} <span className="text-xs font-normal text-white/40">/ person</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. GALLERY — full width, below hero
      ══════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CameraIcon className="h-4 w-4 text-[#c9a45c]" />
            <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Photo Gallery</span>
          </div>
        </div>
        {/* Mosaic: 1 large left + 4 small right */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden" style={{ height: '380px' }}>
          <div className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer">
            <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          </div>
          {['object-top', 'object-right', 'object-bottom', 'object-left'].map((pos, i) => (
            <div key={i} className={'col-span-1 relative overflow-hidden group cursor-pointer' + (i === 3 ? ' relative' : '')}>
              <img src={pkg.image} alt={pkg.title + ' view ' + (i + 2)} className={'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ' + pos} />
              {i === 3 && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1.5">
                  <CameraIcon className="h-5 w-5 text-white/80" />
                  <span className="text-white text-xs font-semibold">View all photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          4. BODY — 2 columns
      ══════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px]">

          {/* ── LEFT ──────────────────────────────── */}
          <div className="space-y-14">

            {/* About */}
            <section>
              <SectionLabel>About This Package</SectionLabel>
              <p className="text-base text-white/60 leading-relaxed">{pkg.description}</p>
            </section>

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <section>
                <SectionLabel>Trip Highlights</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#0d2a2d] px-4 py-3.5">
                      <SparklesIcon className="h-4 w-4 text-[#c9a45c] mt-0.5 shrink-0" />
                      <span className="text-sm text-white/70 leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary */}
            <section>
              <SectionLabel>Day-by-Day Itinerary</SectionLabel>
              <PackageItineraryAccordion itinerary={pkg.itinerary} />
            </section>

            {/* Inclusions & Exclusions */}
            <section>
              <SectionLabel>What is Included</SectionLabel>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#c9a45c]/20 bg-[#0d2a2d] p-5 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a45c]">Included</p>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/65">
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
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/45">
                        <XCircleIcon className="h-4 w-4 text-white/20 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-1 rounded-full bg-gradient-to-b from-[#c9a45c] to-[#e2c78b]" />
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold text-white">Traveller Reviews</h2>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Stars rating={5} />
                  <span className="text-sm font-bold text-white">{avgRating}</span>
                  <span className="text-xs text-white/40">/ 5</span>
                </div>
              </div>

              {/* Rating bar */}
              <div className="mb-5 rounded-2xl border border-white/8 bg-[#0d2a2d] p-5">
                <div className="flex items-center gap-6">
                  <div className="text-center shrink-0 w-24">
                    <p className="font-playfair text-5xl font-black text-[#e2c78b]">{avgRating}</p>
                    <div className="mt-1 flex justify-center"><Stars rating={5} /></div>
                    <p className="mt-1.5 text-[10px] text-white/40">{reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 5 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2.5">
                          <span className="w-3 text-right text-[11px] text-white/40">{star}</span>
                          <StarSolid className="h-3 w-3 text-[#c9a45c] shrink-0" />
                          <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-[#c9a45c] to-[#e2c78b] transition-all" style={{ width: pct + '%' }} />
                          </div>
                          <span className="w-7 text-[11px] text-white/35">{pct}%</span>
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
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm text-[#051417] shrink-0" style={{ background: review.color }}>
                          {review.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{review.name}</p>
                          <p className="text-[11px] text-white/40">{review.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Stars rating={review.rating} />
                        <p className="mt-1 text-[11px] text-white/35">{review.date}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-white/55 leading-relaxed">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── RIGHT — sticky booking card ───────── */}
          <div className="lg:sticky lg:top-8 h-fit space-y-4">

            {/* Booking card */}
            <div className="rounded-2xl border border-white/10 bg-[#0d2a2d] overflow-hidden shadow-2xl">
              <div className="h-1 w-full bg-gradient-to-r from-[#c9a45c] to-[#e2c78b]" />
              <div className="p-6 space-y-5">

                {/* Price */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">Starting from</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-playfair text-4xl font-black text-[#e2c78b]">{pkg.price}</span>
                    <span className="text-xs text-white/35">/ per person</span>
                  </div>
                </div>

                {/* Meta details */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <ClockIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <MapPinIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
                    <span>{destinationName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <ShieldCheckIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <UsersIcon className="h-4 w-4 text-[#c9a45c] shrink-0" />
                    <span>Private group · Min 2 persons</span>
                  </div>
                </div>

                <div className="h-px bg-white/8" />

                {/* Book Now button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-xl py-4 text-sm font-bold text-[#051417] transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg shadow-[#c9a45c]/20"
                  style={{ background: 'linear-gradient(135deg, #c9a45c 0%, #f3dfab 100%)' }}
                >
                  Book Now
                </a>

                <p className="text-[10px] text-white/25 text-center">
                  No upfront payment · Flexible cancellation
                </p>
              </div>
            </div>

            {/* Accommodation & Transport card */}
            {(pkg.accommodation || pkg.transport) && (
              <div className="rounded-2xl border border-white/8 bg-[#0d2a2d] p-5 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a45c]">Stay & Transport</p>
                {pkg.accommodation && (
                  <div>
                    <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Accommodation</p>
                    <p className="text-sm text-white/60 leading-relaxed">{pkg.accommodation}</p>
                  </div>
                )}
                {pkg.transport && (
                  <div>
                    <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Transport</p>
                    <p className="text-sm text-white/60 leading-relaxed">{pkg.transport}</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          5. BOTTOM CTA STRIP
      ══════════════════════════════════════════ */}
      <div className="mt-16 border-t border-white/8 bg-[#0d2a2d]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-white">{pkg.title}</p>
            <p className="text-xs text-white/40 mt-0.5">Ready to explore? Book your spot today.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl px-8 py-3.5 text-sm font-bold text-[#051417] transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-[#c9a45c]/20"
            style={{ background: 'linear-gradient(135deg, #c9a45c, #f3dfab)' }}
          >
            Book Now
          </a>
        </div>
      </div>

    </div>
  );
}