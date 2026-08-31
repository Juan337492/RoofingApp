import '@/global.css';

export const Colors = {
  background: '#0D0D0D',
  surface: '#161616',
  surfaceAlt: '#1E1E1E',
  border: '#2A2A2A',
  orange: '#F26A1B',
  orangeDark: '#C95511',
  white: '#FFFFFF',
  text: '#FFFFFF',
  textSecondary: '#B0B4BA',
  gold: '#FFB800',
} as const;

export const Fonts = {
  /** Bold condensed industrial headline font (matches the logo lockup) */
  heading: 'Oswald_700Bold',
  headingMedium: 'Oswald_600SemiBold',
  /** Body text uses the platform's default sans-serif */
  body: undefined,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const MaxContentWidth = 1100;
