import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import { Body, CallButton, Heading, Section, Stars } from '@/components/ui';
import type { Faq } from '@/data/services';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export function CtaBand({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ backgroundColor: Colors.orange }}>
      <View
        style={{
          width: '100%',
          maxWidth: 1100,
          alignSelf: 'center',
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.xl,
          gap: Spacing.md,
          alignItems: 'center',
        }}>
        <Heading level={2} style={{ textAlign: 'center' }}>{title}</Heading>
        {subtitle ? <Body style={{ color: '#FFE7D6', textAlign: 'center' }}>{subtitle}</Body> : null}
        <CallButton variant="white" label="Schedule Your Free Inspection" />
      </View>
    </View>
  );
}

const trustItems = [
  { title: 'Licensed & Insured', subtitle: 'Your protection is our priority' },
  { title: '5.0 Google Reviews', subtitle: '\u2605\u2605\u2605\u2605\u2605', gold: true },
  { title: 'Insurance Claim Specialists', subtitle: 'We work for you, not the insurance company' },
];

function CertificationBadge({
  source,
  label,
  accessibilityLabel,
}: {
  source: number;
  label: string;
  accessibilityLabel: string;
}) {
  return (
    <View style={{ alignItems: 'center', gap: 8, minWidth: 128 }}>
      <Image source={source} style={{ width: 128, height: 128 }} contentFit="contain" accessibilityLabel={accessibilityLabel} />
      <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>
        {label}
      </Text>
    </View>
  );
}

export function TrustBar() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <Section alt style={{ gap: isDesktop ? 0 : Spacing.lg, paddingVertical: isDesktop ? Spacing.lg : Spacing.xl }}>
      <View
        style={{
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: isDesktop ? 'center' : 'stretch',
          justifyContent: 'space-between',
          gap: isDesktop ? Spacing.xl : Spacing.lg,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: isDesktop ? 'flex-start' : 'center',
            alignItems: 'flex-end',
            gap: Spacing.lg,
          }}>
          <CertificationBadge
            source={require('../../assets/images/gaf-certified.png')}
            label="GAF Certified"
            accessibilityLabel="GAF Certified Residential Roofing Contractor"
          />
          <CertificationBadge
            source={require('../../assets/images/atlas-gold.png')}
            label="Atlas Pro+ Gold"
            accessibilityLabel="Atlas Pro Plus Gold certified contractor"
          />
        </View>
        <View style={{ flex: isDesktop ? 1 : undefined, flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg, justifyContent: 'space-between' }}>
          {trustItems.map((item) => (
            <View key={item.title} style={{ minWidth: 150, flex: 1, gap: 2 }}>
              <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {item.title}
              </Text>
              <Text style={{ color: item.gold ? Colors.gold : Colors.textSecondary, fontSize: 12 }}>{item.subtitle}</Text>
            </View>
          ))}
        </View>
      </View>
    </Section>
  );
}

export function ProcessSteps({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <View style={{ gap: Spacing.lg }}>
      {steps.map((step, i) => (
        <View key={step.title} style={{ flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start' }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.orange,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: Colors.white, fontFamily: Fonts.heading, fontSize: 18 }}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Heading level={3}>{step.title}</Heading>
            <Body>{step.description}</Body>
          </View>
        </View>
      ))}
    </View>
  );
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <View style={{ gap: Spacing.sm }}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <View key={faq.question} style={{ backgroundColor: Colors.surfaceAlt, borderRadius: 8, borderWidth: 1, borderColor: Colors.border }}>
            <Pressable
              onPress={() => setOpen(isOpen ? null : i)}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.md, gap: Spacing.md }}>
              <Text
                style={{
                  flex: 1,
                  color: isOpen ? Colors.orange : Colors.white,
                  fontFamily: Fonts.headingMedium,
                  fontSize: 15,
                  lineHeight: 22,
                }}>
                {faq.question}
              </Text>
              <Text style={{ color: Colors.orange, fontSize: 18 }}>{isOpen ? '\u2212' : '+'}</Text>
            </Pressable>
            {isOpen ? (
              <View style={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.md }}>
                <Body>{faq.answer}</Body>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

export function ReviewCard({ name, place, text }: { name: string; place: string; text: string }) {
  return (
    <View
      style={{
        backgroundColor: Colors.surfaceAlt,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        gap: Spacing.sm,
        flex: 1,
        minWidth: 260,
      }}>
      <Stars />
      <Body style={{ fontStyle: 'italic', color: Colors.white }}>{'\u201C'}{text}{'\u201D'}</Body>
      <Text style={{ color: Colors.textSecondary, fontSize: 13 }}>
        {'\u2014'} {name} {'\u00B7'} <Text style={{ color: Colors.orange }}>{place}</Text>
      </Text>
    </View>
  );
}

export function StatBlock({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.lg,
        backgroundColor: Colors.surfaceAlt,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.lg,
        justifyContent: 'space-around',
      }}>
      {stats.map((s) => (
        <View key={s.label} style={{ alignItems: 'center', gap: 2, minWidth: 120 }}>
          <Text style={{ color: Colors.orange, fontFamily: Fonts.heading, fontSize: 34 }}>{s.value}</Text>
          <Text style={{ color: Colors.textSecondary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>
            {s.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
