import { LinearGradient } from 'expo-linear-gradient';
import { msg, T, useGT, useMessages } from 'gt-react-native';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';

import { HeroVideo } from '@/components/hero-video';
import { Screen } from '@/components/screen';
import { PageMeta } from '@/components/seo';
import { ServiceAreaMap } from '@/components/service-area-map';
import { ShingleColors, ShingleField, ShingleSwatch, TimberlineColors } from '@/components/shingle-field';
import { FaqAccordion, FeaturedReview, ProcessSteps, ReviewCard, TrustBar } from '@/components/sections';
import {
  Body,
  Chip,
  firstPaint,
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
  'roof-replacement': msg('Full tear-off and new GAF Timberline HDZ roofs, usually done in one or two days.'),
  'roof-repair': msg('Leaks, missing shingles, flashing, and everyday wear, fixed fast.'),
  'storm-damage-roofing': msg('Hail and wind damage found, documented, and repaired.'),
  'insurance-claims': msg('We file with you and meet your adjuster on the roof.'),
  gutters: msg('Seamless gutters and guards that move water away from your home.'),
  siding: msg('Siding repair and replacement that keeps weather out.'),
  'roof-inspection': msg('Always free, with a photo report of everything we find.'),
};

/** CSS-only lengths (calc, max) that React Native's style types do not model. Web only. */
const css = (value: string) => value as unknown as number;

/**
 * One service in the index. The featured row runs the full width under an orange
 * rule, which also leaves an even number of rows to pair up beneath it.
 */
function ServiceRow({ slug, name, featured }: { slug: string; name: string; featured?: boolean }) {
  const isDesktop = useIsDesktop();
  const m = useMessages();
  return (
    <PressableLink
      href={{ pathname: '/services/[slug]', params: { slug } }}
      firstPaintName={featured ? undefined : 'service-row'}
      style={(state) => [
        featured
          ? { width: '100%', paddingTop: 22, paddingBottom: 28, borderTopWidth: 3, borderTopColor: Colors.orange, gap: 6 }
          : { width: isDesktop ? '47%' : '100%', paddingVertical: 20, borderTopWidth: 1, borderTopColor: Colors.border, gap: 4 },
        state.focused && { outlineColor: Colors.orange, outlineStyle: 'solid', outlineWidth: 3, outlineOffset: 2 },
      ]}>
      {(state: InteractionState) => (
        <>
          <Text
            style={{
              fontFamily: Fonts.heading,
              fontSize: featured ? 40 : 28,
              lineHeight: featured ? 44 : 32,
              color: state.hovered || state.pressed ? Colors.orange : Colors.white,
              textDecorationLine: state.hovered ? 'underline' : 'none',
            }}>
            {m(name)}
          </Text>
          <Body style={featured ? { fontSize: 18, lineHeight: 28 } : { fontSize: 16, lineHeight: 24 }}>{m(serviceBlurbs[slug])}</Body>
        </>
      )}
    </PressableLink>
  );
}

