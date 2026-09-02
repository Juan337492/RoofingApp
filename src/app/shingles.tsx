import Head from 'expo-router/head';
import { Linking, View } from 'react-native';

import { GafWidget } from '@/components/gaf-widget';
import { Screen } from '@/components/screen';
import { Body, Heading, OrangeButton, Section } from '@/components/ui';
import { Spacing } from '@/constants/theme';

const SHINGLES_PDF_URL = 'https://media.dynamicroofingandconstruction.us/roof.pdf';

export default function ShinglesScreen() {
  return (
    <Screen ctaTitle="Found a Shingle You Love? Get a Free Quote">
      <Head>
        <title>Compare GAF Shingles | Dynamic Roofing | Powder Springs, GA</title>
        <meta
          name="description"
          content="Compare popular GAF shingles side by side and explore Timberline HDZ colors and features. Free quotes from your local GAF certified contractor."
        />
      </Head>

      <Section style={{ paddingVertical: Spacing.xxl, gap: Spacing.md }}>
        <Heading level={1}>Shingle Comparison Tools</Heading>
        <Body style={{ fontSize: 16 }}>
          Not sure which shingle is right for your home? Compare popular GAF shingles side by side, then explore
          Timberline HDZ{'\u00AE'} colors and features. When you find one you love, we install it.
        </Body>
        <View style={{ flexDirection: 'row' }}>
          <OrangeButton label="Download Shingles Brochure (PDF)" onPress={() => Linking.openURL(SHINGLES_PDF_URL)} />
        </View>
      </Section>

      <Section alt style={{ gap: Spacing.lg }}>
        <Heading level={2}>Compare Popular GAF Shingles</Heading>
        <GafWidget url="https://widgets.gaf.com/shingle-comparison-chart" title="GAF Shingle Comparison" />
      </Section>

      <Section style={{ gap: Spacing.lg }}>
        <Heading level={2}>Explore Timberline HDZ{'\u00AE'}</Heading>
        <GafWidget url="https://widgets.gaf.com/hdz-widget" title="GAF Timberline HDZ" />
      </Section>
    </Screen>
  );
}
