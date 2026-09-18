import { siteConfig } from './config';

/**
 * Build a structured, professional WhatsApp booking message.
 */
export function buildWhatsAppBookingMessage(payload) {
  const parts = [
    `🌟 *NEW TRAVEL INQUIRY* 🌟\n`,
    `📦 *Package:* ${payload.packageTitle || 'Custom Package'}`,
    payload.destination ? `🌍 *Destination:* ${payload.destination}` : '',
    payload.duration ? `⏱️ *Duration:* ${payload.duration}` : '',
    payload.price ? `💰 *Starting Price:* ${payload.price}` : '',
    `\n👤 *Customer Details:*`,
    `• *Name:* ${payload.customerName || 'Guest'}`,
    payload.customerEmail ? `• *Email:* ${payload.customerEmail}` : '',
    `• *Phone:* ${payload.customerPhone || 'Not provided'}`,
    payload.country ? `• *Country:* ${payload.country}` : '',
    payload.adults ? `• *Adults:* ${payload.adults}` : '',
    payload.children !== undefined && payload.children !== null && payload.children !== '' ? `• *Children:* ${payload.children}` : '',
    payload.travelDate ? `• *Preferred Travel Date:* ${payload.travelDate}` : '',
  ];

  if (payload.notes && payload.notes.trim()) {
    parts.push(`\n📝 *Special Requirements:*`, payload.notes.trim());
  }

  parts.push(
    `\nI would like to know about availability, customization, and confirmation.`,
    `\nThank you!`
  );

  return parts.filter(Boolean).join('\n');
}

/**
 * Build a WhatsApp booking URL from a structured payload.
 */
export function buildWhatsAppBookingUrl(payload, customNumber) {
  const targetNumber = customNumber || siteConfig.whatsappNumber;
  const cleanNumber = targetNumber.replace(/[^0-9]/g, '');
  const rawMessage = buildWhatsAppBookingMessage(payload);
  const encodedMessage = encodeURIComponent(rawMessage);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Build a simple WhatsApp URL with a phone number and a plain text message.
 */
export function buildWhatsAppUrl(phoneNumber, message) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}