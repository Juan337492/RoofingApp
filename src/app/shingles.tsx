import { T, useGT } from 'gt-react-native';
import { Linking, View } from 'react-native';

import { GafWidget } from '@/components/gaf-widget';
import { Screen } from '@/components/screen';
import { PageMeta } from '@/components/seo';
import { Body, Heading, OrangeButton, Section } from '@/components/ui';
import { Spacing } from '@/constants/theme';

const SHINGLES_PDF_URL = 'https://media.dynamicroofingandconstruction.us/roof.pdf';

export default function ShinglesScreen() {
  const gt = useGT();
  return (
    <Screen ctaTitle={gt('Found a Shingle You Love? Get a Free Quote')}>
      <PageMeta title="Compare GAF Shingles | Dynamic Roofing | Dallas, GA" description="Compare popular GAF shingles side by side and explore Timberline HDZ colors and features. Free quotes from your local GAF certified contractor." />

      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Heading level={1}>
          <T>Shingle Comparison Tools</T>
        </Heading>
        <Body style={{ fontSize: 16 }}>
          <T>
            Not sure which shingle is right for your home? Compare popular GAF shingles side by side, then explore
            Timberline HDZ{'\u00AE'} colors and features. When you find one you love, we install it.
          </T>
        </Body>
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label={gt('Download Shingles Brochure (PDF)')} onPress={() => Linking.openURL(SHINGLES_PDF_URL)} />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Compare Popular GAF Shingles</T>
        </Heading>
        <GafWidget url="https://widgets.gaf.com/shingle-comparison-chart" title={gt('GAF Shingle Comparison')} />
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>
          <T>Explore Timberline HDZ{'\u00AE'}</T>
        </Heading>
        <GafWidget url="https://widgets.gaf.com/hdz-widget" title="GAF Timberline HDZ" />
      </Section>
    </Screen>
  );
}
