import { msg } from 'gt-react-native';

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
  { title: msg('Free inspection'), description: msg('We thoroughly inspect your roof, document any damage, and give you honest recommendations.') },
  { title: msg('Materials and quote'), description: msg('We help you choose the right materials and provide a detailed, transparent quote with no surprises.') },
  { title: msg('Installation day'), description: msg('Our crew shows up on time, works efficiently, and treats your property with care and respect.') },
  { title: msg('Final walkthrough'), description: msg('We inspect every detail with you to make sure the work meets our high standards before we leave.') },
];

export const services: Service[] = [
  {
    slug: 'roof-replacement',
    name: msg('Roof replacement'),
    headline: msg('Roof replacement in Dallas, GA and west metro Atlanta'),
    intro:
      msg('Durable, high-performance GAF Timberline HDZ roofing systems installed with expert craftsmanship. We handle everything from tear-off to final inspection, and we help you get insurance to cover it when storm damage qualifies.'),
    signsTitle: msg('Signs you need a new roof'),
    signs: [
      msg('Missing or curling shingles'),
      msg('Granules collecting in your gutters'),
      msg('Roof is over 20 years old'),
      msg('Water stains on ceilings or walls'),
      msg('Sagging or soft spots on the roof deck'),
      msg('Storm damage or high winds in your area'),
    ],
    process: defaultProcess,
    faqs: [
      {
        question: msg('How much does a roof replacement cost in Georgia?'),
        answer:
          msg('The cost depends on the size of your roof, the materials selected, and the complexity of the job. On average, homeowners in Georgia invest between $8,000 and $15,000. We provide free, no-obligation quotes so you know exactly what to expect.'),
      },
      {
        question: msg('How long does a GAF Timberline HDZ roof last?'),
        answer:
          msg('GAF Timberline HDZ shingles are engineered to last 25 to 30 years or more with proper installation and ventilation, and they come with strong manufacturer warranties.'),
      },
      {
        question: msg('Will insurance cover my roof replacement?'),
        answer:
          msg('If your roof was damaged by hail, wind, or a storm, your homeowners insurance may cover most or all of the replacement. We inspect for free, document everything, and work with your insurance company on your behalf.'),
      },
      {
        question: msg('How long does installation take?'),
        answer: msg('Most residential roof replacements are completed in one to two days, weather permitting.'),
      },
    ],
  },
  {
    slug: 'roof-repair',
    name: msg('Roof repair'),
    headline: msg('Fast, reliable roof repair in west metro Atlanta'),
    intro:
      msg('From leaks and missing shingles to flashing failures and everyday wear, we diagnose the real problem and fix it right the first time — with honest advice on whether a repair or replacement makes more sense.'),
    signsTitle: msg('Signs your roof needs repair'),
    signs: [
      msg('Active leaks or water stains after rain'),
      msg('A few missing, cracked, or lifted shingles'),
      msg('Damaged flashing around chimneys or vents'),
      msg('Shingle debris in the yard after storms'),
      msg('Daylight visible in the attic'),
      msg('Moss or algae growth holding moisture'),
    ],
    process: defaultProcess,
    faqs: [
      {
        question: msg('How much does a roof repair cost?'),
        answer:
          msg('Minor repairs often run a few hundred dollars, while larger repairs vary with the extent of the damage. Every repair starts with a free inspection and an upfront quote.'),
      },
      {
        question: msg('Should I repair or replace my roof?'),
        answer:
          msg('If the damage is isolated and your roof is under 15 years old, a repair usually makes sense. If damage is widespread or the roof is near the end of its life, replacement is often the better investment. We give you an honest recommendation either way.'),
      },
      {
        question: msg('How fast can you fix a leak?'),
        answer: msg('We prioritize active leaks and can typically get a crew out within 24 to 48 hours, faster after major storms.'),
      },
    ],
  },
  {
    slug: 'storm-damage-roofing',
    name: msg('Storm damage'),
    headline: msg('Storm and hail damage roofing'),
    intro:
      msg('West metro Atlanta takes real hail and wind every year. We are storm damage specialists: free post-storm inspections, complete photo documentation, emergency tarping, and full restoration — with your insurance claim handled for you.'),
    signsTitle: msg('Signs of storm damage'),
    signs: [
      msg('Hail hit your area recently — even small hail damages shingles'),
      msg('Missing or creased shingles after high winds'),
      msg('Dents in gutters, downspouts, or vents'),
      msg('Granule loss exposing black substrate'),
      msg('Neighbors getting roofs replaced'),
      msg('Water intrusion after a storm'),
    ],
    process: [
      { title: msg('Free storm inspection'), description: msg('We inspect and photo-document every slope, gutter, and vent for hail and wind damage.') },
      { title: msg('Claim filed and supported'), description: msg('We help you file the claim and meet the insurance adjuster on your roof so nothing gets missed.') },
      { title: msg('Approval and materials'), description: msg('Once approved, you pick your shingle color and we schedule your build.') },
      { title: msg('Roof restored'), description: msg('Your roof is repaired or replaced with quality you can trust, typically in one day.') },
    ],
    faqs: [
      {
        question: msg('How do I know if my roof has hail damage?'),
        answer:
          msg('Hail damage is often invisible from the ground — bruised shingles, cracked mats, and granule loss show up on close inspection. If hail hit your area, get a free professional inspection even if the roof looks fine.'),
      },
      {
        question: msg('Is a storm damage inspection really free?'),
        answer: msg('Yes. The inspection, photos, and damage report are completely free with no obligation.'),
      },
      {
        question: msg('How long after a storm can I file an insurance claim?'),
        answer: msg('Most policies in Georgia allow claims within one year of the storm date, but sooner is always better while evidence is fresh.'),
      },
    ],
  },
  {
    slug: 'insurance-claims',
    name: msg('Insurance claims'),
    headline: msg('Insurance claims, handled for you'),
    intro:
      msg('We work for you, not the insurance company. From documentation to adjuster meetings to final invoice, we manage the entire claim process so your storm-damaged roof gets covered the way your policy promises.'),
    signsTitle: msg('When to file a claim'),
    signs: [
      msg('A hail or wind event hit your neighborhood'),
      msg('An inspection found storm-related damage'),
      msg('Your roof is leaking after severe weather'),
      msg('Neighbors\u2019 claims are being approved'),
      msg('Fallen limbs or debris struck your roof'),
      msg('Your shingles show impact bruising'),
    ],
    process: [
      { title: msg('Free inspection'), description: msg('We inspect the damage and document everything with photos and measurements.') },
      { title: msg('We handle your claim'), description: msg('We help you file, then meet your adjuster on the roof to walk through every item of damage.') },
      { title: msg('Roof restored'), description: msg('Once approved, we complete the work to code and bill the insurance company directly.') },
    ],
    faqs: [
      {
        question: msg('Will filing a claim raise my insurance rates?'),
        answer:
          msg('Storm damage claims are "acts of God" and are typically not held against you individually — rates in a region usually adjust after major storms whether you file or not.'),
      },
      {
        question: msg('What do I pay out of pocket?'),
        answer: msg('In most approved claims, you pay only your deductible. We review your policy with you so there are no surprises.'),
      },
      {
        question: msg('What if my claim gets denied?'),
        answer:
          msg('Denials are often reversible with better documentation. We can request a re-inspection and present our photo evidence directly to your adjuster.'),
      },
    ],
  },
  {
    slug: 'gutters',
    name: msg('Gutters'),
    headline: msg('Seamless gutters and gutter guards'),
    intro:
      msg('Protect your foundation, siding, and landscaping with seamless gutters sized and pitched correctly for Georgia rainfall — installed to match your roofline and color scheme.'),
    signsTitle: msg('Signs you need new gutters'),
    signs: [
      msg('Sagging, separating, or overflowing gutters'),
      msg('Water pooling near the foundation'),
      msg('Rust, cracks, or peeling paint on gutters'),
      msg('Erosion or mulch washout below the roofline'),
      msg('Water stains on siding or fascia'),
      msg('Constant clogs from leaves and debris'),
    ],
    process: defaultProcess,
    faqs: [
      {
        question: msg('What are seamless gutters?'),
        answer:
          msg('Seamless gutters are formed on-site in continuous runs custom-cut to your home, eliminating the joints where leaks and clogs start.'),
      },
      {
        question: msg('Are gutters included in an insurance claim?'),
        answer: msg('If hail dented your gutters, they are often covered in the same claim as your roof. We document them during every storm inspection.'),
      },
    ],
  },
  {
    slug: 'siding',
    name: msg('Siding'),
    headline: msg('Siding installation and repair'),
    intro:
      msg('Boost curb appeal and weather protection with quality vinyl and fiber-cement siding, color-matched and installed by the same crew standards we bring to every roof.'),
    signsTitle: msg('Signs your siding needs attention'),
    signs: [
      msg('Cracked, warped, or loose panels'),
      msg('Hail impact marks or holes'),
      msg('Fading or chalky residue'),
      msg('Higher energy bills from poor insulation'),
      msg('Moisture, mold, or mildew under panels'),
      msg('Rotting trim or fascia boards'),
    ],
    process: defaultProcess,
    faqs: [
      {
        question: msg('Can siding be covered by insurance?'),
        answer: msg('Yes — hail and wind damage to siding is commonly covered, and we document it as part of the same storm inspection as your roof.'),
      },
      {
        question: msg('Vinyl or fiber cement — which is better?'),
        answer:
          msg('Vinyl is cost-effective and low maintenance; fiber cement offers superior durability and a premium look. We will walk you through both with samples and pricing.'),
      },
    ],
  },
  {
    slug: 'roof-inspection',
    name: msg('Roof inspection'),
    headline: msg('Free roof inspections in west metro Atlanta'),
    intro:
      msg('A professional roof inspection catches small problems before they become expensive ones. Every inspection includes a full photo report and honest recommendations — free, with no obligation.'),
    signsTitle: msg('When to get an inspection'),
    signs: [
      msg('After any hail or high-wind event'),
      msg('Before buying or selling a home'),
      msg('Roof is 10+ years old and never inspected'),
      msg('Visible wear from the ground'),
      msg('Before your insurance policy renews'),
      msg('Peace of mind before storm season'),
    ],
    process: [
      { title: msg('Schedule'), description: msg('Pick a time that works — most inspections take under an hour.') },
      { title: msg('Full inspection'), description: msg('We check shingles, flashing, vents, gutters, and attic ventilation.') },
      { title: msg('Photo report'), description: msg('You get a clear photo report of what we found, in plain English.') },
      { title: msg('Honest advice'), description: msg('If your roof is fine, we tell you. If not, you get options and pricing.') },
    ],
    faqs: [
      {
        question: msg('Is the inspection really free?'),
        answer: msg('Yes — completely free, including the photo report, with no obligation to hire us.'),
      },
      {
        question: msg('How often should a roof be inspected?'),
        answer: msg('Once a year is ideal in Georgia, plus after any significant hail or wind event.'),
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
