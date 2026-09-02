/**
 * Single source of truth for business info (NAP consistency requirement).
 */
export const Site = {
  name: 'Dynamic Roofing and Construction LLC',
  shortName: 'Dynamic Roofing',
  tagline: 'Built to Protect. Built to Last.',
  phoneDisplay: '(404) 784-9030',
  phoneHref: 'tel:+14047849030',
  email: 'Dynamic.rcllc@gmail.com',
  // TODO: Replace with the full street address before launch.
  address: 'Powder Springs, GA 30127',
  calendlyUrl: 'https://calendly.com/dynamic-rcllc/roof',
  heroVideoUrl: 'https://media.dynamicroofingandconstruction.us/Roofing.mp4',
  socials: [
    { label: 'Facebook', url: 'https://www.facebook.com/Dynamic.rcllc' },
    { label: 'Instagram', url: 'https://www.instagram.com/dynamic.roofing?igsh=d3RkdndsOG5nMDAw' },
    { label: 'Google Reviews', url: 'https://share.google/Mph05eVHfJiXqQHXq' },
  ],
} as const;

/**
 * EmailJS configuration for the contact form (https://www.emailjs.com).
 * Fill these in from your EmailJS dashboard: Email Services -> Service ID,
 * Email Templates -> Template ID, and Account -> Public Key.
 * In your EmailJS account settings, enable "Allow EmailJS API for non-browser
 * applications" so the form also works inside the iOS/Android apps.
 * Until these are set, the form falls back to opening the visitor's email app.
 */
export const EmailJs = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
} as const;

export function isEmailJsConfigured(): boolean {
  return !EmailJs.serviceId.startsWith('YOUR_') && !EmailJs.templateId.startsWith('YOUR_') && !EmailJs.publicKey.startsWith('YOUR_');
}
