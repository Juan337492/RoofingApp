import { Link } from 'expo-router';
import Head from 'expo-router/head';
import { Pressable, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { FaqAccordion, ProcessSteps, ReviewCard, TrustBar } from '@/components/sections';
import { HeroVideo } from '@/components/hero-video';
import { Body, CallButton, Chip, Heading, OrangeButton, Section } from '@/components/ui';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { getService, services } from '@/data/services';
import { locations } from '@/data/locations';

const homeReviews = [
  { name: 'Jason M.', place: 'Marietta', text: 'Dynamic Roofing made the whole process so easy after our storm damage. Great communication and amazing work!' },
  { name: 'Melissa T.', place: 'Smyrna', text: 'They handled everything with the insurance company and got our new roof approved quickly. Highly recommend!' },
  { name: 'Brian K.', place: 'Powder Springs', text: 'Professional, honest, and dependable. Our new roof looks fantastic and the cleanup was spotless.' },
];

const serviceBlurbs: Record<string, string> = {
  'roof-replacement': 'Durable, high-performance roofing installed with expert craftsmanship.',
  'roof-repair': 'Fast, reliable repairs for leaks, damage, and everyday wear.',
  'storm-damage-roofing': 'Storm damage experts — assessment, repairs, and restoration.',
  'insurance-claims': 'We handle the process and paperwork to get your claim approved.',
  gutters: 'Protect your home with seamless gutters and proper drainage.',
  siding: 'Boost curb appeal and protection with quality siding solutions.',
  'roof-inspection': 'Free professional inspections with full photo reports.',
};

export default function HomeScreen() {
  const claimSteps = getService('insurance-claims')!.process;

  return (
    <Screen>
      <Head>
        <title>Dynamic Roofing | Roofing & Storm Damage Experts in Dallas, GA</title>
        <meta
          name="description"
          content="Dallas, GA's trusted roofing and storm damage experts. Free roof inspections, insurance claim specialists, GAF certified. Serving west metro Atlanta."
        />
      </Head>
      <HeroVideo />
      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Text
          style={{
            color: Colors.orange,
            fontFamily: Fonts.headingMedium,
            fontSize: 13,
            lineHeight: 20,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}>
          Serving Dallas, GA & West Metro Atlanta
        </Text>
        <Heading level={1}>Dallas, GA{'\u2019'}s Trusted Roofing & Storm Damage Experts</Heading>
        <Body style={{ fontSize: 16 }}>
          High-quality roofing solutions. Local expertise. Built to protect what matters most.
        </Body>
        <View style={{ flexDirection: 'row' }}>
          <CallButton label="Free Roof Inspection" />
        </View>
      </Section>

      <TrustBar />

      {/* Services */}
      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>Our Services</Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {services.map((service) => (
            <Link key={service.slug} href={{ pathname: '/services/[slug]', params: { slug: service.slug } }} asChild>
              <Pressable style={{ flexGrow: 1, flexBasis: 280 }}>
                {({ pressed }) => (
                  <View
                    style={{
                      backgroundColor: pressed ? Colors.surfaceAlt : Colors.surface,
                      borderWidth: 1,
                      borderColor: pressed ? Colors.orange : Colors.border,
                      borderRadius: 8,
                      padding: Spacing.lg,
                      gap: Spacing.sm,
                      minHeight: 140,
                    }}>
                    <Heading level={3}>{service.name}</Heading>
                    <Body>{serviceBlurbs[service.slug]}</Body>
                    <Text style={{ color: Colors.orange, fontFamily: Fonts.headingMedium, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Learn More {'\u2192'}
                    </Text>
                  </View>
                )}
              </Pressable>
            </Link>
          ))}
        </View>
      </Section>

      {/* Insurance claims process */}
      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>Insurance Claims Made Easy</Heading>
        <ProcessSteps steps={claimSteps} />
      </Section>

      {/* Shingle comparison tools */}
      <Section style={{ gap: Spacing.md }}>
        <Heading level={2}>Pick Your Perfect Shingle</Heading>
        <Body>
          Compare popular GAF shingles side by side and explore Timberline HDZ{'\u00AE'} colors with our interactive
          tools.
        </Body>
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label="Open Shingle Comparison Tools" href="/shingles" />
        </View>
      </Section>

      {/* Reviews */}
      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>What Homeowners Say</Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {homeReviews.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </View>
      </Section>

      {/* Service areas */}
      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>Proudly Serving West Atlanta</Heading>
        <Body>Local team. Local knowledge. Exceptional results.</Body>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
          {locations.map((loc) => (
            <Chip key={loc.slug} label={loc.city} href={{ pathname: '/locations/[city]', params: { city: loc.slug } }} />
          ))}
        </View>
      </Section>

      {/* FAQ highlights */}
      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>Frequently Asked Questions</Heading>
        <FaqAccordion
          faqs={[
            ...getService('roof-replacement')!.faqs.slice(0, 2),
            ...getService('storm-damage-roofing')!.faqs.slice(0, 1),
            ...getService('insurance-claims')!.faqs.slice(0, 1),
          ]}
        />
      </Section>
    </Screen>
  );
}
