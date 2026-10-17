import { usePathname } from 'expo-router';
import Head from 'expo-router/head';

import { Site } from '@/constants/site';
import { locations } from '@/data/locations';
import { services } from '@/data/services';

const ogImage = `${Site.url}/og-image.jpg`;

/**
 * Business details in schema.org form, so search engines can read the name,
 * phone, service area and services. NAP must match the Google Business Profile.
 */
const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': `${Site.url}/#business`,
  name: Site.name,
  alternateName: Site.shortName,
  url: Site.url,
  logo: ogImage,
  image: ogImage,
  telephone: '+1-404-784-9030',
  email: Site.email,
  address: {
    '@type': 'PostalAddress',
    ...Object.fromEntries(Object.entries(Site.postalAddress).filter(([, v]) => v)),
  },
  areaServed: locations.map((l) => ({ '@type': 'City', name: `${l.city}, GA` })),
  knowsAbout: services.map((s) => s.name),
  hasCredential: ['GAF Certified Residential Roofing Contractor', 'Atlas Pro+ Gold Contractor'],
  sameAs: Site.socials.map((s) => s.url),
};

/**
 * Per-page SEO shared by every screen: canonical URL (one address per page,
 * whatever host or .html variant was requested), link-preview tags, and the
 * business structured data. Page-specific title and description stay on each page.
 */
export function SiteSeo() {
  const pathname = usePathname();
  const canonical = `${Site.url}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;

  return (
    <Head>
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={Site.shortName} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary" />
      <script type="application/ld+json">{JSON.stringify(businessJsonLd)}</script>
    </Head>
  );
}