export default function HomeScreen() {
  const isDesktop = useIsDesktop();
  const gt = useGT();
  const claimSteps = getService('insurance-claims')!.process;
  // On wide web screens the video runs off the right edge of the window. That needs
  // CSS lengths, so tablets in the native app keep the two columns inside the page width.
  const bleed = isDesktop && Platform.OS === 'web';

  return (
    <Screen>
      <PageMeta title="Dynamic Roofing | Roofing & Storm Damage Experts in Dallas, GA" description="Dallas, GA's trusted roofing and storm damage experts. Free roof inspections, insurance claim specialists, GAF certified. Serving west metro Atlanta." />

      {/* Hero: headline and phone first, the crew's video beside it, over a charcoal roof that shingles itself */}
      <View style={{ backgroundColor: Colors.background, overflow: 'hidden' }}>
        <ShingleField colors={ShingleColors.charcoal} />
        {/* Fade the shingles out behind the text so the headline sits on near-solid black:
            left to right on desktop (text on the left), top to bottom on phones (text above the video). */}
        <View {...firstPaint('hero-fade')} style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
          <LinearGradient
            colors={['rgba(13, 13, 13, 0.97)', 'rgba(13, 13, 13, 0.9)', 'rgba(13, 13, 13, 0.3)', 'rgba(13, 13, 13, 0.05)']}
            locations={isDesktop ? [0, 0.4, 0.62, 1] : [0, 0.45, 0.75, 1]}
            start={{ x: 0, y: 0 }}
            end={isDesktop ? { x: 1, y: 0 } : { x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Section
          variant="transparent"
          firstPaintName="hero-section"
          // Tight to the header on phones so the headline starts right away.
          style={{
            paddingTop: isDesktop ? Spacing.xxl + 8 : Spacing.md,
            paddingBottom: isDesktop ? Spacing.xxl + 8 : Spacing.xl,
            // Left padding keeps the headline on the same line as the sections below (page width 1160, gutter 32).
            ...(bleed ? { maxWidth: '100%', paddingLeft: css('max(32px, calc(50% - 548px))'), paddingRight: 0 } : null),
          }}>
          <View {...firstPaint('hero-row')} style={{ flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? 40 : Spacing.xl, alignItems: 'center' }}>
            <View
              {...firstPaint('hero-copy')}
              style={[
                { gap: Spacing.md, alignSelf: 'stretch', justifyContent: 'center' },
                bleed ? { flexGrow: 0, flexShrink: 1, flexBasis: 460 } : isDesktop ? { flex: 5 } : null,
              ]}>
              <Heading level={1}>
                <T>GA{'\u2019'}s trusted roofing & storm damage experts</T>
              </Heading>
              <Body style={{ fontSize: 18, lineHeight: 28 }}>
                <T>
                  Free inspections, a photo report of everything we find, and help with your insurance claim from the first call to the
                  final invoice. Serving all of west metro Atlanta.
                </T>
              </Body>
              <View style={{ marginTop: Spacing.sm }}>
                <PhoneLettering />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, alignItems: 'center' }}>
                <OrangeButton label={gt('Book a free inspection')} onPress={() => Linking.openURL(Site.calendlyUrl)} />
              </View>
            </View>
            <View
              {...firstPaint('hero-media')}
              style={
                bleed
                  ? { flex: 1, minWidth: '50%', maxWidth: 960, marginLeft: 'auto' }
                  : isDesktop
                    ? { flex: 6 }
                    : // Phones: edge to edge, past the section's side padding.
                      { alignSelf: 'stretch', marginHorizontal: -Spacing.lg }
              }>
              <HeroVideo edge={bleed ? 'right' : isDesktop ? 'none' : 'both'} />
            </View>
          </View>
        </Section>
      </View>

      <TrustBar />

      {/* Services: a plain index of what we do, not a grid of cards */}
      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>What we fix and install</T>
        </Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {services.map((service, i) => (
            <ServiceRow key={service.slug} slug={service.slug} name={service.name} featured={i === 0} />
          ))}
        </View>
      </Section>

      {/* Insurance claims process: a real sequence, so it is numbered */}
      <Section alt style={{ gap: Spacing.xl }}>
        <View style={{ gap: Spacing.sm }}>
          <Heading level={2}>
            <T>How an insurance claim works with us</T>
          </Heading>
          <Body>
            <T>We work for you, not the insurance company. Most homeowners never have to argue with an adjuster.</T>
          </Body>
        </View>
        <ProcessSteps steps={claimSteps} />
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label={gt('Read about insurance claims')} variant="outline" href="/services/insurance-claims" />
        </View>
      </Section>

      {/* Reviews: the one light section, so the page changes pace halfway down */}
      <Section variant="light" style={{ gap: Spacing.xl }}>
        <Heading level={2}>
          <T>What homeowners say</T>
        </Heading>
        <FeaturedReview name={featured.name} service={featured.service} text={featured.text} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xl }}>
          {supporting.map((r) => (
            <ReviewCard key={r.name} name={r.name} place={r.service ?? msg('Google review')} text={r.text} />
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label={gt('Read all 30 reviews on Google')} variant="outline" onPress={() => Linking.openURL(Site.googleReviewsUrl)} />
        </View>
      </Section>

      {/* Shingle comparison tools */}
      {/* These two-column sections wrap with flexbox instead of checking the screen
          width, so they are laid out correctly before any JavaScript runs. Each column
          can shrink, so one that is alone on its row never runs past a narrow phone. */}
      <Section alt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.xxl }}>
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis:380, maxWidth: 500, gap: Spacing.md }}>
            <Heading level={2}>
              <T>Pick your shingle before we start</T>
            </Heading>
            <Body>
              <T>Compare popular GAF shingles side by side and see every Timberline HDZ{'®'} color on a real house.</T>
            </Body>
            <View style={{ flexDirection: 'row', marginTop: Spacing.sm }}>
              <OrangeButton label={gt('Compare shingles')} href="/shingles" />
            </View>
          </View>
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis:320, maxWidth: 548, gap: Spacing.md }}>
            {/* Three across at every width, so the six always make two even rows. */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: Spacing.lg }}>
              {TimberlineColors.map((color, i) => (
                <View key={color.name} style={{ width: '31%', gap: Spacing.sm }}>
                  <ShingleSwatch tabs={color.tabs} seed={i + 1} />
                  <Text style={{ fontFamily: Fonts.headingMedium, fontSize: 17, lineHeight: 20, letterSpacing: 0.3, color: Colors.white }}>
                    {color.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={{ fontFamily: Fonts.body, fontSize: 14, lineHeight: 20, color: Colors.granule }}>
              <T>Six Timberline HDZ{'®'} colors. Colors on a screen are approximate.</T>
            </Text>
          </View>
        </View>
      </Section>

      {/* Service areas */}
      <Section>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.xxl }}>
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis:300, maxWidth: 440, gap: Spacing.md }}>
            <Heading level={2}>
              <T>Where we work</T>
            </Heading>
            <Body>
              <T>Based in Dallas, GA, with crews across west metro Atlanta.</T>
            </Body>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: Spacing.xl, rowGap: Spacing.xs, marginTop: Spacing.sm }}>
              {locations.map((loc) => (
                <Chip key={loc.slug} label={loc.city} href={{ pathname: '/locations/[city]', params: { city: loc.slug } }} />
              ))}
            </View>
          </View>
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis:320, maxWidth: 500 }}>
            <ServiceAreaMap />
          </View>
        </View>
      </Section>

      {/* FAQ highlights */}
      <Section alt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', columnGap: Spacing.xxl, rowGap: Spacing.lg }}>
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis:260, maxWidth: 340, gap: Spacing.md }}>
            <Heading level={2}>
              <T>Common questions</T>
            </Heading>
            <Body>
              <T>Have a question that isn{'’'}t here? Call and ask.</T>
            </Body>
            <PhoneLettering size={36} />
          </View>
          <View style={{ flexGrow: 2, flexShrink: 1, flexBasis: 320, maxWidth: 700 }}>
            <FaqAccordion
              faqs={[
                ...getService('roof-replacement')!.faqs.slice(0, 2),
                ...getService('storm-damage-roofing')!.faqs.slice(0, 1),
                ...getService('insurance-claims')!.faqs.slice(0, 1),
              ]}
            />
          </View>
        </View>
      </Section>
    </Screen>
  );
}
