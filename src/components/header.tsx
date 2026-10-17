import { Image } from 'expo-image';
import { Link, usePathname, type Href } from 'expo-router';
import { useState } from 'react';
import { Linking, Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OrangeButton, PressableLink, type InteractionState } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { services } from '@/data/services';

/** Desktop bar: the jobs people call about most, plus shingles and contact. */
const primaryLinks: { label: string; href: Href }[] = [
  { label: 'Roof replacement', href: '/services/roof-replacement' },
  { label: 'Roof repair', href: '/services/roof-repair' },
  { label: 'Storm damage', href: '/services/storm-damage-roofing' },
  { label: 'Insurance claims', href: '/services/insurance-claims' },
  { label: 'Shingles', href: '/shingles' },
  { label: 'Contact', href: '/contact' },
];

/** Full menu: every service page. */
const menuLinks: { label: string; href: Href }[] = [
  { label: 'Home', href: '/' },
  ...services.map((s) => ({ label: s.name, href: `/services/${s.slug}` as Href })),
  { label: 'Compare shingles', href: '/shingles' },
  { label: 'Contact', href: '/contact' },
];

function HamburgerIcon() {
  return (
    <View style={{ gap: 5, width: 24 }}>
      <View style={{ height: 2.5, backgroundColor: Colors.white, borderRadius: 2 }} />
      <View style={{ height: 2.5, backgroundColor: Colors.white, borderRadius: 2 }} />
      <View style={{ height: 2.5, backgroundColor: Colors.white, borderRadius: 2 }} />
    </View>
  );
}

function Brand({ compact }: { compact: boolean }) {
  return (
    <Link href="/" asChild>
      <Pressable
        aria-label="Dynamic Roofing home"
        style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1, minWidth: 0 }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: compact ? 40 : 48, height: compact ? 40 : 48 }}
          contentFit="contain"
        />
        <Text numberOfLines={1} style={{ fontFamily: Fonts.display, fontSize: compact ? 20 : 24, color: Colors.white, letterSpacing: 0.3 }}>
          Dynamic Roofing
        </Text>
      </Pressable>
    </Link>
  );
}

function FullScreenMenu({ visible, onClose, pathname }: { visible: boolean; onClose: () => void; pathname: string }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
          }}>
          <Brand compact />
          <Pressable onPress={onClose} aria-label="Close menu" style={{ padding: Spacing.sm }} hitSlop={8}>
            <Text style={{ color: Colors.white, fontSize: 26, lineHeight: 28 }}>{'✕'}</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }}>
          {menuLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <PressableLink
                key={item.label}
                href={item.href}
                onNavigate={onClose}
                style={(state) => ({
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.border,
                  opacity: state.pressed ? 0.6 : 1,
                })}>
                <Text style={{ fontFamily: Fonts.heading, fontSize: 26, color: active ? Colors.orange : Colors.white }}>
                  {item.label}
                </Text>
              </PressableLink>
            );
          })}
        </ScrollView>

        <View style={{ padding: Spacing.lg, gap: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border }}>
          <OrangeButton label={`Call ${Site.phoneDisplay}`} onPress={() => Linking.openURL(Site.phoneHref)} />
          <Text style={{ color: Colors.textSecondary, fontFamily: Fonts.body, fontSize: 14, textAlign: 'center' }}>
            Roof inspections are always free.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

function NavLink({ label, href, active }: { label: string; href: Href; active: boolean }) {
  return (
    <PressableLink
      href={href}
      style={(state) => [
        { paddingVertical: 6, borderBottomWidth: 2, borderBottomColor: active ? Colors.orange : 'transparent' },
        state.focused && { outlineColor: Colors.orange, outlineStyle: 'solid', outlineWidth: 2, outlineOffset: 4 },
      ]}>
      {(state: InteractionState) => (
        <Text
          style={{
            fontFamily: Fonts.bodyMedium,
            fontSize: 15,
            color: state.hovered ? Colors.orange : Colors.white,
          }}>
          {label}
        </Text>
      )}
    </PressableLink>
  );
}

export function Header() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  // Below this width the six links no longer fit beside the brand and phone.
  const compact = width < 1080;
  const phone = width < 640;

  return (
    <View style={{ backgroundColor: Colors.background, paddingTop: insets.top, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
      <View
        style={{
          width: '100%',
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
          paddingHorizontal: phone ? Spacing.md : Spacing.xl,
          paddingVertical: Spacing.sm + 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: Spacing.md,
        }}>
        <Brand compact={phone} />

        {!compact ? (
          <View role="navigation" style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.lg }}>
            {primaryLinks.map((item) => (
              <NavLink key={item.label} {...item} active={pathname === item.href} />
            ))}
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: phone ? 12 : Spacing.md, flexShrink: 0 }}>
          <OrangeButton
            label={phone ? 'Call' : Site.phoneDisplay}
            onPress={() => Linking.openURL(Site.phoneHref)}
            style={{ paddingVertical: 10, paddingHorizontal: phone ? 18 : 16 }}
          />
          {compact ? (
            <Pressable onPress={() => setMenuOpen(true)} aria-label="Open menu" hitSlop={8} style={{ padding: 4 }}>
              <HamburgerIcon />
            </Pressable>
          ) : null}
        </View>
      </View>

      {menuOpen ? <FullScreenMenu visible={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} /> : null}
    </View>
  );
}
