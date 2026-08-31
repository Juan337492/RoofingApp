import type { Faq } from '@/data/services';

export type Location = {
  slug: string;
  city: string;
  intro: string;
  neighborhoods: string[];
  projects: { neighborhood: string; type: string; description: string }[];
  stats: { value: string; label: string }[];
  reviews: { name: string; neighborhood: string; text: string }[];
  faqs: Faq[];
};

export const locations: Location[] = [
  {
    slug: 'powder-springs',
    city: 'Powder Springs',
    intro:
      'Dynamic Roofing is proud to be the trusted roofing contractor for homeowners throughout Powder Springs. From sudden storm damage to full roof replacements, we deliver high-quality workmanship and help you navigate the insurance process every step of the way.',
    neighborhoods: ['Silver Springs Village', 'Country Walk', 'Westfork', 'Wildflower Estates', 'Powder Springs Park'],
    projects: [
      { neighborhood: 'Silver Springs Village', type: 'Roof Replacement', description: 'Full roof replacement with GAF Timberline HDZ architectural shingles after hail damage.' },
      { neighborhood: 'Country Walk', type: 'Storm Damage Repair', description: 'Wind damage repair and shingle replacement, fully covered by insurance.' },
      { neighborhood: 'Westfork', type: 'Roof Replacement', description: 'Complete tear-off and replacement with upgraded ridge ventilation.' },
    ],
    stats: [
      { value: '14', label: 'hail events since 2020' },
      { value: '60+', label: 'roofs replaced in Powder Springs' },
      { value: '$1.2M+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Jessica M.', neighborhood: 'Silver Springs Village', text: 'Dynamic Roofing was incredible from start to finish. After the hailstorm, they responded quickly, handled everything with our insurance, and our new roof looks amazing!' },
      { name: 'Brian T.', neighborhood: 'Country Walk', text: 'Honest, professional, and local. They showed up fast after the storm and had our roof fixed in no time. Highly recommend.' },
    ],
    faqs: [
      { question: 'Does Dynamic Roofing offer free inspections in Powder Springs?', answer: 'Yes — every inspection in Powder Springs is completely free and includes a full photo report.' },
      { question: 'How fast can you respond after a storm?', answer: 'We are based right here in Powder Springs, so we can typically inspect within 24 hours of a storm, with emergency tarping available same-day.' },
      { question: 'Do you help with insurance claims?', answer: 'Absolutely. We document the damage, help you file, and meet the adjuster on your roof so nothing gets missed.' },
    ],
  },
  {
    slug: 'marietta',
    city: 'Marietta',
    intro:
      'From historic homes near Marietta Square to newer builds in East Cobb, Dynamic Roofing brings storm damage expertise and insurance claim support to homeowners across Marietta.',
    neighborhoods: ['East Cobb', 'Marietta Square', 'West Side', 'Sandy Plains', 'Whitlock Heights'],
    projects: [
      { neighborhood: 'East Cobb', type: 'Roof Replacement', description: 'GAF Timberline HDZ replacement following a wind event, approved through insurance.' },
      { neighborhood: 'Whitlock Heights', type: 'Roof Repair', description: 'Flashing and valley repair on a historic-district home.' },
      { neighborhood: 'Sandy Plains', type: 'Storm Damage Repair', description: 'Hail damage restoration including gutters and downspouts.' },
    ],
    stats: [
      { value: '12', label: 'hail events since 2020' },
      { value: '45+', label: 'roofs serviced in Marietta' },
      { value: '$900K+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Jason M.', neighborhood: 'East Cobb', text: 'Dynamic Roofing made the whole process so easy after our storm damage. Great communication and amazing work!' },
      { name: 'Karen L.', neighborhood: 'Marietta Square', text: 'They treated our older home with real care and the roof came out beautiful. Fair price, no pressure.' },
    ],
    faqs: [
      { question: 'Do you offer free roof inspections in Marietta?', answer: 'Yes — free inspections with photo reports anywhere in Marietta and East Cobb.' },
      { question: 'Can you work on historic homes near Marietta Square?', answer: 'Yes. We are experienced with steeper pitches and architectural details common in Marietta\u2019s older neighborhoods.' },
    ],
  },
  {
    slug: 'smyrna',
    city: 'Smyrna',
    intro:
      'Smyrna homeowners trust Dynamic Roofing for fast storm response, quality roof replacements, and honest inspections — from the Market Village area to Vinings border neighborhoods.',
    neighborhoods: ['Market Village', 'Williams Park', 'Forest Hills', 'Vinings Estates', 'Belmont'],
    projects: [
      { neighborhood: 'Williams Park', type: 'Roof Replacement', description: 'Complete replacement with Weathered Wood Timberline HDZ shingles.' },
      { neighborhood: 'Vinings Estates', type: 'Roof Repair', description: 'Leak diagnosis and chimney flashing rebuild.' },
      { neighborhood: 'Belmont', type: 'Storm Damage Repair', description: 'Wind-lifted shingle replacement handled through insurance.' },
    ],
    stats: [
      { value: '11', label: 'hail events since 2020' },
      { value: '35+', label: 'roofs serviced in Smyrna' },
      { value: '$700K+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Melissa T.', neighborhood: 'Market Village', text: 'They handled everything with the insurance company and got our new roof approved quickly. Highly recommend!' },
      { name: 'Derek W.', neighborhood: 'Forest Hills', text: 'Professional crew, spotless cleanup, and the roof looks fantastic.' },
    ],
    faqs: [
      { question: 'Do you serve all of Smyrna?', answer: 'Yes — from Market Village to the Vinings border, including townhome and HOA communities.' },
      { question: 'Can you match my HOA\u2019s required shingle color?', answer: 'Yes. We work with HOA color requirements regularly and can provide samples and documentation for approval.' },
    ],
  },
  {
    slug: 'douglasville',
    city: 'Douglasville',
    intro:
      'Dynamic Roofing serves Douglasville homeowners with storm damage restoration, roof replacement, and free inspections — with deep experience in the hail corridors along the I-20 west side.',
    neighborhoods: ['Chapel Hills', 'Anneewakee Trails', 'Brookmont', 'Stewart Mill', 'Arbor Station'],
    projects: [
      { neighborhood: 'Chapel Hills', type: 'Roof Replacement', description: 'Golf-course community replacement with upgraded impact-resistant shingles.' },
      { neighborhood: 'Anneewakee Trails', type: 'Storm Damage Repair', description: 'Hail claim restoration including roof, gutters, and window wraps.' },
      { neighborhood: 'Brookmont', type: 'Roof Inspection', description: 'Pre-sale inspection and certification for a home closing.' },
    ],
    stats: [
      { value: '13', label: 'hail events since 2020' },
      { value: '30+', label: 'roofs serviced in Douglasville' },
      { value: '$650K+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Angela R.', neighborhood: 'Chapel Hills', text: 'From inspection to final walkthrough, everything was smooth. They even caught damage our insurance adjuster missed.' },
      { name: 'Marcus D.', neighborhood: 'Stewart Mill', text: 'Fast, fair, and honest. The crew finished in one day and the cleanup was perfect.' },
    ],
    faqs: [
      { question: 'Do you offer free inspections in Douglasville?', answer: 'Yes — free inspections with full photo documentation anywhere in Douglas County.' },
      { question: 'Does Douglasville really get that much hail?', answer: 'The I-20 west corridor sees regular spring hail. Many Douglasville roofs have unclaimed damage their owners never knew about.' },
    ],
  },
  {
    slug: 'austell',
    city: 'Austell',
    intro:
      'Austell homeowners count on Dynamic Roofing for responsive storm damage service and quality replacements — minutes away from our Powder Springs home base.',
    neighborhoods: ['Legacy Park', 'Silver Comet Trail area', 'Clarkdale', 'Sweetwater', 'Anderson Mill'],
    projects: [
      { neighborhood: 'Legacy Park', type: 'Roof Replacement', description: 'Full replacement with Charcoal Timberline HDZ after wind damage.' },
      { neighborhood: 'Clarkdale', type: 'Roof Repair', description: 'Storm-lifted ridge cap and pipe boot replacement.' },
      { neighborhood: 'Sweetwater', type: 'Storm Damage Repair', description: 'Insurance-approved hail restoration with new gutters.' },
    ],
    stats: [
      { value: '10', label: 'hail events since 2020' },
      { value: '25+', label: 'roofs serviced in Austell' },
      { value: '$500K+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Tonya S.', neighborhood: 'Legacy Park', text: 'They came out the day after the storm, tarped our leak, and had the insurance claim approved within weeks.' },
      { name: 'Rob H.', neighborhood: 'Clarkdale', text: 'Local company that actually answers the phone. Quality work at a fair price.' },
    ],
    faqs: [
      { question: 'How quickly can you get to Austell?', answer: 'We are based next door in Powder Springs — same-day visits are often possible.' },
      { question: 'Do you handle emergency tarping?', answer: 'Yes, we offer emergency tarping to stop active leaks while your claim is processed.' },
    ],
  },
  {
    slug: 'dallas',
    city: 'Dallas',
    intro:
      'Fast-growing Dallas and Paulding County neighborhoods trust Dynamic Roofing for storm inspections, insurance claim help, and quality roof replacements built to last.',
    neighborhoods: ['Seven Hills', 'The Georgian', 'Ivey Township', 'Hiram border', 'Downtown Dallas'],
    projects: [
      { neighborhood: 'Seven Hills', type: 'Roof Replacement', description: 'Hail claim replacement with Pewter Gray Timberline HDZ.' },
      { neighborhood: 'The Georgian', type: 'Storm Damage Repair', description: 'Wind damage restoration coordinated with the HOA.' },
      { neighborhood: 'Ivey Township', type: 'Roof Inspection', description: 'Free post-storm inspection — no damage found, homeowner given all-clear report.' },
    ],
    stats: [
      { value: '15', label: 'hail events since 2020' },
      { value: '30+', label: 'roofs serviced in Dallas, GA' },
      { value: '$600K+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Chris P.', neighborhood: 'Seven Hills', text: 'Half our neighborhood got new roofs after the hailstorm — Dynamic Roofing was the only company people recommended twice.' },
      { name: 'Dana K.', neighborhood: 'The Georgian', text: 'Handled our HOA requirements and insurance paperwork without us lifting a finger.' },
    ],
    faqs: [
      { question: 'Do you cover all of Paulding County?', answer: 'Yes — Dallas, Hiram, and the surrounding Paulding County communities are all in our core service area.' },
      { question: 'Why is hail so common in Dallas, GA?', answer: 'Paulding County sits in a frequent spring storm track. If hail hit your area, a free inspection is worth it even if the roof looks fine.' },
    ],
  },
  {
    slug: 'acworth',
    city: 'Acworth',
    intro:
      'From lakeside homes to established neighborhoods off Highway 92, Dynamic Roofing brings quality roof replacement and storm damage expertise to Acworth.',
    neighborhoods: ['Lake Acworth', 'Brookstone', 'Centennial Lakes', 'Bentwater', 'Downtown Acworth'],
    projects: [
      { neighborhood: 'Brookstone', type: 'Roof Replacement', description: 'Golf community replacement with upgraded ventilation and Weathered Wood shingles.' },
      { neighborhood: 'Centennial Lakes', type: 'Storm Damage Repair', description: 'Hail restoration approved through insurance, completed in one day.' },
      { neighborhood: 'Lake Acworth', type: 'Roof Repair', description: 'Wind-damage repair on a lakefront home with steep architectural roofline.' },
    ],
    stats: [
      { value: '11', label: 'hail events since 2020' },
      { value: '20+', label: 'roofs serviced in Acworth' },
      { value: '$450K+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Steve B.', neighborhood: 'Brookstone', text: 'Excellent communication, showed up when they said they would, and the roof looks great.' },
      { name: 'Lauren F.', neighborhood: 'Centennial Lakes', text: 'They found hail damage we could not see from the ground and got the whole roof covered by insurance.' },
    ],
    faqs: [
      { question: 'Do you serve the Lake Acworth area?', answer: 'Yes — lakeside and all surrounding Acworth neighborhoods, including Bentwater and Brookstone.' },
      { question: 'Can you handle steep or complex rooflines?', answer: 'Yes. Our crews are equipped and insured for steep-slope architectural roofs.' },
    ],
  },
  {
    slug: 'kennesaw',
    city: 'Kennesaw',
    intro:
      'Kennesaw homeowners choose Dynamic Roofing for honest inspections, storm damage restoration, and roof replacements done right — from Kennesaw Mountain to Town Center.',
    neighborhoods: ['Kennesaw Mountain', 'Legacy Park', 'Blue Springs', 'Pinetree', 'Town Center area'],
    projects: [
      { neighborhood: 'Kennesaw Mountain', type: 'Roof Replacement', description: 'Full tear-off and replacement with Charcoal Timberline HDZ.' },
      { neighborhood: 'Pinetree', type: 'Roof Repair', description: 'Valley and flashing repair on a golf-course home.' },
      { neighborhood: 'Blue Springs', type: 'Storm Damage Repair', description: 'Wind and hail restoration fully covered by the homeowner\u2019s policy.' },
    ],
    stats: [
      { value: '12', label: 'hail events since 2020' },
      { value: '25+', label: 'roofs serviced in Kennesaw' },
      { value: '$550K+', label: 'in approved insurance claims' },
    ],
    reviews: [
      { name: 'Amanda G.', neighborhood: 'Legacy Park', text: 'Professional from the first call. The photo report made the insurance process painless.' },
      { name: 'Victor N.', neighborhood: 'Pinetree', text: 'Quick, clean, and honest — told us half the roof just needed repair, not replacement. Saved us thousands.' },
    ],
    faqs: [
      { question: 'Do you offer free inspections in Kennesaw?', answer: 'Yes — free inspections with photo reports throughout Kennesaw and northwest Cobb.' },
      { question: 'Can you inspect before I sell my home?', answer: 'Yes, we provide pre-listing inspections and roof condition reports for real estate transactions.' },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getNearby(slug: string): Location[] {
  return locations.filter((l) => l.slug !== slug);
}
