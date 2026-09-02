import { Image } from 'expo-image';
import { Linking, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Body, Heading } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';

export function Footer() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: '#080808', borderTopWidth: 1, borderTopColor: Colors.border, paddingBottom: insets.bottom }}>
      <View
        style={{
          width: '100%',
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.xl,
          gap: Spacing.lg,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image source={require('../../assets/images/logo.png')} style={{ width: 56, height: 56 }} contentFit="contain" />
          <View>
            <Text style={{ fontFamily: Fonts.heading, fontSize: 20, color: Colors.white, textTransform: 'uppercase' }}>
              Dynamic <Text style={{ color: Colors.orange }}>Roofing</Text>
            </Text>
            <Text style={{ color: Colors.orange, fontFamily: Fonts.headingMedium, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
              {Site.tagline}
            </Text>
          </View>
        </View>

        <View style={{ gap: 4 }}>
          <Heading level={3}>Contact Us</Heading>
          <Pressable onPress={() => Linking.openURL(Site.phoneHref)}>
            <Body style={{ color: Colors.white }}>{Site.phoneDisplay}</Body>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`mailto:${Site.email}`)}>
            <Body>{Site.email}</Body>
          </Pressable>
          <Body>{Site.address}</Body>
        </View>

        <View style={{ flexDirection: 'row', gap: Spacing.lg, flexWrap: 'wrap' }}>
          {Site.socials.map((s) => (
            <Pressable key={s.label} onPress={() => Linking.openURL(s.url)}>
              <Text style={{ color: Colors.textSecondary, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
                {s.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Body style={{ fontSize: 12 }}>
          {'\u00A9'} {new Date().getFullYear()} {Site.name}. All rights reserved. Licensed & Insured. GAF Certified Contractor. Atlas Pro+ Gold.
        </Body>
      </View>
    </View>
  );
}
