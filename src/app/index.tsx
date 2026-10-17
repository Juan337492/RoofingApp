import { LinearGradient } from 'expo-linear-gradient';
import Head from 'expo-router/head';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { HeroVideo } from '@/components/hero-video';
import { Screen } from '@/components/screen';
import { ShingleColors, ShingleField } from '@/components/shingle-field';
import { FaqAccordion, FeaturedReview, ProcessSteps, ReviewCard, TrustBar } from '@/components/sections';
import {
  Body,
  Chip,
  Heading,
  OrangeButton,
  PhoneLettering,
  PressableLink,
  Section,
  useIsDesktop,
  type InteractionState,
} from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { googleReviews } from '@/data/reviews';
import { getService, services } from '@/data/services';
import { locations } from '@/data/locations';

// Real 5-star Google reviews (see src/data/reviews.ts): one featured, two supporting.
const featured = googleReviews.find((r) => r.name === 'Janice Brooks')!;
const supporting = ['Alina Tkachenko', 'Heidi Swanson'].map((n) => googleReviews.find((r) => r.name === n)!);

const serviceBlurbs: Record<string, string> = {
  'roof-replacement': 'Full tear-off and new GAF Timberline HDZ roofs, usually done in one or two days.',
  'roof-repair': 'Leaks, missing shingles, flashing, and everyday wear, fixed fast.',
  'storm-damage-roofing': 'Hail and wind damage found, documented, and repaired.',
  'insurance-claims': 'We file with you and meet your adjuster on the roof.',
  gutters: 'Seamless gutters and guards that move water away from your home.',
  siding: 'Siding repair and replacement that keeps weather out.',
  'roof-inspection': 'Always free, with a photo report of everything we find.',
};

function ServiceRow({ slug, name }: { slug: string; name: string }) {
  const isDesktop = useIsDesktop();
  return (
    <PressableLink
      href={{ pathname: '/services/[slug]', params: { slug } }}
      style={(state) => [
        { width: isDesktop ? '47%' : '100%', paddingVertical: 20, borderTopWidth: 1, borderTopColor: Colors.border, gap: 4 },
        state.focused && { outlineColor: Colors.orange, outlineStyle: 'solid', outlineWidth: 3, outlineOffset: 2 },
      ]}>
      {(state: InteractionState) => (
        <>
          <Text
            style={{
              fontFamily: Fonts.heading,
              fontSize: 28,
              lineHeight: 32,
              color: state.hovered || state.pressed ? Colors.orange : Colors.white,
              textDecorationLine: state.hovered ? 'underline' : 'none',
            }}>
            {name}
          </Text>
          <Body style={{ fontSize: 16, lineHeight: 24 }}>{serviceBlurbs[slug]}</Body>
        </>
      )}
    </PressableLink>
  );
}

export default function HomeScreen() {
  const isDesktop = useIsDesktop();
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

      {/* Hero: headline and phone first, the crew's video beside it, over a charcoal roof that shingles itself */}
      <View style={{ backgroundColor: Colors.background, overflow: 'hidden' }}>
        <ShingleField colors={ShingleColors.charcoal} />
        {/* Fade the shingles out behind the text so the headline sits on near-solid black:
            left to right on desktop (text on the left), top to bottom on phones (text above the video). */}
        <LinearGradient
          colors={['rgba(13, 13, 13, 0.97)', 'rgba(13, 13, 13, 0.9)', 'rgba(13, 13, 13, 0.3)', 'rgba(13, 13, 13, 0.05)']}
          locations={isDesktop ? [0, 0.4, 0.62, 1] : [0, 0.45, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={isDesktop ? { x: 1, y: 0 } : { x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}
        />
        <Section
          variant="transparent"
          // Tight to the header on phones so the headline starts right away.
          style={{ paddingTop: isDesktop ? Spacing.xxl + 8 : Spacing.md, paddingBottom: isDesktop ? Spacing.xxl + 8 : Spacing.xl }}>
          <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? Spacing.xxl : Spacing.xl, alignItems: 'center' }}>
            <View style={{ flex: isDesktop ? 5 : undefined, gap: Spacing.md, alignSelf: 'stretch', justifyContent: 'center' }}>
              <Heading level={1}>GA{'\u2019'}s trusted roofing & storm damage experts</Heading>
              <Body style={{ fontSize: 18, lineHeight: 28 }}>
                Free inspections, a photo report of everything we find, and help with your insurance claim from the first call to the final
                invoice. Serving all of west metro Atlanta.
              </Body>
              <View style={{ marginTop: Spacing.sm }}>
                <PhoneLettering />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, alignItems: 'center' }}>
                <OrangeButton label="Book a free inspection" onPress={() => Linking.openURL(Site.calendlyUrl)} />
              </View>
            </View>
            <View style={{ flex: isDesktop ? 6 : undefined, width: isDesktop ? undefined : '100%' }}>
              <HeroVideo />
            </View>
          </View>
        </Section>
      </View>

      <TrustBar />

      {/* Services: a plain index of what we do, not a grid of cards */}
      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>What we fix and install</Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {services.map((service) => (
            <ServiceRow key={service.slug} slug={service.slug} name={service.name} />
          ))}
        </View>
      </Section>

      {/* Insurance claims process: a real sequence, so it is numbered */}
      <Section alt style={{ gap: Spacing.xl }}>
        <View style={{ gap: Spacing.sm }}>
          <Heading level={2}>How an insurance claim works with us</Heading>
          <Body>We work for you, not the insurance company. Most homeowners never have to argue with an adjuster.</Body>
        </View>
        <ProcessSteps steps={claimSteps} />
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label="Read about insurance claims" variant="outline" href="/services/insurance-claims" />
        </View>
      </Section>

      {/* Reviews */}
      <Section style={{ gap: Spacing.xl }}>
        <Heading level={2}>What homeowners say</Heading>
        <FeaturedReview name={featured.name} service={featured.service} text={featured.text} />
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: Spacing.xl }}>
          {supporting.map((r) => (
            <ReviewCard key={r.name} name={r.name} place={r.service ?? 'Google review'} text={r.text} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label="Read all 30 reviews on Google" variant="outline" onPress={() => Linking.openURL(Site.googleReviewsUrl)} />
        </View>
      </Section>

      {/* Shingle comparison tools */}
      <Section alt style={{ gap: Spacing.md }}>
        <Heading level={2}>Pick your shingle before we start</Heading>
        <Body>Compare popular GAF shingles side by side and see every Timberline HDZ{'®'} color on a real house.</Body>
        <View style={{ flexDirection: 'row', marginTop: Spacing.sm }}>
          <OrangeButton label="Compare shingles" href="/shingles" />
        </View>
      </Section>

      {/* Service areas */}
      <Section style={{ gap: Spacing.md }}>
        <Heading level={2}>Where we work</Heading>
        <Body>Based in Dallas, GA, with crews across west metro Atlanta.</Body>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: Spacing.xl, rowGap: Spacing.xs, marginTop: Spacing.sm }}>
          {locations.map((loc) => (
            <Chip key={loc.slug} label={loc.city} href={{ pathname: '/locations/[city]', params: { city: loc.slug } }} />
          ))}
        </View>
      </Section>

      {/* FAQ highlights */}
      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>Common questions</Heading>
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
