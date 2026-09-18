"use client";

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

const EMAILJS_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function HomeBookingSection() {
  const contactFormRef = useRef(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactStatus, setContactStatus] = useState('idle');
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactError('');

    if (!contact.name.trim()) { setContactError('Please enter your name.'); return; }
    if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      setContactError('Please enter a valid email address.'); return;
    }
    if (!contact.message.trim()) { setContactError('Please enter your message.'); return; }

    setContactStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE, EMAILJS_TEMPLATE,
        {
          from_name:  contact.name.trim(),
          from_email: contact.email.trim(),
          phone:      contact.phone.trim() || 'Not provided',
          message:    contact.message.trim(),
        },
        EMAILJS_KEY
      );
      setContactStatus('success');
      setContact({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setContactStatus('error');
      setContactError('Something went wrong. Please try again or contact us directly on WhatsApp.');
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 w-full overflow-hidden bg-[#091f22] px-4 py-14 sm:px-6 sm:py-20 text-white"
    >
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 md:p-10">
          <div className="mb-8">
            <p className="eyebrow mb-3 text-[#ead8ad]">Prefer a message?</p>
            <h2 className="font-playfair text-4xl leading-tight sm:text-5xl">
              Tell us what you need.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">
              Send your travel question and our team will reply personally.
            </p>
          </div>

          {/* ── Success state ── */}
          {contactStatus === 'success' ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-900/40 px-8 py-12 text-center">
              <CheckCircleIcon className="h-12 w-12 text-emerald-400" />
              <h3 className="font-playfair text-2xl text-white">Message Sent!</h3>
              <p className="text-sm text-white/65">
                Thank you! We&apos;ve received your message and will reply to you personally very soon.
              </p>
              <button
                type="button"
                onClick={() => setContactStatus('idle')}
                className="mt-2 rounded-full border border-white/20 px-6 py-2 text-sm text-white/70 transition hover:border-[#ead8ad] hover:text-[#ead8ad]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form ref={contactFormRef} onSubmit={handleContactSubmit} className="grid gap-4 md:grid-cols-2">
              <input
                aria-label="Contact name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25"
                placeholder="Name *"
                disabled={contactStatus === 'sending'}
              />
              <input
                aria-label="Contact email"
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25"
                placeholder="Email *"
                disabled={contactStatus === 'sending'}
              />
              <input
                aria-label="Contact phone"
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25"
                placeholder="Phone (optional)"
                disabled={contactStatus === 'sending'}
              />
              <textarea
                aria-label="Contact message"
                rows={3}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ead8ad] focus:ring-2 focus:ring-[#ead8ad]/25 md:col-span-2"
                placeholder="How can we help? *"
                disabled={contactStatus === 'sending'}
              />

              <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
                {/* Validation / error feedback */}
                {contactError && (
                  <p role="alert" className="flex items-center gap-1.5 text-sm text-rose-300">
                    <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                    {contactError}
                  </p>
                )}

                <Button
                  type="submit"
                  intent="secondary"
                  size="lg"
                  className="md:ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={contactStatus === 'sending'}
                >
                  {contactStatus === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    'Send Contact Message'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
    </section>
  );
}