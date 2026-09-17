import emailjs from '@emailjs/browser';
export async function sendContactEmail(payload) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing from environment variables.');
        return {
            success: false,
            error: 'EmailJS environment variables (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) are not configured yet.',
        };
    }
    try {
        const templateParams = {
            from_name: payload.name,
            reply_to: payload.email,
            phone_number: payload.phone || 'Not provided',
            subject: payload.subject,
            message: payload.message,
        };
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        return { success: true };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to send email inquiry.';
        console.error('EmailJS error:', err);
        return { success: false, error: message };
    }
}
