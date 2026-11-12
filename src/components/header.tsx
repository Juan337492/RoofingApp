import { Image } from 'expo-image';
import { Link, usePathname, type Href } from 'expo-router';
import { msg, useGT, useMessages } from 'gt-react-native';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { firstPaint, OrangeButton, PressableLink, useLayoutWidth, type InteractionState } from '@/components/ui';
import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { services } from '@/data/services';
import { languages, useLanguage } from '@/i18n/language';

/**
 * Desktop bar: the jobs people call about most, plus shingles and contact. Space is
 * tight, so translations are asked to stay short. The options are written out on
 * each line because `npx gt translate` only reads literal options.
 */
const primaryLinks: { label: string; href: Href }[] = [
  { label: msg('Roof replacement', { $context: 'Link in a crowded navigation bar. One or two short words.', $maxChars: 16 }), href: '/services/roof-replacement' },
  { label: msg('Roof repair', { $context: 'Link in a crowded navigation bar. One or two short words.', $maxChars: 16 }), href: '/services/roof-repair' },
  { label: msg('Storm damage', { $context: 'Link in a crowded navigation bar. One or two short words.', $maxChars: 16 }), href: '/services/storm-damage-roofing' },
  { label: msg('Insurance claims', { $context: 'Link in a crowded navigation bar. One or two short words.', $maxChars: 16 }), href: '/services/insurance-claims' },
  { label: msg('Shingles', { $context: 'Link in a crowded navigation bar. One or two short words.', $maxChars: 16 }), href: '/shingles' },
  { label: msg('Contact', { $context: 'Link in a crowded navigation bar. One or two short words.', $maxChars: 16 }), href: '/contact' },
];

/** Full menu: every service page. */
const menuLinks: { label: string; href: Href }[] = [
  { label: msg('Home'), href: '/' },
  ...services.map((s) => ({ label: s.name, href: `/services/${s.slug}` as Href })),
  { label: msg('Compare shingles'), href: '/shingles' },
  { label: msg('Contact'), href: '/contact' },
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
  const gt = useGT();
  return (
    <Link href="/" asChild>
      <Pressable
        aria-label={gt('Dynamic Roofing home')}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1, minWidth: 0 }}>
        <View {...(compact ? firstPaint('brand-logo') : {})} style={{ width: compact ? 40 : 48, height: compact ? 40 : 48 }}>
          {/* The mark alone: the full logo's wordmark is unreadable at this size and repeats the text beside it. */}
          <Image source={require('../../assets/images/logo-mark.png')} style={{ width: '100%', height: '100%' }} contentFit="contain" />
        </View>
        <Text numberOfLines={1} {...(compact ? firstPaint('brand-name') : {})} style={{ fontFamily: Fonts.display, fontSize: compact ? 20 : 24, color: Colors.white, letterSpacing: 0.3 }}>
          Dynamic Roofing
        </Text>
      </Pressable>
    </Link>
  );
}

function FullScreenMenu({ visible, onClose, pathname }: { visible: boolean; onClose: () => void; pathname: string }) {
  const insets = useSafeAreaInsets();
  const gt = useGT();
  const m = useMessages();
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
          <Pressable onPress={onClose} aria-label={gt('Close menu')} style={{ padding: Spacing.sm }} hitSlop={8}>
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
                  {m(item.label)}
                </Text>
              </PressableLink>
            );
          })}
        </ScrollView>

        <View style={{ padding: Spacing.lg, gap: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border }}>
          <LanguageChoice />
          <OrangeButton label={gt('Call {phone}', { phone: Site.phoneDisplay })} phone />
          <Text style={{ color: Colors.textSecondary, fontFamily: Fonts.body, fontSize: 14, textAlign: 'center' }}>
            {gt('Roof inspections are always free.')}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

function NavLink({ label, href, active }: { label: string; href: Href; active: boolean }) {
  const m = useMessages();
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
          {m(label)}
        </Text>
      )}
    </PressableLink>
  );
}

/**
 * Switches between English and Spanish, labeled with the language you would switch
 * to, in that language. Phones get it in the menu instead, since the bar has no
 * room (Spanish browsers are switched automatically anyway).
 */
