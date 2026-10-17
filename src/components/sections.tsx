import { Image } from 'expo-image';
import { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';

import { ShingleField } from '@/components/shingle-field';
import { Body, Heading, OrangeButton, PhoneLettering, Section, Stars, useIsDesktop, useTone, type InteractionState } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import type { Faq } from '@/data/services';

/** Closing call to action on the logo orange, over a roof that shingles itself. */
export function CtaBand({ title, subtitle }: { title: string; subtitle?: string }) {
  const isDesktop = useIsDesktop();
  return (
    <View style={{ backgroundColor: Colors.orange, overflow: 'hidden' }}>
      <ShingleField />
      <Section variant="transparent" style={{ paddingVertical: isDesktop ? Spacing.xxxl : Spacing.xxl }}>
        <View
          style={{
            flexDirection: isDesktop ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: isDesktop ? 'flex-end' : 'flex-start',
            gap: Spacing.lg,
          }}>
          <View style={{ gap: Spacing.sm, flexShrink: 1 }}>
            <Heading level={2}>{title}</Heading>
            {subtitle ? <Body style={{ color: '#FFE7D6' }}>{subtitle}</Body> : null}
          </View>
          <View style={{ gap: Spacing.md, alignItems: 'flex-start' }}>
            <PhoneLettering color={Colors.white} />
            <OrangeButton variant="white" label="Book a free inspection" onPress={() => Linking.openURL(Site.calendlyUrl)} />
          </View>
        </View>
      </Section>
    </View>
  );
}

const trustFacts = [
  { title: 'Licensed and insured', detail: 'Every crew member, every job.' },
  { title: 'rating', detail: '' },
  { title: 'On your side with insurance', detail: 'We meet your adjuster on the roof.' },
];

/** Google rating shown as stars beside a large score, instead of a sentence. */
export function RatingBadge() {
  const tone = useTone();
  return (
    <View style={{ gap: 2 }} aria-label="Rated 5.0 out of 5 from 30 Google reviews">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontFamily: Fonts.display, fontSize: 34, lineHeight: 36, color: tone === 'light' ? Colors.ink : Colors.white }}>5.0</Text>
        <Stars size={22} />
      </View>
      <Text style={{ fontFamily: Fonts.body, fontSize: 15, lineHeight: 22, color: tone === 'light' ? Colors.inkSecondary : Colors.textSecondary }}>
        30 Google reviews
      </Text>
    </View>
  );
}

