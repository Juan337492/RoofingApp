import { Redirect, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { View } from 'react-native';

import { Screen } from '@/components/screen';
import { FaqAccordion, ProcessSteps } from '@/components/sections';
import { Body, CallButton, CheckItem, Heading, Section } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { getService, services } from '@/data/services';

export function generateStaticParams(): { slug: string }[] {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServiceScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const service = getService(slug);

  if (!service) {
    return <Redirect href="/" />;
  }

  return (
    <Screen ctaTitle="Get Your Free Roof Inspection">
      <Head>
        <title>{`${service.name} | Dynamic Roofing | Powder Springs, GA`}</title>
        <meta name="description" content={service.intro} />
      </Head>
      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Heading level={1}>{service.headline}</Heading>
        <Body style={{ fontSize: 16 }}>{service.intro}</Body>
        <View style={{ flexDirection: 'row' }}>
          <CallButton label="Free Roof Inspection" />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>{service.signsTitle}</Heading>
        <View style={{ gap: Spacing.sm }}>
          {service.signs.map((sign) => (
            <CheckItem key={sign} text={sign} />
          ))}
        </View>
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>Our Process</Heading>
        <ProcessSteps steps={service.process} />
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>Frequently Asked Questions</Heading>
        <FaqAccordion faqs={service.faqs} />
      </Section>
    </Screen>
  );
}
