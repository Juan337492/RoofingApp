import { usePathname } from 'expo-router';
import Head from 'expo-router/head';

import { Site } from '@/constants/site';
import { getLocation, locations } from '@/data/locations';
import { getService, services } from '@/data/services';

const ogImage = `${Site.url}/og-image.jpg`;
const cities = locations.map((l) => ({ '@type': 'City', name: `${l.city}, GA` }));

/**
 * Business details in schema.org form, so search engines can read the name,
 * phone, service area and services. NAP must match the Google Business Profile.
 */
const businessId = `${Site.url}/#business`;

const businessJsonLd = {
  '@type': 'RoofingContractor',
  '@id': businessId,
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
  areaServed: cities,
  knowsAbout: services.map((s) => s.name),
  hasCredential: ['GAF Certified Residential Roofing Contractor', 'Atlas Pro+ Gold Contractor'],
  sameAs: Site.socials.map((s) => s.url),
};

/** What a page is, for its breadcrumb trail and, where it sells something, its Service entry. */
function describePage(pathname: string, canonical: string): { crumb: string; service?: object } | null {
  const [section, slug] = pathname.split('/').filter(Boolean);
  const provider = { '@id': businessId };

  if (section === 'contact') return { crumb: 'Contact' };
  if (section === 'shingles') return { crumb: 'Compare GAF Shingles' };

  if (section === 'services') {
    const service = getService(slug);
    if (!service) return null;
    return {
      crumb: service.name,
      service: {
        '@type': 'Service',
        name: service.name,
        serviceType: service.name,
        description: service.intro,
        url: canonical,
        provider,
        areaServed: cities,
      },
    };
  }

  if (section === 'locations') {
    const location = getLocation(slug);
    if (!location) return null;
    const name = `${location.city}, GA`;
    return {
      crumb: name,
      service: {
        '@type': 'Service',
        name: `Roofing in ${name}`,
        serviceType: 'Roofing',
        description: location.intro,
        url: canonical,
        provider,
        areaServed: { '@type': 'City', name },
      },
    };
  }

  return null;
}

/** Title and description for one page, repeated in the tags link previews read. */
export function PageMeta({ title, description }: { title: string; description: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}

/**
 * Per-page SEO shared by every screen: canonical URL (one address per page,
 * whatever host or .html variant was requested), link-preview tags, and the
 * business structured data. Page-specific title and description stay on each page.
 */
export function SiteSeo() {
  const pathname = usePathname();
  const canonical = `${Site.url}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
  const page = describePage(pathname, canonical);
  const breadcrumbs = page && {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${Site.url}/` },
      { '@type': 'ListItem', position: 2, name: page.crumb, item: canonical },
    ],
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [businessJsonLd, breadcrumbs, page?.service].filter(Boolean),
  };

  return (
    <Head>
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={Site.shortName} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
}
