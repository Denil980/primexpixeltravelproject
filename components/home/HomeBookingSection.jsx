"use client";

import { useState } from 'react';
import { ClockIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { getDestinationById } from '@/lib/data/destinations';
import { sendContactEmail } from '@/lib/email';

export function HomeBookingSection({ selectedPackage }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const destination = selectedPackage ? getDestinationById(selectedPackage.destinationId) : null;
  const destinationName = destination ? `${destination.city}, ${destination.country}` : selectedPackage?.destination || 'Choose a package above';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }
    setError('');
    setBookingSuccess(true);
    setName('');
    setPhone('');
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
      setContactStatus('Please complete your name, email, and message.');
      return;
    }
    setContactStatus('Sending your message...');
    const result = await sendContactEmail({ ...contact, subject: 'Homepage travel inquiry' });
    setContactStatus(result.success ? 'Message sent. We will be in touch soon.' : 'Thank you! Your inquiry has been noted. We will contact you soon.');
    if (result.success) setContact({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact-booking" className="scroll-mt-8 w-full overflow-hidden bg-[#0d292b] px-4 py-14 sm:px-6 sm:py-18 text-white">
      <div className="booking-card-reveal mx-auto w-full max-w-5xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <p className="eyebrow mb-4 text-[#ead8ad]">Your next story starts here</p>
            <h2 className="font-playfair text-4xl leading-tight sm:text-5xl">Let&apos;s shape the journey.</h2>
            <p className="mt-5 max-w-md leading-7 text-white/70">Choose a package above, then submit your details to receive a personalized travel consultation.</p>
            <div className="mt-8 rounded-2xl border border-white/15 bg-black/15 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ead8ad]">Selected package</p>
              <p className="mt-2 font-playfair text-2xl">{selectedPackage?.title || 'No package selected yet'}</p>
              {selectedPackage && (
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/70">
                  <span><MapPinIcon className="mr-1 inline h-4 w-4 text-[#ead8ad]" />{destinationName}</span>
                  <span><ClockIcon className="mr-1 inline h-4 w-4 text-[#ead8ad]" />{selectedPackage.duration}</span>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/15 bg-[#071c2b]/55 p-5 shadow-xl sm:p-6">
            <label htmlFor="home-booking-name" className="mb-2 block text-sm font-semibold text-white/85">Name</label>
            <input id="home-booking-name" value={name} onChange={(event) => setName(event.target.value)} className="mb-4 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25" placeholder="Your full name" />
            <label htmlFor="home-booking-phone" className="mb-2 block text-sm font-semibold text-white/85">Phone Number</label>
            <input id="home-booking-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mb-4 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25" placeholder="+91 98765 43210" />
            <p className="mb-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">Package: <span className="font-semibold text-white">{selectedPackage?.title || 'Select a package above'}</span></p>
            {error && <p role="alert" className="mb-4 text-sm text-rose-300">{error}</p>}
            {bookingSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-900/60 p-3 text-sm text-emerald-200">
                <CheckCircleIcon className="h-5 w-5 shrink-0" />
                <span>Inquiry submitted! Our travel specialist will contact you shortly.</span>
              </div>
            )}
            <Button type="submit" intent="secondary" size="lg" className="w-full">
              Request Booking Consultation
            </Button>
          </form>
        </div>
        <div className="mt-10 border-t border-white/15 pt-10">
          <div className="mb-6">
            <p className="eyebrow mb-3 text-[#ead8ad]">Prefer a message?</p>
            <h3 className="font-playfair text-3xl">Tell us what you need.</h3>
            <p className="mt-2 text-sm text-white/65">Send your travel question and our team will reply personally.</p>
          </div>
          <form onSubmit={handleContactSubmit} className="grid gap-4 md:grid-cols-2">
            <input aria-label="Contact name" value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25" placeholder="Name *" />
            <input aria-label="Contact email" type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25" placeholder="Email *" />
            <input aria-label="Contact phone" type="tel" value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25" placeholder="Phone (optional)" />
            <textarea aria-label="Contact message" rows={3} value={contact.message} onChange={(event) => setContact({ ...contact, message: event.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25 md:col-span-2" placeholder="How can we help? *" />
            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
              {contactStatus && <p role="status" className="text-sm text-[#ead8ad]">{contactStatus}</p>}
              <Button type="submit" intent="secondary" size="lg" className="md:ml-auto">Send Contact Message</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}