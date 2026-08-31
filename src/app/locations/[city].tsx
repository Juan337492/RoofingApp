import { Redirect, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { FaqAccordion, ReviewCard, StatBlock } from '@/components/sections';
import { Body, CallButton, CheckItem, Chip, Heading, Section } from '@/components/ui';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { getLocation, getNearby, locations } from '@/data/locations';

export function generateStaticParams(): { city: string }[] {
  return locations.map((l) => ({ city: l.slug }));
}

export default function LocationScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const location = getLocation(city);

  if (!location) {
    return <Redirect href="/" />;
  }

  return (
    <Screen ctaTitle={`Storm Damage in ${location.city}? We\u2019re Here to Help`}>
      <Head>
        <title>{`Roofing Contractor in ${location.city}, GA | Dynamic Roofing`}</title>
        <meta name="description" content={location.intro} />
      </Head>
      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Text style={{ color: Colors.orange, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>
          {location.city}, GA
        </Text>
        <Heading level={1}>Roofing Contractor in {location.city}, GA</Heading>
        <Body style={{ fontSize: 16 }}>{location.intro}</Body>
        <View style={{ flexDirection: 'row' }}>
          <CallButton label="Schedule Free Inspection" />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>Neighborhoods We Serve in {location.city}</Heading>
        <View style={{ gap: Spacing.sm }}>
          {location.neighborhoods.map((n) => (
            <CheckItem key={n} text={n} />
          ))}
        </View>
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>Recent Projects in {location.city}</Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {location.projects.map((p) => (
            <View
              key={p.neighborhood + p.type}
              style={{
                flexGrow: 1,
                flexBasis: 280,
                backgroundColor: Colors.surfaceAlt,
                borderWidth: 1,
                borderColor: Colors.border,
                borderRadius: 8,
                padding: Spacing.lg,
                gap: Spacing.sm,
              }}>
              <Text style={{ color: Colors.orange, fontFamily: Fonts.headingMedium, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                {p.neighborhood}
              </Text>
              <Heading level={3}>{p.type}</Heading>
              <Body>{p.description}</Body>
            </View>
          ))}
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>{location.city} by the Numbers</Heading>
        <StatBlock stats={location.stats} />
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>Reviews from {location.city} Homeowners</Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {location.reviews.map((r) => (
            <ReviewCard key={r.name} name={r.name} place={`${r.neighborhood}, ${location.city}`} text={r.text} />
          ))}
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>FAQ for {location.city} Homeowners</Heading>
        <FaqAccordion faqs={location.faqs} />
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>Nearby Areas We Serve</Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
          {getNearby(location.slug).map((l) => (
            <Chip key={l.slug} label={l.city} href={{ pathname: '/locations/[city]', params: { city: l.slug } }} />
          ))}
        </View>
      </Section>
    </Screen>
  );
}
