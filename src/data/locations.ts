import { msg } from 'gt-react-native';

import type { Faq } from '@/data/services';

export type Location = {
  slug: string;
  city: string;
  intro: string;
  neighborhoods: string[];
  projects: { neighborhood: string; type: string; description: string }[];
  stats: { value: string; label: string }[];
  faqs: Faq[];
};

export const locations: Location[] = [
  {
    slug: 'powder-springs',
    city: 'Powder Springs',
    intro:
      msg('Dynamic Roofing is proud to be the trusted roofing contractor for homeowners throughout Powder Springs. From sudden storm damage to full roof replacements, we deliver high-quality workmanship and help you navigate the insurance process every step of the way.'),
    neighborhoods: ['Silver Springs Village', 'Country Walk', 'Westfork', 'Wildflower Estates', 'Powder Springs Park'],
    projects: [
      { neighborhood: 'Silver Springs Village', type: msg('Roof replacement'), description: msg('Full roof replacement with GAF Timberline HDZ architectural shingles after hail damage.') },
      { neighborhood: 'Country Walk', type: msg('Storm damage repair'), description: msg('Wind damage repair and shingle replacement, fully covered by insurance.') },
      { neighborhood: 'Westfork', type: msg('Roof replacement'), description: msg('Complete tear-off and replacement with upgraded ridge ventilation.') },
    ],
    stats: [
      { value: '14', label: msg('hail events since 2020') },
      { value: '60+', label: msg('roofs replaced in Powder Springs') },
      { value: '$1.2M+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('Does Dynamic Roofing offer free inspections in Powder Springs?'), answer: msg('Yes — every inspection in Powder Springs is completely free and includes a full photo report.') },
      { question: msg('How fast can you respond after a storm?'), answer: msg('We are based next door in Dallas, GA, so we can typically inspect within 24 hours of a storm, with emergency tarping available same-day.') },
      { question: msg('Do you help with insurance claims?'), answer: msg('Absolutely. We document the damage, help you file, and meet the adjuster on your roof so nothing gets missed.') },
    ],
  },
  {
    slug: 'marietta',
    city: 'Marietta',
    intro:
      msg('From historic homes near Marietta Square to newer builds in East Cobb, Dynamic Roofing brings storm damage expertise and insurance claim support to homeowners across Marietta.'),
    neighborhoods: ['East Cobb', 'Marietta Square', 'West Side', 'Sandy Plains', 'Whitlock Heights'],
    projects: [
      { neighborhood: 'East Cobb', type: msg('Roof replacement'), description: msg('GAF Timberline HDZ replacement following a wind event, approved through insurance.') },
      { neighborhood: 'Whitlock Heights', type: msg('Roof repair'), description: msg('Flashing and valley repair on a historic-district home.') },
      { neighborhood: 'Sandy Plains', type: msg('Storm damage repair'), description: msg('Hail damage restoration including gutters and downspouts.') },
    ],
    stats: [
      { value: '12', label: msg('hail events since 2020') },
      { value: '45+', label: msg('roofs serviced in Marietta') },
      { value: '$900K+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('Do you offer free roof inspections in Marietta?'), answer: msg('Yes — free inspections with photo reports anywhere in Marietta and East Cobb.') },
      { question: msg('Can you work on historic homes near Marietta Square?'), answer: msg('Yes. We are experienced with steeper pitches and architectural details common in Marietta\u2019s older neighborhoods.') },
    ],
  },
  {
    slug: 'smyrna',
    city: 'Smyrna',
    intro:
      msg('Smyrna homeowners trust Dynamic Roofing for fast storm response, quality roof replacements, and honest inspections — from the Market Village area to Vinings border neighborhoods.'),
    neighborhoods: ['Market Village', 'Williams Park', 'Forest Hills', 'Vinings Estates', 'Belmont'],
    projects: [
      { neighborhood: 'Williams Park', type: msg('Roof replacement'), description: msg('Complete replacement with Weathered Wood Timberline HDZ shingles.') },
      { neighborhood: 'Vinings Estates', type: msg('Roof repair'), description: msg('Leak diagnosis and chimney flashing rebuild.') },
      { neighborhood: 'Belmont', type: msg('Storm damage repair'), description: msg('Wind-lifted shingle replacement handled through insurance.') },
    ],
    stats: [
      { value: '11', label: msg('hail events since 2020') },
      { value: '35+', label: msg('roofs serviced in Smyrna') },
      { value: '$700K+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('Do you serve all of Smyrna?'), answer: msg('Yes — from Market Village to the Vinings border, including townhome and HOA communities.') },
      { question: msg('Can you match my HOA\u2019s required shingle color?'), answer: msg('Yes. We work with HOA color requirements regularly and can provide samples and documentation for approval.') },
    ],
  },
  {
    slug: 'douglasville',
    city: 'Douglasville',
    intro:
      msg('Dynamic Roofing serves Douglasville homeowners with storm damage restoration, roof replacement, and free inspections — with deep experience in the hail corridors along the I-20 west side.'),
    neighborhoods: ['Chapel Hills', 'Anneewakee Trails', 'Brookmont', 'Stewart Mill', 'Arbor Station'],
    projects: [
      { neighborhood: 'Chapel Hills', type: msg('Roof replacement'), description: msg('Golf-course community replacement with upgraded impact-resistant shingles.') },
      { neighborhood: 'Anneewakee Trails', type: msg('Storm damage repair'), description: msg('Hail claim restoration including roof, gutters, and window wraps.') },
      { neighborhood: 'Brookmont', type: msg('Roof inspection'), description: msg('Pre-sale inspection and certification for a home closing.') },
    ],
    stats: [
      { value: '13', label: msg('hail events since 2020') },
      { value: '30+', label: msg('roofs serviced in Douglasville') },
      { value: '$650K+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('Do you offer free inspections in Douglasville?'), answer: msg('Yes — free inspections with full photo documentation anywhere in Douglas County.') },
      { question: msg('Does Douglasville really get that much hail?'), answer: msg('The I-20 west corridor sees regular spring hail. Many Douglasville roofs have unclaimed damage their owners never knew about.') },
    ],
  },
  {
    slug: 'austell',
    city: 'Austell',
    intro:
      msg('Austell homeowners count on Dynamic Roofing for responsive storm damage service and quality replacements — minutes away from our Powder Springs home base.'),
    neighborhoods: ['Legacy Park', 'Silver Comet Trail area', 'Clarkdale', 'Sweetwater', 'Anderson Mill'],
    projects: [
      { neighborhood: 'Legacy Park', type: msg('Roof replacement'), description: msg('Full replacement with Charcoal Timberline HDZ after wind damage.') },
      { neighborhood: 'Clarkdale', type: msg('Roof repair'), description: msg('Storm-lifted ridge cap and pipe boot replacement.') },
      { neighborhood: 'Sweetwater', type: msg('Storm damage repair'), description: msg('Insurance-approved hail restoration with new gutters.') },
    ],
    stats: [
      { value: '10', label: msg('hail events since 2020') },
      { value: '25+', label: msg('roofs serviced in Austell') },
      { value: '$500K+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('How quickly can you get to Austell?'), answer: msg('We are based nearby in Dallas, GA — same-day visits are often possible.') },
      { question: msg('Do you handle emergency tarping?'), answer: msg('Yes, we offer emergency tarping to stop active leaks while your claim is processed.') },
    ],
  },
  {
    slug: 'dallas',
    city: 'Dallas',
    intro:
      msg('Fast-growing Dallas and Paulding County neighborhoods trust Dynamic Roofing for storm inspections, insurance claim help, and quality roof replacements built to last.'),
    neighborhoods: ['Seven Hills', 'The Georgian', 'Ivey Township', 'Hiram border', 'Downtown Dallas'],
    projects: [
      { neighborhood: 'Seven Hills', type: msg('Roof replacement'), description: msg('Hail claim replacement with Pewter Gray Timberline HDZ.') },
      { neighborhood: 'The Georgian', type: msg('Storm damage repair'), description: msg('Wind damage restoration coordinated with the HOA.') },
      { neighborhood: 'Ivey Township', type: msg('Roof inspection'), description: msg('Free post-storm inspection — no damage found, homeowner given all-clear report.') },
    ],
    stats: [
      { value: '15', label: msg('hail events since 2020') },
      { value: '30+', label: msg('roofs serviced in Dallas, GA') },
      { value: '$600K+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('Do you cover all of Paulding County?'), answer: msg('Yes — Dallas, Hiram, and the surrounding Paulding County communities are all in our core service area.') },
      { question: msg('Why is hail so common in Dallas, GA?'), answer: msg('Paulding County sits in a frequent spring storm track. If hail hit your area, a free inspection is worth it even if the roof looks fine.') },
    ],
  },
  {
    slug: 'acworth',
    city: 'Acworth',
    intro:
      msg('From lakeside homes to established neighborhoods off Highway 92, Dynamic Roofing brings quality roof replacement and storm damage expertise to Acworth.'),
    neighborhoods: ['Lake Acworth', 'Brookstone', 'Centennial Lakes', 'Bentwater', 'Downtown Acworth'],
    projects: [
      { neighborhood: 'Brookstone', type: msg('Roof replacement'), description: msg('Golf community replacement with upgraded ventilation and Weathered Wood shingles.') },
      { neighborhood: 'Centennial Lakes', type: msg('Storm damage repair'), description: msg('Hail restoration approved through insurance, completed in one day.') },
      { neighborhood: 'Lake Acworth', type: msg('Roof repair'), description: msg('Wind-damage repair on a lakefront home with steep architectural roofline.') },
    ],
    stats: [
      { value: '11', label: msg('hail events since 2020') },
      { value: '20+', label: msg('roofs serviced in Acworth') },
      { value: '$450K+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('Do you serve the Lake Acworth area?'), answer: msg('Yes — lakeside and all surrounding Acworth neighborhoods, including Bentwater and Brookstone.') },
      { question: msg('Can you handle steep or complex rooflines?'), answer: msg('Yes. Our crews are equipped and insured for steep-slope architectural roofs.') },
    ],
  },
  {
    slug: 'kennesaw',
    city: 'Kennesaw',
    intro:
      msg('Kennesaw homeowners choose Dynamic Roofing for honest inspections, storm damage restoration, and roof replacements done right — from Kennesaw Mountain to Town Center.'),
    neighborhoods: ['Kennesaw Mountain', 'Legacy Park', 'Blue Springs', 'Pinetree', 'Town Center area'],
    projects: [
      { neighborhood: 'Kennesaw Mountain', type: msg('Roof replacement'), description: msg('Full tear-off and replacement with Charcoal Timberline HDZ.') },
      { neighborhood: 'Pinetree', type: msg('Roof repair'), description: msg('Valley and flashing repair on a golf-course home.') },
      { neighborhood: 'Blue Springs', type: msg('Storm damage repair'), description: msg('Wind and hail restoration fully covered by the homeowner\u2019s policy.') },
    ],
    stats: [
      { value: '12', label: msg('hail events since 2020') },
      { value: '25+', label: msg('roofs serviced in Kennesaw') },
      { value: '$550K+', label: msg('in approved insurance claims') },
    ],
    faqs: [
      { question: msg('Do you offer free inspections in Kennesaw?'), answer: msg('Yes — free inspections with photo reports throughout Kennesaw and northwest Cobb.') },
      { question: msg('Can you inspect before I sell my home?'), answer: msg('Yes, we provide pre-listing inspections and roof condition reports for real estate transactions.') },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getNearby(slug: string): Location[] {
  return locations.filter((l) => l.slug !== slug);
}
