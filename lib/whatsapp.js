import { siteConfig } from './config';
export function buildWhatsAppBookingMessage(payload) {
    return `Hello, I would like to enquire about this travel package.

Package: ${payload.packageTitle}
Destination: ${payload.destination}
Duration: ${payload.duration}
Starting Price: ${payload.price}

Customer Name: ${payload.customerName}
Phone: ${payload.customerPhone}

I would like to know more about this package and availability.

Thank you.`;
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
 * @param phoneNumber  - E.164 digits only, e.g. "919496963784"
 * @param message      - Plain text message to pre-fill
 */
export function buildWhatsAppUrl(phoneNumber, message) {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
