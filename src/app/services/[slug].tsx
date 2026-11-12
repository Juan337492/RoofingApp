import { Redirect, useLocalSearchParams } from 'expo-router';
import { T, useGT, useMessages } from 'gt-react-native';
import { View } from 'react-native';

import { Screen } from '@/components/screen';
import { PageMeta } from '@/components/seo';
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
  const gt = useGT();
  const m = useMessages();

  if (!service) {
    return <Redirect href="/" />;
  }

  return (
    <Screen ctaTitle={gt('Get Your Free Roof Inspection')}>
      <PageMeta title={`${service.name} | Dynamic Roofing | Dallas, GA`} description={service.intro} />
      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Heading level={1}>{m(service.headline)}</Heading>
        <Body style={{ fontSize: 16 }}>{m(service.intro)}</Body>
        <View style={{ flexDirection: 'row' }}>
          <CallButton label={gt('Free Roof Inspection')} />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>{m(service.signsTitle)}</Heading>
        <View style={{ gap: Spacing.sm }}>
          {service.signs.map((sign) => (
            <CheckItem key={sign} text={m(sign)} />
          ))}
        </View>
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Our Process</T>
        </Heading>
        <ProcessSteps steps={service.process} />
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Frequently Asked Questions</T>
        </Heading>
        <FaqAccordion faqs={service.faqs} />
      </Section>
    </Screen>
  );
}
