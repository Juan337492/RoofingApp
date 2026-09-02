import { Image } from 'expo-image';
import { Link, usePathname } from 'expo-router';
import { useRef, useState } from 'react';
import { Linking, Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CallButton, OrangeButton } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';

const navLinks = [
  { label: 'Home', href: '/' as const },
  { label: 'Shingle Comparison', href: '/shingles' as const },
  { label: 'Roof Replacement', href: '/services/roof-replacement' as const },
  { label: 'Roof Repair', href: '/services/roof-repair' as const },
  { label: 'Storm Damage', href: '/services/storm-damage-roofing' as const },
  { label: 'Insurance Claims', href: '/services/insurance-claims' as const },
  { label: 'Gutters', href: '/services/gutters' as const },
  { label: 'Siding', href: '/services/siding' as const },
  { label: 'Inspections', href: '/services/roof-inspection' as const },
  { label: 'Contact', href: '/contact' as const },
];

function HamburgerIcon() {
  return (
    <View style={{ gap: 5, width: 24 }} aria-label="Open menu">
      <View style={{ height: 2.5, backgroundColor: Colors.white, borderRadius: 2 }} />
      <View style={{ height: 2.5, backgroundColor: Colors.white, borderRadius: 2 }} />
      <View style={{ height: 2.5, backgroundColor: Colors.white, borderRadius: 2 }} />
    </View>
  );
}

function Brand({ compact }: { compact: boolean }) {
  return (
    <Link href="/" asChild>
      <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: compact ? 6 : 10, flexShrink: 1, minWidth: 0 }}>
        <Image source={require('../../assets/images/logo.png')} style={{ width: compact ? 40 : 44, height: compact ? 40 : 44 }} contentFit="contain" />
        <View style={{ flexShrink: 1, minWidth: 0 }}>
          <Text
            numberOfLines={compact ? 2 : 1}
            style={{
              fontFamily: Fonts.heading,
              fontSize: compact ? 15 : 18,
              color: Colors.white,
              textTransform: 'uppercase',
              lineHeight: compact ? 18 : 20,
            }}>
            Dynamic <Text style={{ color: Colors.orange }}>Roofing</Text>
          </Text>
          <Text
            numberOfLines={compact ? 2 : 1}
            style={{
              color: Colors.textSecondary,
              fontSize: compact ? 9 : 10,
              lineHeight: compact ? 11 : undefined,
              letterSpacing: compact ? 0.25 : 0.5,
              marginTop: compact ? -2 : 0,
            }}>
            {Site.tagline}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

function FullScreenMenu({ visible, onClose, pathname }: { visible: boolean; onClose: () => void; pathname: string }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        {/* Menu header: brand + close button */}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={require('../../assets/images/logo.png')} style={{ width: 44, height: 44 }} contentFit="contain" />
            <Text style={{ fontFamily: Fonts.heading, fontSize: 16, color: Colors.white, textTransform: 'uppercase' }}>
              Dynamic <Text style={{ color: Colors.orange }}>Roofing</Text>
            </Text>
          </View>
          <Pressable
            onPress={onClose}
            aria-label="Close menu"
            style={{ padding: Spacing.sm }}
            hitSlop={8}>
            <Text style={{ color: Colors.white, fontSize: 26, lineHeight: 28 }}>{'\u2715'}</Text>
          </Pressable>
        </View>

        {/* Menu links */}
        <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.lg, gap: 4 }}>
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.label} href={item.href} asChild>
                <Pressable onPress={onClose}>
                  {({ pressed }) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: Spacing.md,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.border,
                        opacity: pressed ? 0.6 : 1,
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.heading,
                          fontSize: 22,
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          color: active ? Colors.orange : Colors.white,
                        }}>
                        {item.label}
                      </Text>
                      {active ? (
                        <Text style={{ color: Colors.orange, fontSize: 18 }}>{'\u2022'}</Text>
                      ) : (
                        <Text style={{ color: Colors.textSecondary, fontSize: 18 }}>{'\u203A'}</Text>
                      )}
                    </View>
                  )}
                </Pressable>
              </Link>
            );
          })}
        </ScrollView>

        {/* Call CTA pinned at the bottom */}
        <View style={{ padding: Spacing.lg, gap: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border }}>
          <OrangeButton label={`Call ${Site.phoneDisplay}`} onPress={() => Linking.openURL(Site.phoneHref)} />
          <Text style={{ color: Colors.textSecondary, fontSize: 12, textAlign: 'center' }}>
            Free roof inspections {'\u00B7'} {Site.tagline}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export function Header() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const navScrollRef = useRef<ScrollView>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // On narrow (phone) screens: hamburger menu instead of the horizontal nav row.
  const compact = width < 640;

  return (
    <View style={{ backgroundColor: Colors.background, paddingTop: insets.top, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
      <View
        style={{
          width: '100%',
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: Spacing.sm,
        }}>
        <Brand compact={compact} />
        {compact ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <OrangeButton
              label={Site.phoneDisplay}
              onPress={() => Linking.openURL(Site.phoneHref)}
              style={{ paddingVertical: 9, paddingHorizontal: 8 }}
            />
            <Pressable onPress={() => setMenuOpen(true)} aria-label="Open menu" hitSlop={8} style={{ padding: 4 }}>
              <HamburgerIcon />
            </Pressable>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
            <Pressable onPress={() => Linking.openURL(Site.phoneHref)}>
              <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 15 }}>{Site.phoneDisplay}</Text>
            </Pressable>
            <CallButton label="Free Inspection" style={{ paddingVertical: 9, paddingHorizontal: 14 }} />
          </View>
        )}
      </View>

      {!compact ? (
        <ScrollView
          ref={navScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: Spacing.lg,
            paddingHorizontal: Spacing.md,
            maxWidth: MaxContentWidth,
            alignSelf: 'center',
          }}>
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.label} href={item.href} asChild>
                <Pressable>
                  <View
                    onLayout={
                      active
                        ? (e) => {
                            // Scroll the active tab into view (each page mounts a fresh header).
                            // Deferred with requestAnimationFrame: onLayout fires during mount,
                            // and side effects there trigger "state update before mount" warnings.
                            const x = e.nativeEvent.layout.x;
                            requestAnimationFrame(() => {
                              navScrollRef.current?.scrollTo({ x: Math.max(0, x - Spacing.xl), animated: false });
                            });
                          }
                        : undefined
                    }
                    style={{
                      paddingBottom: Spacing.sm,
                      borderBottomWidth: 2,
                      borderBottomColor: active ? Colors.orange : 'transparent',
                    }}>
                    <Text
                      style={{
                        color: active ? Colors.orange : Colors.textSecondary,
                        fontFamily: Fonts.headingMedium,
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}>
                      {item.label}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            );
          })}
        </ScrollView>
      ) : null}

      {menuOpen ? <FullScreenMenu visible={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} /> : null}
    </View>
  );
}