export function TrustBar() {
  const isDesktop = useIsDesktop();

  return (
    <Section variant="raised" style={{ paddingVertical: Spacing.xl }}>
      <View
        style={{
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: isDesktop ? 'center' : 'flex-start',
          gap: isDesktop ? Spacing.xxl : Spacing.lg,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
          <Image
            source={require('../../assets/images/gaf-certified.png')}
            style={{ width: 92, height: 92 }}
            contentFit="contain"
            accessibilityLabel="GAF Certified Residential Roofing Contractor"
          />
          <Image
            source={require('../../assets/images/atlas-gold.png')}
            style={{ width: 92, height: 92 }}
            contentFit="contain"
            accessibilityLabel="Atlas Pro Plus Gold certified contractor"
          />
        </View>
        <View style={{ flex: isDesktop ? 1 : undefined, flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? Spacing.xl : Spacing.md }}>
          {trustFacts.map((fact) => (
            <View key={fact.title} style={{ flex: isDesktop ? 1 : undefined, gap: 2 }}>
              {fact.title === 'rating' ? (
                <RatingBadge />
              ) : (
                <>
                  <Text style={{ fontFamily: Fonts.heading, fontSize: 22, color: Colors.white }}>{fact.title}</Text>
                  <Text style={{ fontFamily: Fonts.body, fontSize: 15, lineHeight: 22, color: Colors.textSecondary }}>{fact.detail}</Text>
                </>
              )}
            </View>
          ))}
        </View>
      </View>
    </Section>
  );
}

/** Numbered because the content is a real sequence; horizontal on desktop. */
export function ProcessSteps({ steps }: { steps: { title: string; description: string }[] }) {
  const isDesktop = useIsDesktop();
  const tone = useTone();
  return (
    <View role="list" style={{ flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? Spacing.xl : Spacing.lg }}>
      {steps.map((step, i) => (
        <View
          role="listitem"
          key={step.title}
          style={{
            flex: isDesktop ? 1 : undefined,
            flexDirection: isDesktop ? 'column' : 'row',
            gap: isDesktop ? Spacing.sm : Spacing.md,
            borderTopWidth: isDesktop ? 3 : 0,
            borderTopColor: Colors.orange,
            paddingTop: isDesktop ? Spacing.md : 0,
          }}>
          <Text
            style={{
              fontFamily: Fonts.display,
              fontSize: isDesktop ? 56 : 44,
              lineHeight: isDesktop ? 56 : 44,
              color: Colors.orange,
              minWidth: isDesktop ? undefined : 32,
            }}>
            {i + 1}
          </Text>
          <View style={{ flex: isDesktop ? undefined : 1, gap: 6 }}>
            <Heading level={3}>{step.title}</Heading>
            <Body style={{ color: tone === 'light' ? Colors.inkSecondary : Colors.textSecondary }}>{step.description}</Body>
          </View>
        </View>
      ))}
    </View>
  );
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const tone = useTone();
  const ink = tone === 'light' ? Colors.ink : Colors.white;
  const rule = tone === 'light' ? '#C9CDD1' : Colors.border;
  return (
    <View style={{ borderTopWidth: 1, borderTopColor: rule, maxWidth: 860 }}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <View key={faq.question} style={{ borderBottomWidth: 1, borderBottomColor: rule }}>
            <Pressable
              role="button"
              aria-expanded={isOpen}
              onPress={() => setOpen(isOpen ? null : i)}
              style={(state: InteractionState) => [
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, gap: Spacing.md },
                state.focused && { outlineColor: Colors.orange, outlineStyle: 'solid', outlineWidth: 3, outlineOffset: 2 },
              ]}>
              {(state: InteractionState) => (
                <>
                  <Text
                    style={{
                      flex: 1,
                      color: state.hovered ? Colors.orange : ink,
                      fontFamily: Fonts.bodyMedium,
                      fontSize: 18,
                      lineHeight: 26,
                    }}>
                    {faq.question}
                  </Text>
                  <Text style={{ color: Colors.orange, fontSize: 26, lineHeight: 26, fontFamily: Fonts.body }}>{isOpen ? '−' : '+'}</Text>
                </>
              )}
            </Pressable>
            {isOpen ? (
              <View style={{ paddingBottom: 22, paddingRight: Spacing.xl }}>
                <Body>{faq.answer}</Body>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

/** One review set large; the rest use ReviewCard. */
export function FeaturedReview({ name, service, text }: { name: string; service?: string; text: string }) {
  const isDesktop = useIsDesktop();
  const tone = useTone();
  return (
    <View role="figure" style={{ gap: Spacing.md, maxWidth: 880 }}>
      <Stars size={20} />
      <Text
        style={{
          fontFamily: Fonts.headingMedium,
          fontSize: isDesktop ? 34 : 26,
          lineHeight: isDesktop ? 42 : 33,
          color: tone === 'light' ? Colors.ink : Colors.white,
        }}>
        {'“'}
        {text}
        {'”'}
      </Text>
      <Text style={{ fontFamily: Fonts.bodyMedium, fontSize: 16, color: tone === 'light' ? Colors.inkSecondary : Colors.textSecondary }}>
        {name}
        {service ? `, ${service.toLowerCase()}` : ''}
      </Text>
    </View>
  );
}

export function ReviewCard({ name, place, text }: { name: string; place: string; text: string }) {
  const tone = useTone();
  return (
    <View
      role="figure"
      style={{
        flex: 1,
        minWidth: 260,
        gap: Spacing.sm,
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: tone === 'light' ? '#C9CDD1' : Colors.border,
      }}>
      <Stars />
      <Body style={{ color: tone === 'light' ? Colors.ink : Colors.white }}>
        {'“'}
        {text}
        {'”'}
      </Body>
      <Text style={{ fontFamily: Fonts.bodyMedium, color: tone === 'light' ? Colors.inkSecondary : Colors.textSecondary, fontSize: 15 }}>
        {name}, {place.toLowerCase()}
      </Text>
    </View>
  );
}

export function StatBlock({ stats }: { stats: { value: string; label: string }[] }) {
  const tone = useTone();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xl }}>
      {stats.map((s) => (
        <View key={s.label} style={{ gap: 2, minWidth: 160, flex: 1 }}>
          <Text style={{ color: Colors.orange, fontFamily: Fonts.display, fontSize: 52, lineHeight: 56 }}>{s.value}</Text>
          <Text style={{ color: tone === 'light' ? Colors.inkSecondary : Colors.textSecondary, fontFamily: Fonts.body, fontSize: 16 }}>
            {s.label.charAt(0).toUpperCase() + s.label.slice(1)}
          </Text>
        </View>
      ))}
    </View>
  );
}
