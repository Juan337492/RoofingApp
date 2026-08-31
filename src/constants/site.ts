/**
 * Single source of truth for business info (NAP consistency requirement).
 * TODO: Replace the placeholder phone, email, address, and social URLs
 * with the real business details before launch.
 */
export const Site = {
  name: 'Dynamic Roofing',
  tagline: 'Built to Protect. Built to Last.',
  phoneDisplay: '(770) 555-0139',
  phoneHref: 'tel:+17705550139',
  email: 'info@dynamicroofingga.com',
  address: 'Powder Springs, GA 30127',
  socials: [
    { label: 'Facebook', url: 'https://facebook.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'Nextdoor', url: 'https://nextdoor.com' },
    { label: 'TikTok', url: 'https://tiktok.com' },
  ],
} as const;
