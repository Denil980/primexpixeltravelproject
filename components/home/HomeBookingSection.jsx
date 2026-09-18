"use client";

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const EMAILJS_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const ENQUIRY_OPTIONS = [
  'Custom Package Enquiry',
  'Group Package Enquiry',
  'Honeymoon Package',
  'Luxury & VIP Expedition',
  'Corporate & Event Travel',
  'General Travel Inquiry',
];

export function HomeBookingSection() {
  const contactFormRef = useRef(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', enquiryType: '', message: '' });
  const [contactStatus, setContactStatus] = useState('idle');
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactError('');

    if (!contact.name.trim()) { setContactError('Please enter your full name.'); return; }
    if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      setContactError('Please enter a valid email address.'); return;
    }
    if (!contact.phone.trim()) { setContactError('Please enter your phone number.'); return; }
    if (!contact.enquiryType) { setContactError('Please select an enquiry type.'); return; }
    if (!contact.message.trim()) { setContactError('Please enter your message.'); return; }

    setContactStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE, EMAILJS_TEMPLATE,
        {
          from_name:      contact.name.trim(),
          from_email:     contact.email.trim(),
          phone:          contact.phone.trim(),
          user_phone:     contact.phone.trim(),
          phone_number:   contact.phone.trim(),
          mobile:         contact.phone.trim(),
          contact_number: contact.phone.trim(),
          enquiry_type:   contact.enquiryType,
          message:        `📞 Phone Number: ${contact.phone.trim()}\n📋 Enquiry Type: ${contact.enquiryType}\n\n💬 Message:\n${contact.message.trim()}`,
        },
        EMAILJS_KEY
      );
      setContactStatus('success');
      setContact({ name: '', email: '', phone: '', enquiryType: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setContactStatus('error');
      setContactError('Something went wrong. Please try again or contact us directly on WhatsApp.');
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 w-full overflow-hidden bg-[#F8FAFC] px-4 py-14 sm:px-6 sm:py-20 text-slate-900"
    >
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 md:p-10">
        <div className="mb-8">
          <p className="eyebrow mb-3 text-[#b8860b]">Prefer a message?</p>
          <h2 className="font-playfair text-4xl leading-tight sm:text-5xl text-[#0f2c3f] font-black">
            Tell us what you need.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
            Send your travel question and our team will reply personally.
          </p>
        </div>

        {/* Success state */}
        {contactStatus === 'success' ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-50 px-8 py-12 text-center">
            <CheckCircleIcon className="h-12 w-12 text-emerald-600" />
            <h3 className="font-playfair text-2xl text-slate-900 font-bold">Message Sent!</h3>
            <p className="text-sm text-slate-600 max-w-md">
              Thank you! We&apos;ve received your message and will reply to you personally very soon.
            </p>
            <button
              type="button"
              onClick={() => setContactStatus('idle')}
              className="mt-2 rounded-full border border-slate-300 bg-white px-6 py-2 text-sm text-slate-700 transition hover:border-[#b8860b] hover:text-[#b8860b]"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form ref={contactFormRef} onSubmit={handleContactSubmit} className="grid gap-4 md:grid-cols-2">

            {/* Name */}
            <input
              aria-label="Contact name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
              placeholder="Name *"
              disabled={contactStatus === 'sending'}
            />

            {/* Email */}
            <input
              aria-label="Contact email"
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
              placeholder="Email *"
              disabled={contactStatus === 'sending'}
            />

            {/* Phone Number (Required) */}
            <input
              aria-label="Contact phone"
              type="tel"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
              placeholder="Phone Number *"
              disabled={contactStatus === 'sending'}
            />

            {/* Enquiry Type Dropdown */}
            <select
              aria-label="Enquiry Type"
              value={contact.enquiryType}
              onChange={(e) => setContact({ ...contact, enquiryType: e.target.value })}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20"
              disabled={contactStatus === 'sending'}
            >
              <option value="" disabled>Select Enquiry Type *</option>
              {ENQUIRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Message Textarea */}
            <textarea
              aria-label="Contact message"
              rows={3}
              value={contact.message}
              onChange={(e) => setContact({ ...contact, message: e.target.value })}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#b8860b] focus:bg-white focus:ring-2 focus:ring-[#b8860b]/20 md:col-span-2"
              placeholder="How can we help? *"
              disabled={contactStatus === 'sending'}
            />

            {/* Footer Row */}
            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between pt-2">
              {contactError && (
                <p role="alert" className="flex items-center gap-1.5 text-sm text-rose-600 font-medium">
                  <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                  {contactError}
                </p>
              )}

              <button
                type="submit"
                className="md:ml-auto rounded-xl bg-[#0f2c3f] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#1e4d6b] shadow-md disabled:opacity-50"
                disabled={contactStatus === 'sending'}
              >
                {contactStatus === 'sending' ? 'Sending…' : 'Send Contact Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}