import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useReducedMotion } from 'react-native-reanimated';

/** Course (row) height: roughly a shingle's exposed face, scaled down. */
const COURSE_HEIGHT = 30;
/** Darker band at the bottom of each course: the shadow it casts on the row below. */
const SHADOW_HEIGHT = 4;

/**
 * Color sets. Tones stay close to the section background so white text on
 * top stays readable.
 */
export const ShingleColors = {
  /** Behind the orange call-to-action band. */
  orange: { tabs: ['#E8631A', '#DD5C16', '#EE681D', '#D85A15', '#E25F18'], deck: 'rgba(0, 0, 0, 0.12)', shadow: 'rgba(0, 0, 0, 0.22)' },
  /** Charcoal architectural shingles behind the dark hero. */
  charcoal: { tabs: ['#1C1C1C', '#212121', '#191919', '#252525', '#1E1E1E'], deck: '#0A0A0A', shadow: 'rgba(0, 0, 0, 0.55)' },
} as const;

/** Each tab drops a few pixels into place, like being set down and nailed. */
const layKeyframes = {
  from: { opacity: 0, transform: [{ translateY: -14 }] },
  to: { opacity: 1, transform: [{ translateY: 0 }] },
};

/** Small seeded random generator so the pattern is identical on every render. */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Tab = { left: number; width: number; color: string };

/** Architectural shingles: tabs of varying width, joints offset from the row below. */
function buildCourse(row: number, width: number, tabColors: readonly string[]): Tab[] {
  const rand = seeded(row * 9973 + 17);
  const tabs: Tab[] = [];
  // Start each course at a different offset so vertical joints never line up.
  let x = -rand() * 80;
  while (x < width) {
    const w = 56 + Math.round(rand() * 84);
    tabs.push({ left: x, width: w, color: tabColors[Math.floor(rand() * tabColors.length)] });
    x += w;
  }
  return tabs;
}

/**
 * A few GAF Timberline HDZ colors. The tones are approximations drawn in code,
 * not GAF's photography; the comparison page has the real samples.
 */
export const TimberlineColors = [
  { name: 'Charcoal', tabs: ['#3A3B3D', '#2F3032', '#444548', '#35363A'] },
  { name: 'Pewter Gray', tabs: ['#6F7375', '#62666A', '#7C8083', '#585C60'] },
  { name: 'Slate', tabs: ['#55606A', '#49535C', '#626E78', '#404951'] },
  { name: 'Weathered Wood', tabs: ['#6B6257', '#5C544B', '#786E62', '#514A42'] },
  { name: 'Barkwood', tabs: ['#5A4A3E', '#4C3E34', '#685649', '#43362D'] },
  { name: 'Hickory', tabs: ['#7A5A3C', '#694C32', '#8A6846', '#5C422B'] },
] as const;

const SWATCH_COURSES = 5;
const SWATCH_COURSE_HEIGHT = 22;

/**
 * A small still patch of shingles in one color. Sized with flexbox instead of a
 * measured width, so it is already drawn in the exported HTML.
 */
export function ShingleSwatch({ tabs, seed }: { tabs: readonly string[]; seed: number }) {
  const rand = seeded(seed * 7919 + 3);
  return (
    <View
      aria-hidden
      style={{ height: SWATCH_COURSES * SWATCH_COURSE_HEIGHT, backgroundColor: '#0E0E0E', borderRadius: 3, overflow: 'hidden' }}>
      {Array.from({ length: SWATCH_COURSES }, (_, course) => (
        <View key={course} style={{ flexDirection: 'row', height: SWATCH_COURSE_HEIGHT, marginLeft: -Math.round(rand() * 40) }}>
          {/* More tabs than any swatch is wide; the frame clips the rest. */}
          {Array.from({ length: 8 }, (_, tab) => (
            <View
              key={tab}
              style={{
                width: 34 + Math.round(rand() * 50),
                marginRight: 2,
                flexShrink: 0,
                backgroundColor: tabs[Math.floor(rand() * tabs.length)],
                borderBottomWidth: 3,
                borderBottomColor: 'rgba(0, 0, 0, 0.4)',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

/**
 * A field of shingle courses that lay themselves from the eave (bottom) up to
 * the ridge (top) when scrolled into view, each row left to right.
 */
export function ShingleField({ colors = ShingleColors.orange }: { colors?: (typeof ShingleColors)[keyof typeof ShingleColors] }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<View>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [visible, setVisible] = useState(false);

  // Start laying when a third of the band is on screen (web); immediately on native.
  useEffect(() => {
    const node = ref.current as unknown as Element | null;
    if (typeof IntersectionObserver === 'undefined' || !node) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const courses = size.width ? Math.ceil(size.height / (COURSE_HEIGHT - SHADOW_HEIGHT)) + 1 : 0;

  return (
    <View
      ref={ref}
      aria-hidden
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        if (width !== size.width || height !== size.height) {
          setSize({ width, height });
        }
      }}
      // The darker "roof deck" shows through the seams between tabs.
      style={[StyleSheet.absoluteFill, { overflow: 'hidden', backgroundColor: colors.deck, pointerEvents: 'none' }]}>
      {visible || reduceMotion
        ? Array.from({ length: courses }, (_, fromEave) => {
            // Row 0 sits at the bottom edge; later rows overlap the one below.
            const bottom = fromEave * (COURSE_HEIGHT - SHADOW_HEIGHT) - SHADOW_HEIGHT;
            return buildCourse(fromEave, size.width, colors.tabs).map((tab, i) => (
              <Animated.View
                key={`${fromEave}-${i}`}
                style={[
                  {
                    position: 'absolute',
                    bottom,
                    left: tab.left,
                    width: tab.width - 2,
                    height: COURSE_HEIGHT,
                    backgroundColor: tab.color,
                    borderBottomWidth: SHADOW_HEIGHT,
                    borderBottomColor: colors.shadow,
                    // Upper courses lap over lower ones.
                    zIndex: fromEave,
                  },
                  !reduceMotion && {
                    animationName: layKeyframes,
                    animationDuration: '360ms',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'both',
                    animationDelay: `${fromEave * 140 + i * 22}ms`,
                  },
                ]}
              />
            ));
          })
        : null}
    </View>
  );
}
