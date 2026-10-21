/**
 * EmailJS configuration for the contact form.
 *
 * These are EmailJS *public* identifiers — the public key is designed to be
 * shipped to the browser and only grants access to your own templates. They
 * can still be overridden at build time with environment variables:
 *
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_TEMPLATE_ID
 *   VITE_EMAILJS_PUBLIC_KEY
 *
 * No private key or account secret belongs in frontend code.
 */

const env = import.meta.env || {};

export const emailjsConfig = {
  serviceId: env.VITE_EMAILJS_SERVICE_ID || 'service_m1o63kl',
  templateId: env.VITE_EMAILJS_TEMPLATE_ID || 'template_dnkxp01',
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY || 'EoLGKDxwlpAM-1U-h',
};

export default emailjsConfig;
