import { ScrollView, View } from 'react-native';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { CtaBand } from '@/components/sections';
import { Colors } from '@/constants/theme';

/** Page shell: header on top, content, orange CTA band, footer. */
export function Screen({ children, ctaTitle }: { children: React.ReactNode; ctaTitle?: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} directionalLockEnabled>
        {children}
        <View style={{ flex: 1 }} />
        <CtaBand
          title={ctaTitle ?? 'Get Your Free Roof Inspection Today'}
          subtitle="Fast response. No obligation. Protect your home."
        />
        <Footer />
      </ScrollView>
    </View>
  );
}
