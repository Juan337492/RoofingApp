import { ScrollView, View } from 'react-native';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SiteSeo } from '@/components/seo';
import { CtaBand } from '@/components/sections';
import { Colors } from '@/constants/theme';

/** Page shell: header on top, content, orange call-to-action band, footer. */
export function Screen({ children, ctaTitle }: { children: React.ReactNode; ctaTitle?: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SiteSeo />
      <Header />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} directionalLockEnabled>
        {children}
        <View style={{ flex: 1 }} />
        <CtaBand
          title={ctaTitle ?? 'Get your free roof inspection'}
          subtitle="No obligation. You get a photo report of everything we find."
        />
        <Footer />
      </ScrollView>
    </View>
  );
}
