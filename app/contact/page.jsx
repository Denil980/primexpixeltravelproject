"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, PaperAirplaneIcon, SparklesIcon, ArrowRightIcon, } from '@heroicons/react/24/outline';
const contactMethods = [
    {
        id: 'whatsapp',
        icon: PhoneIcon,
        title: 'WhatsApp',
        description: 'The fastest way to reach us. Chat directly with our travel consultant.',
        detail: `+91 ${siteConfig.whatsappNumber.replace('91', '')}`,
        color: '#25D366',
        bg: '#25D36615',
    },
    {
        id: 'email',
        icon: EnvelopeIcon,
        title: 'Email',
        description: 'Send us your travel requirements and we\'ll respond within a few hours.',
        detail: siteConfig.email,
        color: '#6366F1',
        bg: '#6366F115',
    },
    {
        id: 'location',
        icon: MapPinIcon,
        title: 'Location',
        description: 'We specialise in Kashmir departures and international travel from India.',
        detail: siteConfig.location,
        color: '#D4AF37',
        bg: '#D4AF3715',
    },
    {
        id: 'hours',
        icon: ClockIcon,
        title: 'Business Hours',
        description: 'We are available six days a week to help you plan the perfect trip.',
        detail: siteConfig.businessHours,
        color: '#14B8A6',
        bg: '#14B8A615',
    },
];
const quickTopics = [
    'Kashmir Tour Package',
    'International Package',
    'Honeymoon Package',
    'Group Tour',
    'Custom Itinerary',
    'Hotel Booking',
    'Other Inquiry',
];
export default function ContactPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const handleWhatsApp = () => {
        if (!name.trim())
            return;
        const fullMsg = [
            `Hi ${siteConfig.ownerName}! My name is ${name.trim()}.`,
            phone ? `My phone/WhatsApp: ${phone.trim()}` : null,
            topic ? `Topic: ${topic}` : null,
            message.trim() ? `\nMessage:\n${message.trim()}` : null,
        ]
            .filter(Boolean)
            .join('\n');
        const url = buildWhatsAppUrl(siteConfig.whatsappNumber, fullMsg);
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const directWhatsApp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi ${siteConfig.ownerName}, I'd like to inquire about your travel packages.`)}`;
    const isValid = name.trim().length > 0;
    return (<div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0A3D62] text-white py-20 sm:py-28">
        <ResponsiveImage src="/images/international.jpg" alt="Contact us" priority className="absolute inset-0 w-full h-full object-cover opacity-20" width={1920} height={1080}/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D62]/80 via-[#0A3D62]/60 to-[#0A3D62]"/>
        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6">
            <PaperAirplaneIcon className="h-4 w-4"/>
            <span>Get in Touch</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Start Your Journey<br />
            <span className="text-[#D4AF37]">With a Message</span>
          </h1>
          <p className="font-inter text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Have a trip in mind? Fill in the form below and connect with {siteConfig.ownerName} directly on WhatsApp. No call centre — just a real conversation.
          </p>
        </Container>
      </section>

      {/* ── CONTACT METHODS ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactMethods.map((method) => (<div key={method.id} className="flex flex-col items-start p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow" style={{ backgroundColor: method.bg }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3" style={{ backgroundColor: `${method.color}20` }}>
                  <method.icon className="h-5 w-5" style={{ color: method.color }}/>
                </div>
                <p className="font-playfair text-base font-bold text-[#0A3D62] mb-1">{method.title}</p>
                <p className="font-inter text-xs text-gray-500 mb-2 leading-relaxed">{method.description}</p>
                <p className="font-inter text-sm font-semibold" style={{ color: method.color }}>{method.detail}</p>
              </div>))}
          </div>
        </Container>
      </section>

      {/* ── MAIN CONTACT FORM + DIRECT WHATSAPP ── */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — Inquiry Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366]/10">
                  <PhoneIcon className="h-5 w-5 text-[#25D366]"/>
                </div>
                <div>
                  <h2 className="font-playfair text-xl font-bold text-[#0A3D62]">Send a WhatsApp Inquiry</h2>
                  <p className="font-inter text-xs text-gray-400">Opens WhatsApp with your message pre-filled</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block font-inter text-sm font-semibold text-gray-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/30 focus:border-[#0A3D62] transition-colors placeholder-gray-300"/>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="block font-inter text-sm font-semibold text-gray-700 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input id="contact-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/30 focus:border-[#0A3D62] transition-colors placeholder-gray-300"/>
                </div>

                {/* Topic */}
                <div>
                  <label htmlFor="contact-topic" className="block font-inter text-sm font-semibold text-gray-700 mb-1.5">
                    What are you interested in?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickTopics.map((t) => (<button key={t} type="button" onClick={() => setTopic(t === topic ? '' : t)} className={`px-3 py-1.5 rounded-full text-xs font-inter font-medium border transition-colors ${topic === t
                ? 'bg-[#0A3D62] text-white border-[#0A3D62]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#0A3D62]/50'}`}>
                        {t}
                      </button>))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block font-inter text-sm font-semibold text-gray-700 mb-1.5">
                    Additional Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Tell us about your travel dates, group size, destinations of interest, or any special requirements..." className="w-full border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/30 focus:border-[#0A3D62] transition-colors placeholder-gray-300 resize-none"/>
                </div>

                {/* Submit */}
                <button type="button" onClick={handleWhatsApp} disabled={!isValid} className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl text-base transition-colors shadow-md">
                  <PhoneIcon className="h-5 w-5"/>
                  Send on WhatsApp
                </button>
                {!isValid && (<p className="font-inter text-xs text-gray-400 text-center">Please enter your name to continue.</p>)}
              </div>
            </div>

            {/* RIGHT — Quick Connect + Info */}
            <div className="space-y-6">
              {/* Quick Direct WhatsApp */}
              <div className="bg-[#0A3D62] text-white rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-4">
                  <SparklesIcon className="h-6 w-6 text-[#D4AF37]"/>
                  <h3 className="font-playfair text-xl font-bold">Direct Quick Contact</h3>
                </div>
                <p className="font-inter text-sm text-gray-300 mb-5 leading-relaxed">
                  Don&apos;t want to fill a form? Just tap below to open WhatsApp directly and chat with {siteConfig.ownerName}.
                </p>
                <a href={directWhatsApp} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold px-6 py-4 rounded-xl transition-colors text-base">
                  <PhoneIcon className="h-5 w-5"/>
                  Open WhatsApp Now
                </a>
                <p className="font-inter text-xs text-gray-400 mt-3 text-center">
                  WhatsApp: <span className="text-white font-semibold">+91 {siteConfig.whatsappNumber.replace('91', '')}</span>
                </p>
              </div>

              {/* What to expect */}
              <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <h3 className="font-playfair text-xl font-bold text-[#0A3D62] mb-4">What Happens Next?</h3>
                <ol className="space-y-4">
                  {[
            { num: '1', text: 'You send your inquiry via WhatsApp or the form above.' },
            { num: '2', text: `${siteConfig.ownerName} responds personally — usually within a few hours.` },
            { num: '3', text: 'We discuss your travel preferences, dates, and budget in detail.' },
            { num: '4', text: 'We create a custom itinerary and quote tailored to your requirements.' },
            { num: '5', text: 'You confirm, and we handle everything from start to finish.' },
        ].map((item) => (<li key={item.num} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold flex items-center justify-center font-inter">
                        {item.num}
                      </span>
                      <p className="font-inter text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </li>))}
                </ol>
              </div>

              {/* Popular destinations */}
              <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <h3 className="font-playfair text-xl font-bold text-[#0A3D62] mb-4">Popular Inquiries</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
            { label: 'Kashmir Packages', href: '/kashmir' },
            { label: 'Dubai Escape', href: '/#featured-packages' },
            { label: 'Maldives Retreat', href: '/#featured-packages' },
            { label: 'Honeymoon Trips', href: '/#featured-packages' },
            { label: 'Group Tours', href: '/#featured-packages' },
            { label: 'All Destinations', href: '/destinations' },
        ].map((link) => (<Link key={link.label} href={link.href} className="flex items-center gap-1.5 font-inter text-sm text-gray-600 hover:text-[#0A3D62] font-medium transition-colors">
                      <ArrowRightIcon className="h-3 w-3 text-[#D4AF37]"/>
                      {link.label}
                    </Link>))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── TRUST BANNER ── */}
      <section className="py-12 bg-gradient-to-r from-[#D4AF37] to-[#B8952A] text-white">
        <Container className="max-w-4xl text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold mb-3">
            No robots. No call centres. Just real travel expertise.
          </h2>
          <p className="font-inter text-yellow-100 max-w-xl mx-auto">
            When you contact us, you speak directly to {siteConfig.ownerName} — a person who genuinely cares about your travel experience.
          </p>
        </Container>
      </section>
    </div>);
}
