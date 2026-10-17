import '@/global.css';

/** Black and orange, matching the logo. */
export const Colors = {
  background: '#0D0D0D',
  surface: '#161616',
  surfaceAlt: '#1E1E1E',
  border: '#2A2A2A',
  orange: '#F26A1B', // logo orange (reserved for actions)
  orangeDark: '#C95511',
  white: '#FFFFFF',
  text: '#FFFFFF',
  textSecondary: '#FFFFFF',
  granule: '#AEB3B9',
  flashing: '#E7E9EB', // light sections (variant="light")
  ink: '#0D0D0D', // text on light sections
  inkSecondary: '#4A5057',
  gold: '#FFB800',
} as const;

export const Fonts = {
  /** Barlow Condensed: modeled on highway signs and vehicle lettering */
  display: 'BarlowCondensed_700Bold',
  heading: 'BarlowCondensed_600SemiBold',
  headingMedium: 'BarlowCondensed_500Medium',
  body: 'Barlow_400Regular',
  bodyMedium: 'Barlow_500Medium',
  bodySemiBold: 'Barlow_600SemiBold',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 72,
} as const;

export const MaxContentWidth = 1160;

/** Comfortable reading measure for body copy (< 80 characters). */
export const ReadingWidth = 640;
