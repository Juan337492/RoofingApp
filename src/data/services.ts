export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  signsTitle: string;
  signs: string[];
  process: { title: string; description: string }[];
  faqs: Faq[];
};

const defaultProcess = [
  { title: 'Free Inspection', description: 'We thoroughly inspect your roof, document any damage, and give you honest recommendations.' },
  { title: 'Materials & Quote', description: 'We help you choose the right materials and provide a detailed, transparent quote with no surprises.' },
  { title: 'Installation Day', description: 'Our crew shows up on time, works efficiently, and treats your property with care and respect.' },
  { title: 'Final Walkthrough', description: 'We inspect every detail with you to make sure the work meets our high standards before we leave.' },
];

export const services: Service[] = [
  {
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    headline: 'Roof Replacement in Powder Springs & West Metro Atlanta',
    intro:
      'Durable, high-performance GAF Timberline HDZ roofing systems installed with expert craftsmanship. We handle everything from tear-off to final inspection, and we help you get insurance to cover it when storm damage qualifies.',
    signsTitle: 'Signs You Need a New Roof',
    signs: [
      'Missing or curling shingles',
      'Granules collecting in your gutters',
      'Roof is over 20 years old',
      'Water stains on ceilings or walls',
      'Sagging or soft spots on the roof deck',
      'Storm damage or high winds in your area',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'How much does a roof replacement cost in Georgia?',
        answer:
          'The cost depends on the size of your roof, the materials selected, and the complexity of the job. On average, homeowners in Georgia invest between $8,000 and $15,000. We provide free, no-obligation quotes so you know exactly what to expect.',
      },
      {
        question: 'How long does a GAF Timberline HDZ roof last?',
        answer:
          'GAF Timberline HDZ shingles are engineered to last 25 to 30 years or more with proper installation and ventilation, and they come with strong manufacturer warranties.',
      },
      {
        question: 'Will insurance cover my roof replacement?',
        answer:
          'If your roof was damaged by hail, wind, or a storm, your homeowners insurance may cover most or all of the replacement. We inspect for free, document everything, and work with your insurance company on your behalf.',
      },
      {
        question: 'How long does installation take?',
        answer: 'Most residential roof replacements are completed in one to two days, weather permitting.',
      },
    ],
  },
  {
    slug: 'roof-repair',
    name: 'Roof Repair',
    headline: 'Fast, Reliable Roof Repair in West Metro Atlanta',
    intro:
      'From leaks and missing shingles to flashing failures and everyday wear, we diagnose the real problem and fix it right the first time — with honest advice on whether a repair or replacement makes more sense.',
    signsTitle: 'Signs Your Roof Needs Repair',
    signs: [
      'Active leaks or water stains after rain',
      'A few missing, cracked, or lifted shingles',
      'Damaged flashing around chimneys or vents',
      'Shingle debris in the yard after storms',
      'Daylight visible in the attic',
      'Moss or algae growth holding moisture',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'How much does a roof repair cost?',
        answer:
          'Minor repairs often run a few hundred dollars, while larger repairs vary with the extent of the damage. Every repair starts with a free inspection and an upfront quote.',
      },
      {
        question: 'Should I repair or replace my roof?',
        answer:
          'If the damage is isolated and your roof is under 15 years old, a repair usually makes sense. If damage is widespread or the roof is near the end of its life, replacement is often the better investment. We give you an honest recommendation either way.',
      },
      {
        question: 'How fast can you fix a leak?',
        answer: 'We prioritize active leaks and can typically get a crew out within 24 to 48 hours, faster after major storms.',
      },
    ],
  },
  {
    slug: 'storm-damage-roofing',
    name: 'Storm Damage',
    headline: 'Storm & Hail Damage Roofing Experts',
    intro:
      'West metro Atlanta takes real hail and wind every year. We are storm damage specialists: free post-storm inspections, complete photo documentation, emergency tarping, and full restoration — with your insurance claim handled for you.',
    signsTitle: 'Signs of Storm Damage',
    signs: [
      'Hail hit your area recently — even small hail damages shingles',
      'Missing or creased shingles after high winds',
      'Dents in gutters, downspouts, or vents',
      'Granule loss exposing black substrate',
      'Neighbors getting roofs replaced',
      'Water intrusion after a storm',
    ],
    process: [
      { title: 'Free Storm Inspection', description: 'We inspect and photo-document every slope, gutter, and vent for hail and wind damage.' },
      { title: 'Claim Filed & Supported', description: 'We help you file the claim and meet the insurance adjuster on your roof so nothing gets missed.' },
      { title: 'Approval & Materials', description: 'Once approved, you pick your shingle color and we schedule your build.' },
      { title: 'Roof Restored', description: 'Your roof is repaired or replaced with quality you can trust, typically in one day.' },
    ],
    faqs: [
      {
        question: 'How do I know if my roof has hail damage?',
        answer:
          'Hail damage is often invisible from the ground — bruised shingles, cracked mats, and granule loss show up on close inspection. If hail hit your area, get a free professional inspection even if the roof looks fine.',
      },
      {
        question: 'Is a storm damage inspection really free?',
        answer: 'Yes. The inspection, photos, and damage report are completely free with no obligation.',
      },
      {
        question: 'How long after a storm can I file an insurance claim?',
        answer: 'Most policies in Georgia allow claims within one year of the storm date, but sooner is always better while evidence is fresh.',
      },
    ],
  },
  {
    slug: 'insurance-claims',
    name: 'Insurance Claims',
    headline: 'Insurance Claims Made Easy',
    intro:
      'We work for you, not the insurance company. From documentation to adjuster meetings to final invoice, we manage the entire claim process so your storm-damaged roof gets covered the way your policy promises.',
    signsTitle: 'When to File a Claim',
    signs: [
      'A hail or wind event hit your neighborhood',
      'An inspection found storm-related damage',
      'Your roof is leaking after severe weather',
      'Neighbors\u2019 claims are being approved',
      'Fallen limbs or debris struck your roof',
      'Your shingles show impact bruising',
    ],
    process: [
      { title: 'Free Inspection', description: 'We inspect the damage and document everything with photos and measurements.' },
      { title: 'We Handle Your Claim', description: 'We help you file, then meet your adjuster on the roof to walk through every item of damage.' },
      { title: 'Roof Restored', description: 'Once approved, we complete the work to code and bill the insurance company directly.' },
    ],
    faqs: [
      {
        question: 'Will filing a claim raise my insurance rates?',
        answer:
          'Storm damage claims are "acts of God" and are typically not held against you individually — rates in a region usually adjust after major storms whether you file or not.',
      },
      {
        question: 'What do I pay out of pocket?',
        answer: 'In most approved claims, you pay only your deductible. We review your policy with you so there are no surprises.',
      },
      {
        question: 'What if my claim gets denied?',
        answer:
          'Denials are often reversible with better documentation. We can request a re-inspection and present our photo evidence directly to your adjuster.',
      },
    ],
  },
  {
    slug: 'gutters',
    name: 'Gutters',
    headline: 'Seamless Gutters & Gutter Guards',
    intro:
      'Protect your foundation, siding, and landscaping with seamless gutters sized and pitched correctly for Georgia rainfall — installed to match your roofline and color scheme.',
    signsTitle: 'Signs You Need New Gutters',
    signs: [
      'Sagging, separating, or overflowing gutters',
      'Water pooling near the foundation',
      'Rust, cracks, or peeling paint on gutters',
      'Erosion or mulch washout below the roofline',
      'Water stains on siding or fascia',
      'Constant clogs from leaves and debris',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'What are seamless gutters?',
        answer:
          'Seamless gutters are formed on-site in continuous runs custom-cut to your home, eliminating the joints where leaks and clogs start.',
      },
      {
        question: 'Are gutters included in an insurance claim?',
        answer: 'If hail dented your gutters, they are often covered in the same claim as your roof. We document them during every storm inspection.',
      },
    ],
  },
  {
    slug: 'siding',
    name: 'Siding',
    headline: 'Siding Installation & Repair',
    intro:
      'Boost curb appeal and weather protection with quality vinyl and fiber-cement siding, color-matched and installed by the same crew standards we bring to every roof.',
    signsTitle: 'Signs Your Siding Needs Attention',
    signs: [
      'Cracked, warped, or loose panels',
      'Hail impact marks or holes',
      'Fading or chalky residue',
      'Higher energy bills from poor insulation',
      'Moisture, mold, or mildew under panels',
      'Rotting trim or fascia boards',
    ],
    process: defaultProcess,
    faqs: [
      {
        question: 'Can siding be covered by insurance?',
        answer: 'Yes — hail and wind damage to siding is commonly covered, and we document it as part of the same storm inspection as your roof.',
      },
      {
        question: 'Vinyl or fiber cement — which is better?',
        answer:
          'Vinyl is cost-effective and low maintenance; fiber cement offers superior durability and a premium look. We will walk you through both with samples and pricing.',
      },
    ],
  },
  {
    slug: 'roof-inspection',
    name: 'Roof Inspection',
    headline: 'Free Roof Inspections in West Metro Atlanta',
    intro:
      'A professional roof inspection catches small problems before they become expensive ones. Every inspection includes a full photo report and honest recommendations — free, with no obligation.',
    signsTitle: 'When to Get an Inspection',
    signs: [
      'After any hail or high-wind event',
      'Before buying or selling a home',
      'Roof is 10+ years old and never inspected',
      'Visible wear from the ground',
      'Before your insurance policy renews',
      'Peace of mind before storm season',
    ],
    process: [
      { title: 'Schedule', description: 'Pick a time that works — most inspections take under an hour.' },
      { title: 'Full Inspection', description: 'We check shingles, flashing, vents, gutters, and attic ventilation.' },
      { title: 'Photo Report', description: 'You get a clear photo report of what we found, in plain English.' },
      { title: 'Honest Advice', description: 'If your roof is fine, we tell you. If not, you get options and pricing.' },
    ],
    faqs: [
      {
        question: 'Is the inspection really free?',
        answer: 'Yes — completely free, including the photo report, with no obligation to hire us.',
      },
      {
        question: 'How often should a roof be inspected?',
        answer: 'Once a year is ideal in Georgia, plus after any significant hail or wind event.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
