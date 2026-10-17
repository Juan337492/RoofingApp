import { Image } from 'expo-image';
import { type Href } from 'expo-router';
import { Linking, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableLink, useIsDesktop, type InteractionState } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { locations } from '@/data/locations';
import { services } from '@/data/services';

function FooterLink({ label, href, onPress }: { label: string; href?: Href; onPress?: () => void }) {
  const isDesktop = useIsDesktop();
  const style = (state: InteractionState) => [
    // Taller on phones so each link is a comfortable tap target.
    { paddingVertical: isDesktop ? 3 : 9, alignSelf: 'flex-start' as const },
    state.focused && { outlineColor: Colors.orange, outlineStyle: 'solid' as const, outlineWidth: 2, outlineOffset: 2 },
  ];
  const text = (state: InteractionState) => (
    <Text style={{ fontFamily: Fonts.body, fontSize: 15, lineHeight: 22, color: state.hovered ? Colors.orange : Colors.textSecondary }}>
      {label}
    </Text>
  );
  return href ? (
    <PressableLink href={href} style={style}>
      {text}
    </PressableLink>
  ) : (
    <Pressable onPress={onPress} style={style}>
      {text}
    </Pressable>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  const isDesktop = useIsDesktop();
  return (
    // Two columns side by side on phones instead of one long stack.
    <View style={{ gap: Spacing.sm, ...(isDesktop ? { flex: 1, minWidth: 180 } : { width: '46%' }) }}>
      <Text role="heading" aria-level={2} style={{ fontFamily: Fonts.heading, fontSize: 20, color: Colors.white }}>
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );
}

export function Footer() {
  const insets = useSafeAreaInsets();
  const isDesktop = useIsDesktop();
  return (
    <View role="contentinfo" style={{ backgroundColor: '#080808', borderTopWidth: 1, borderTopColor: Colors.border, paddingBottom: insets.bottom }}>
      <View
        style={{
          width: '100%',
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
          paddingHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
          paddingVertical: Spacing.xxl,
          gap: Spacing.xl,
        }}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: Spacing.xl, justifyContent: 'space-between' }}>
          <View style={{ gap: Spacing.md, maxWidth: 300 }}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: isDesktop ? 112 : 80, height: isDesktop ? 112 : 80 }}
              contentFit="contain"
              accessibilityLabel="Dynamic Roofing, built to protect, built to last"
            />
            <View>
              <FooterLink label={Site.phoneDisplay} onPress={() => Linking.openURL(Site.phoneHref)} />
              <FooterLink label={Site.email} onPress={() => Linking.openURL(`mailto:${Site.email}`)} />
              <Text style={{ fontFamily: Fonts.body, fontSize: 15, lineHeight: 22, color: Colors.textSecondary, paddingVertical: 3 }}>
                {Site.address}
              </Text>
            </View>
          </View>

          <View style={{ flex: isDesktop ? 3 : undefined, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: Spacing.xl, columnGap: isDesktop ? Spacing.xl : 0 }}>
            <Column title="Services">
              {services.map((s) => (
                <FooterLink key={s.slug} label={s.name} href={`/services/${s.slug}` as Href} />
              ))}
              <FooterLink label="Compare shingles" href="/shingles" />
            </Column>

            <Column title="Areas we serve">
              {locations.map((l) => (
                <FooterLink key={l.slug} label={`${l.city}, GA`} href={`/locations/${l.slug}` as Href} />
              ))}
            </Column>

            <Column title="Follow us">
              {Site.socials.map((s) => (
                <FooterLink key={s.label} label={s.label} onPress={() => Linking.openURL(s.url)} />
              ))}
            </Column>
          </View>
        </View>

        <Text style={{ fontFamily: Fonts.body, fontSize: 13, lineHeight: 20, color: Colors.granule }}>
          {'©'} {new Date().getFullYear()} {Site.name}. Licensed and insured. GAF Certified and Atlas Pro+ Gold contractor.
        </Text>
      </View>
    </View>
  );
}
