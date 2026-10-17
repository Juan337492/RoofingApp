import { Link, useRouter, type Href } from 'expo-router';
import { createContext, useContext } from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type PressableStateCallbackType,
  type ViewStyle,
} from 'react-native';

import { Site } from '@/constants/site';
import { Colors, Fonts, MaxContentWidth, ReadingWidth, Spacing } from '@/constants/theme';

/** react-native-web also reports hover and keyboard focus to Pressable styles. */
export type InteractionState = PressableStateCallbackType & { hovered?: boolean; focused?: boolean };

/** Light sections flip text to dark ink; components read this instead of taking color props. */
type Tone = 'dark' | 'light';
const ToneContext = createContext<Tone>('dark');
export const useTone = () => useContext(ToneContext);

export function useIsDesktop() {
  return useWindowDimensions().width >= 820;
}

/**
 * A Pressable that renders a real <a href> on web and navigates client-side.
 * Used instead of <Link asChild>, whose Slot drops Pressable style functions
 * and render-function children.
 */
export function PressableLink({
  href,
  style,
  children,
  onNavigate,
}: {
  href: Href;
  style?: ViewStyle | ((state: InteractionState) => ViewStyle | (ViewStyle | false | undefined)[]);
  children: React.ReactNode | ((state: InteractionState) => React.ReactNode);
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const url = Link.resolveHref(href);
  return (
    <Pressable
      role="link"
      // react-native-web renders a View with href as an anchor tag.
      {...({ href: url } as object)}
      onPress={(event) => {
        // Let modified clicks (new tab, etc.) fall through to the browser.
        const native = event?.nativeEvent as unknown as MouseEvent | undefined;
        if (native && (native.metaKey || native.ctrlKey || native.shiftKey || native.button === 1)) {
          return;
        }
        event?.preventDefault?.();
        onNavigate?.();
        router.push(href);
      }}
      style={style as never}>
      {children as never}
    </Pressable>
  );
}

export function Heading({ children, level = 2, style }: { children: React.ReactNode; level?: 1 | 2 | 3; style?: object }) {
  const tone = useTone();
  const isDesktop = useIsDesktop();
  const sizes = isDesktop ? ({ 1: 56, 2: 38, 3: 23 } as const) : ({ 1: 38, 2: 30, 3: 21 } as const);
  return (
    <Text
      role="heading"
      aria-level={level}
      style={[
        {
          fontFamily: level === 3 ? Fonts.headingMedium : Fonts.heading,
          fontSize: sizes[level],
          lineHeight: sizes[level] * (level === 3 ? 1.25 : 1.1),
          letterSpacing: 0.4,
          color: tone === 'light' ? Colors.ink : Colors.white,
          maxWidth: level === 3 ? undefined : 820,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function Body({ children, style }: { children: React.ReactNode; style?: object }) {
  const tone = useTone();
  return (
    <Text
      style={[
        {
          fontFamily: Fonts.body,
          color: tone === 'light' ? Colors.inkSecondary : Colors.textSecondary,
          fontSize: 17,
          lineHeight: 27,
          maxWidth: ReadingWidth,
        },
        style,
      ]}>
      {children}
    </Text>
  );
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
  variant?: 'filled' | 'outline' | 'white' | 'dark';
  style?: ViewStyle;
}) {
  const tone = useTone();
  const outlineColor = tone === 'light' ? Colors.ink : Colors.white;

  const buttonStyle = (state: InteractionState): ViewStyle[] => {
    const active = state.pressed || state.hovered;
    return [
      styles.button,
      variant === 'filled' && { backgroundColor: active ? Colors.orangeDark : Colors.orange },
      variant === 'outline' && {
        borderWidth: 2,
        borderColor: outlineColor,
        backgroundColor: active ? (tone === 'light' ? '#1C1F2214' : '#FFFFFF1A') : 'transparent',
      },
      variant === 'white' && { backgroundColor: active ? '#E8E8E8' : Colors.white },
      variant === 'dark' && { backgroundColor: active ? '#000000' : Colors.ink },
      state.focused && styles.focusRing,
      style ?? {},
    ].filter(Boolean) as ViewStyle[];
  };

  const label_ = (
    <Text
      style={{
        fontFamily: Fonts.bodyMedium,
        fontSize: 16,
        color: variant === 'white' ? Colors.orange : variant === 'outline' ? outlineColor : Colors.white,
      }}>
      {label}
    </Text>
  );

  if (href) {
    return (
      <PressableLink href={href} style={buttonStyle}>
        {label_}
      </PressableLink>
    );
  }
  return (
    <Pressable role="button" onPress={onPress} style={buttonStyle}>
      {label_}
    </Pressable>
  );
}

export function CallButton({
  variant = 'filled',
  label,
  style,
}: {
  variant?: 'filled' | 'outline' | 'white' | 'dark';
  label?: string;
  style?: ViewStyle;
}) {
  return (
    <OrangeButton
      label={label ?? 'Book a free inspection'}
      variant={variant}
      style={style}
      onPress={() => Linking.openURL(Site.phoneHref)}
    />
  );
}

/**
 * The signature element: the phone number set large, like the lettering on a
 * contractor's truck door. Tapping it calls.
 */
export function PhoneLettering({ size, color }: { size?: number; color?: string }) {
  const tone = useTone();
  const isDesktop = useIsDesktop();
  const fontSize = size ?? (isDesktop ? 64 : 44);
  return (
    <Pressable
      role="link"
      aria-label={`Call ${Site.phoneDisplay}`}
      onPress={() => Linking.openURL(Site.phoneHref)}
      style={(state: InteractionState) => [{ alignSelf: 'flex-start', borderRadius: 4 }, state.focused && styles.focusRing]}>
      {(state: InteractionState) => (
        <Text
          style={{
            fontFamily: Fonts.display,
            fontSize,
            lineHeight: fontSize * 1.05,
            color: color ?? (state.hovered || state.pressed ? Colors.orangeDark : tone === 'light' ? Colors.ink : Colors.orange),
            fontVariant: ['tabular-nums'],
          }}>
          {Site.phoneDisplay}
        </Text>
      )}
    </Pressable>
  );
}

const sectionBackgrounds = {
  dark: Colors.background,
  raised: Colors.surface,
  light: Colors.flashing,
  orange: Colors.orange,
  /** For sections layered over their own background (e.g. the shingle band). */
  transparent: 'transparent',
} as const;

/** Centers page content and constrains width on large (desktop/web) screens. */
export function Section({
  children,
  alt,
  variant,
  style,
}: {
  children: React.ReactNode;
  /** @deprecated use variant="raised" */
  alt?: boolean;
  variant?: keyof typeof sectionBackgrounds;
  style?: ViewStyle;
}) {
  const isDesktop = useIsDesktop();
  const v = variant ?? (alt ? 'raised' : 'dark');
  return (
    <ToneContext.Provider value={v === 'light' ? 'light' : 'dark'}>
      <View style={{ backgroundColor: sectionBackgrounds[v] }}>
        <View
          style={[
            {
              width: '100%',
              maxWidth: MaxContentWidth,
              alignSelf: 'center',
              paddingHorizontal: isDesktop ? Spacing.xl : Spacing.lg,
              paddingVertical: isDesktop ? Spacing.xxxl : Spacing.xxl,
            },
            style,
          ]}>
          {children}
        </View>
      </View>
    </ToneContext.Provider>
  );
}

export function Stars({ size = 16 }: { size?: number }) {
  return (
    <Text style={{ color: Colors.gold, fontSize: size, letterSpacing: 2 }} aria-label="5 out of 5 stars">
      {'★★★★★'}
    </Text>
  );
}

/** A city or related page link, set as plain underlined text rather than a pill. */
export function Chip({ label, href }: { label: string; href: Href }) {
  const tone = useTone();
  return (
    <PressableLink href={href} style={(state) => [{ paddingVertical: 6, borderRadius: 2 }, state.focused && styles.focusRing]}>
      {(state: InteractionState) => (
        <Text
          style={{
            fontFamily: Fonts.headingMedium,
            fontSize: 22,
            color: state.hovered || state.pressed ? Colors.orange : tone === 'light' ? Colors.ink : Colors.white,
            textDecorationLine: 'underline',
            textDecorationColor: Colors.orange,
          }}>
          {label}
        </Text>
      )}
    </PressableLink>
  );
}

export function CheckItem({ text }: { text: string }) {
  const tone = useTone();
  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
      <Text style={{ color: Colors.orange, fontSize: 17, lineHeight: 27, fontFamily: Fonts.bodySemiBold }}>{'✓'}</Text>
      <Body style={{ flex: 1, color: tone === 'light' ? Colors.ink : Colors.white }}>{text}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusRing: {
    outlineColor: Colors.orange,
    outlineStyle: 'solid',
    outlineWidth: 3,
    outlineOffset: 3,
  } as ViewStyle,
});
