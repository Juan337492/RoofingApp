/**
 * Real 5-star Google reviews from the Dynamic Roofing and Construction LLC
 * Google Business Profile (5.0 rating, 30 reviews). Text is quoted verbatim
 * (shortened with "..." where noted) — do not edit the wording.
 * Pulled from Google on Sep 20, 2026.
 */
export type GoogleReview = {
  name: string;
  text: string;
  service?: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: 'Heidi Swanson',
    service: 'Roof Installation',
    text: 'I\u2019ve had multiple properties roof\u2019s redone with Dynamic Roofing. They are always a great price, very prompt and neat! I can\u2019t say enough good things about them! Thank you Victor for always coming through for me and your great service!',
  },
  {
    name: 'Janice Brooks',
    service: 'Insurance Claim',
    text: 'Dynamic did an outstanding job on our roof. The staff exhibit a vast knowledge of professional skills as evidence to work diligently with our insurance company to get an approval. I highly recommend the company to our neighborhood, family and friends. Our home with the new roof is definitely beautiful.',
  },
  {
    name: 'Zach Cohen',
    service: 'Roof Inspection',
    text: 'Had a great experience with them! They were very professional and Carlos was very helpful to talk to and consider all our options. Would highly recommend!',
  },
  {
    name: 'Katie Wetherbee',
    service: 'Roof Repair',
    text: 'We\u2019ve worked with Victor and his father for years for various roofing repairs; they are kind, reasonable, responsive, and get the job done. We\u2019re grateful for their services!',
  },
  {
    name: 'Derry West',
    service: 'Storm Damage Repair',
    text: 'I\u2019d had a number of roofers approach me after they\u2019d noticed, but they all were only interested in a complete replacement of the roof. Dynamic offered to repair just the damaged area, and I agreed to their price. After they\u2019d completed the work they actually ended up charging me $100 less than I was originally quoted, and they did a great job! I highly recommend them!',
  },
  {
    name: 'Fatou Menga',
    service: 'Roof Repair',
    text: 'We hired Dynamic Roofing for chimney and roofing repairs, and Victor and his team did an absolutely phenomenal job. They are professional, highly skilled, punctual, and makes sure everything is completed to the highest standard. It\u2019s incredibly rare these days to find a team with this level of craftsmanship, responsiveness, and old-school professional courtesy. Highly recommend this team!',
  },
  {
    name: 'Tina Criss',
    service: 'Roof Repair',
    text: 'I had an outstanding experience with Dynamic Roofing from start to finish. Carlos took the time to truly educate me, explaining every step of the process and even breaking down how my insurance worked. In the end, I couldn\u2019t be happier with the service I received. I will definitely be referring Dynamic Roofing to everyone I know!',
  },
  {
    name: 'Xavier Ellis',
    service: 'Roof Repair',
    text: 'Dynamic Roofing was very professional and timely. Once the work started they found another issue inside the roof, we discussed the issue and agreed on the price. We are throughly satisfied. They also take pictures before and after so you the customer can see what they fixed. Thank you',
  },
  {
    name: 'Lisa Thomas',
    service: 'Roof Installation',
    text: 'Dynamic Roofing Company delivered exceptional service, going above and beyond to install our roof properly and taking great care of our property. They were professional, knowledgeable, friendly, using tarps to protect the house and yard. Highly recommend!',
  },
  {
    name: 'Alina Tkachenko',
    service: 'Roof Inspection',
    text: 'Carlos came to do an inspection for our home. He was very thorough and answered our questions. This company really cares for the interests of the homeowners. People you can trust and know they have your good in mind. Would recommend!',
  },
];

/** Returns `count` reviews starting at a stable offset, wrapping around the pool. */
export function pickReviews(offset: number, count: number): GoogleReview[] {
  const start = ((offset % googleReviews.length) + googleReviews.length) % googleReviews.length;
  const picked: GoogleReview[] = [];
  for (let i = 0; i < Math.min(count, googleReviews.length); i++) {
    picked.push(googleReviews[(start + i) % googleReviews.length]);
  }
  return picked;
}
