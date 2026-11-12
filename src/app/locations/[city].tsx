import { Redirect, useLocalSearchParams } from 'expo-router';
import { msg, T, useGT, useMessages, Var } from 'gt-react-native';
import { Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { PageMeta } from '@/components/seo';
import { FaqAccordion, ReviewCard, StatBlock } from '@/components/sections';
import { Body, CallButton, CheckItem, Chip, Heading, Section } from '@/components/ui';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { getLocation, getNearby, locations } from '@/data/locations';
import { pickReviews } from '@/data/reviews';

export function generateStaticParams(): { city: string }[] {
  return locations.map((l) => ({ city: l.slug }));
}

export default function LocationScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const location = getLocation(city);
  const gt = useGT();
  const m = useMessages();

  if (!location) {
    return <Redirect href="/" />;
  }

  // Real Google reviews, rotated so each city page shows a different pair.
  const cityIndex = locations.findIndex((l) => l.slug === location.slug);
  const cityReviews = pickReviews(cityIndex * 2, 2);

  return (
    <Screen ctaTitle={gt('Storm Damage in {city}? We\u2019re Here to Help', { city: location.city })}>
      <PageMeta title={`Roofing Contractor in ${location.city}, GA | Dynamic Roofing`} description={location.intro} />
      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Text style={{ color: Colors.orange, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>
          {location.city}, GA
        </Text>
        <Heading level={1}>
          <T>Roofing Contractor in <Var>{location.city}</Var>, GA</T>
        </Heading>
        <Body style={{ fontSize: 16 }}>{m(location.intro)}</Body>
        <View style={{ flexDirection: 'row' }}>
          <CallButton label={gt('Schedule Free Inspection')} />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Neighborhoods We Serve in <Var>{location.city}</Var></T>
        </Heading>
        <View style={{ gap: Spacing.sm }}>
          {location.neighborhoods.map((n) => (
            <CheckItem key={n} text={n} />
          ))}
        </View>
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Recent Projects in <Var>{location.city}</Var></T>
        </Heading>
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
              <Heading level={3}>{m(p.type)}</Heading>
              <Body>{m(p.description)}</Body>
            </View>
          ))}
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T><Var>{location.city}</Var> by the Numbers</T>
        </Heading>
        <StatBlock stats={location.stats} />
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>What Homeowners Say</T>
        </Heading>
        <Body>
          <T>Real reviews from our Google Business Profile — rated 5.0 from 30 reviews.</T>
        </Body>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {cityReviews.map((r) => (
            <ReviewCard key={r.name} name={r.name} place={r.service ?? msg('Google review')} text={r.text} />
          ))}
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>FAQ for <Var>{location.city}</Var> Homeowners</T>
        </Heading>
        <FaqAccordion faqs={location.faqs} />
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Nearby Areas We Serve</T>
        </Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
          {getNearby(location.slug).map((l) => (
            <Chip key={l.slug} label={l.city} href={{ pathname: '/locations/[city]', params: { city: l.slug } }} />
          ))}
        </View>
      </Section>
    </Screen>
  );
}
