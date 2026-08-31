import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CallButton } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';

const navLinks = [
  { label: 'Home', href: '/' as const },
  { label: 'Roof Replacement', href: '/services/roof-replacement' as const },
  { label: 'Roof Repair', href: '/services/roof-repair' as const },
  { label: 'Storm Damage', href: '/services/storm-damage-roofing' as const },
  { label: 'Insurance Claims', href: '/services/insurance-claims' as const },
  { label: 'Gutters', href: '/services/gutters' as const },
  { label: 'Siding', href: '/services/siding' as const },
  { label: 'Inspections', href: '/services/roof-inspection' as const },
];

export function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: Colors.background, paddingTop: insets.top, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
      <View
        style={{
          width: '100%',
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.sm,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: Spacing.md,
        }}>
        <Link href="/" asChild>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={require('../../assets/images/logo.png')} style={{ width: 44, height: 44 }} contentFit="contain" />
            <View>
              <Text style={{ fontFamily: Fonts.heading, fontSize: 18, color: Colors.white, textTransform: 'uppercase', lineHeight: 20 }}>
                Dynamic <Text style={{ color: Colors.orange }}>Roofing</Text>
              </Text>
              <Text style={{ color: Colors.textSecondary, fontSize: 10, letterSpacing: 0.5 }}>{Site.tagline}</Text>
            </View>
          </Pressable>
        </Link>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
          <Pressable onPress={() => Linking.openURL(Site.phoneHref)}>
            <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 15 }}>{Site.phoneDisplay}</Text>
          </Pressable>
          <CallButton label="Free Inspection" style={{ paddingVertical: 9, paddingHorizontal: 14 }} />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: Spacing.lg,
          paddingHorizontal: Spacing.lg,
          paddingBottom: Spacing.sm,
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
        }}>
        {navLinks.map((item) => (
          <Link key={item.label} href={item.href} asChild>
            <Pressable>
              <Text
                style={{
                  color: Colors.textSecondary,
                  fontFamily: Fonts.headingMedium,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}>
                {item.label}
              </Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
