import { Link, type Href } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';

export function Heading({ children, level = 2, style }: { children: React.ReactNode; level?: 1 | 2 | 3; style?: object }) {
  const sizes = { 1: 34, 2: 26, 3: 18 } as const;
  return (
    <Text
      role="heading"
      aria-level={level}
      style={[
        {
          fontFamily: Fonts.heading,
          fontSize: sizes[level],
          lineHeight: sizes[level] * 1.15,
          color: Colors.white,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function Body({ children, style }: { children: React.ReactNode; style?: object }) {
  return <Text style={[{ color: Colors.textSecondary, fontSize: 15, lineHeight: 23 }, style]}>{children}</Text>;
}

export function OrangeButton({
  label,
  onPress,
  href,
  variant = 'filled',
  style,
}: {
  label: string;
  onPress?: () => void;
  href?: Href;
  variant?: 'filled' | 'outline' | 'white';
  style?: ViewStyle;
}) {
  const inner = (pressed: boolean) => (
    <View
      style={[
        styles.button,
        variant === 'filled' && { backgroundColor: pressed ? Colors.orangeDark : Colors.orange },
        variant === 'outline' && { borderWidth: 2, borderColor: Colors.white, backgroundColor: pressed ? '#FFFFFF22' : 'transparent' },
        variant === 'white' && { backgroundColor: pressed ? '#E8E8E8' : Colors.white },
        style,
      ]}>
      <Text
        style={{
          fontFamily: Fonts.headingMedium,
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontSize: 14,
          color: variant === 'white' ? Colors.orange : Colors.white,
        }}>
        {label}
      </Text>
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable>{({ pressed }) => inner(pressed)}</Pressable>
      </Link>
    );
  }
  return <Pressable onPress={onPress}>{({ pressed }) => inner(pressed)}</Pressable>;
}

export function CallButton({ variant = 'filled', label, style }: { variant?: 'filled' | 'outline' | 'white'; label?: string; style?: ViewStyle }) {
  return (
    <OrangeButton
      label={label ?? 'Free Roof Inspection'}
      variant={variant}
      style={style}
      onPress={() => Linking.openURL(Site.phoneHref)}
    />
  );
}

/** Centers page content and constrains width on large (desktop/web) screens. */
export function Section({ children, alt, style }: { children: React.ReactNode; alt?: boolean; style?: ViewStyle }) {
  return (
    <View style={{ backgroundColor: alt ? Colors.surface : Colors.background }}>
      <View style={[{ width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl }, style]}>
        {children}
      </View>
    </View>
  );
}

export function Stars() {
  return (
    <Text style={{ color: Colors.gold, fontSize: 16, letterSpacing: 2 }} aria-label="5 out of 5 stars">
      {'\u2605\u2605\u2605\u2605\u2605'}
    </Text>
  );
}

export function Chip({ label, href }: { label: string; href: Href }) {
  return (
    <Link href={href} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            style={{
              borderWidth: 1.5,
              borderColor: Colors.orange,
              borderRadius: 999,
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: pressed ? Colors.orange : 'transparent',
            }}>
            <Text style={{ color: Colors.white, fontFamily: Fonts.headingMedium, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export function CheckItem({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
      <Text style={{ color: Colors.orange, fontSize: 16, lineHeight: 22 }}>{'\u2713'}</Text>
      <Body style={{ flex: 1, color: Colors.white }}>{text}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