function LanguageToggle({ undecided }: { undecided: boolean }) {
  const { language, setLanguage } = useLanguage();
  const other = languages.find((l) => l.code !== language)!;
  return (
    <Pressable
      onPress={() => setLanguage(other.code)}
      aria-label={other.label}
      hitSlop={8}
      // Hidden on phones; global.css shows it on wider screens before the app knows the width.
      {...firstPaint('language-toggle')}
      style={(state: InteractionState) => [
        { display: undecided ? 'none' : 'flex', paddingVertical: 6, borderRadius: 4 },
        state.focused && { outlineColor: Colors.orange, outlineStyle: 'solid', outlineWidth: 2, outlineOffset: 4 },
      ]}>
      {(state: InteractionState) => (
        <Text style={{ fontFamily: Fonts.bodyMedium, fontSize: 15, color: state.hovered || state.pressed ? Colors.orange : Colors.white }}>
          {other.label}
        </Text>
      )}
    </Pressable>
  );
}

/** The menu's language switch: both names, the current one marked. */
function LanguageChoice() {
  const { language, setLanguage } = useLanguage();
  return (
    <View role="radiogroup" style={{ flexDirection: 'row', justifyContent: 'center', gap: Spacing.lg, paddingBottom: Spacing.xs }}>
      {languages.map((l) => {
        const selected = l.code === language;
        return (
          <Pressable key={l.code} role="radio" aria-checked={selected} onPress={() => setLanguage(l.code)} hitSlop={8} style={{ paddingVertical: 6 }}>
            <Text
              style={{
                fontFamily: selected ? Fonts.bodySemiBold : Fonts.body,
                fontSize: 16,
                color: selected ? Colors.white : Colors.textSecondary,
                textDecorationLine: selected ? 'underline' : 'none',
              }}>
              {l.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function HeaderCallButton({ short }: { short: boolean }) {
  const gt = useGT();
  return (
    <OrangeButton
      label={short ? gt('Call') : Site.phoneDisplay}
      phone
      style={{ paddingVertical: 10, paddingHorizontal: short ? 18 : 16 }}
    />
  );
}

export function Header() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const width = useLayoutWidth();
  const [menuOpen, setMenuOpen] = useState(false);
  const gt = useGT();
  // Below this width the six links no longer fit beside the brand, language, and phone.
  const compact = width < 1120;
  const phone = width < 640;
  // Width is 0 in the exported HTML. Include both versions of what differs, and let global.css choose.
  const undecided = width === 0;

  return (
    <View style={{ backgroundColor: Colors.background, paddingTop: insets.top, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
      <View
        {...firstPaint('header-bar')}
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

        {!compact || undecided ? (
          <View
            role="navigation"
            {...firstPaint('desktop-nav')}
            style={{ display: undecided ? 'none' : 'flex', flexDirection: 'row', alignItems: 'center', gap: 18 }}>
            {primaryLinks.map((item) => (
              <NavLink key={item.label} {...item} active={pathname === item.href} />
            ))}
          </View>
        ) : null}

        <View {...firstPaint('header-actions')} style={{ flexDirection: 'row', alignItems: 'center', gap: phone ? 12 : Spacing.md, flexShrink: 0 }}>
          {!phone || undecided ? <LanguageToggle undecided={undecided} /> : null}
          {undecided ? (
            <>
              <View {...firstPaint('call-short')}>
                <HeaderCallButton short />
              </View>
              <View {...firstPaint('call-full')} style={{ display: 'none' }}>
                <HeaderCallButton short={false} />
              </View>
            </>
          ) : (
            <HeaderCallButton short={phone} />
          )}
          {compact ? (
            <Pressable onPress={() => setMenuOpen(true)} aria-label={gt('Open menu')} hitSlop={8} {...firstPaint('menu-button')} style={{ padding: 4 }}>
              <HamburgerIcon />
            </Pressable>
          ) : null}
        </View>
      </View>

      {menuOpen ? <FullScreenMenu visible={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} /> : null}
    </View>
  );
}
