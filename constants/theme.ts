/**
 * Semantic design tokens aligned with the Purple Spring web app (shadcn-style CSS variables).
 * HSL sources are noted in comments; hex is what React Native consumes.
 * When the web `frontend/src/index.css` is available, keep these values in sync.
 */
import { Platform } from 'react-native';

/** ~0.5rem — matches Tailwind `--radius` baseline */
export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

/** 4px grid — mirrors common Tailwind spacing */
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
} as const;

export type SemanticPalette = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

/**
 * Light theme — web `:root` equivalents (HSL → hex)
 * background: 0 0% 100%; foreground: 240 10% 3.9%; primary: brand purple
 */
export const semanticLight: SemanticPalette = {
  background: '#ffffff',
  foreground: '#09090b',
  card: '#ffffff',
  cardForeground: '#09090b',
  popover: '#ffffff',
  popoverForeground: '#09090b',
  primary: '#5B2D8C',
  primaryForeground: '#fafafa',
  secondary: '#f4f4f5',
  secondaryForeground: '#18181b',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  accent: '#f4f4f5',
  accentForeground: '#18181b',
  destructive: '#ef4444',
  destructiveForeground: '#fafafa',
  border: '#e4e4e7',
  input: '#e4e4e7',
  ring: '#5B2D8C',
  chart1: '#5B2D8C',
  chart2: '#E8C547',
  chart3: '#7c3aed',
  chart4: '#c084fc',
  chart5: '#f59e0b',
};

/**
 * Dark theme — web `.dark` equivalents; primary uses saffron gold for interactive emphasis (matches prior app tint).
 */
export const semanticDark: SemanticPalette = {
  background: '#09090b',
  foreground: '#fafafa',
  card: '#09090b',
  cardForeground: '#fafafa',
  popover: '#09090b',
  popoverForeground: '#fafafa',
  primary: '#E8C547',
  primaryForeground: '#1c1917',
  secondary: '#27272a',
  secondaryForeground: '#fafafa',
  muted: '#27272a',
  mutedForeground: '#a1a1aa',
  accent: '#27272a',
  accentForeground: '#fafafa',
  destructive: '#dc2626',
  destructiveForeground: '#fafafa',
  border: '#27272a',
  input: '#27272a',
  ring: '#E8C547',
  chart1: '#E8C547',
  chart2: '#a78bfa',
  chart3: '#5B2D8C',
  chart4: '#fbbf24',
  chart5: '#f87171',
};

export const semanticColors: Record<'light' | 'dark', SemanticPalette> = {
  light: semanticLight,
  dark: semanticDark,
};

/** Legacy keys used by `useThemeColor` / tabs — derived from semantic tokens */
export const Colors = {
  light: {
    text: semanticLight.foreground,
    background: semanticLight.background,
    tint: semanticLight.primary,
    icon: semanticLight.mutedForeground,
    tabIconDefault: semanticLight.mutedForeground,
    tabIconSelected: semanticLight.primary,
  },
  dark: {
    text: semanticDark.foreground,
    background: semanticDark.background,
    tint: semanticDark.primary,
    icon: semanticDark.mutedForeground,
    tabIconDefault: semanticDark.mutedForeground,
    tabIconSelected: semanticDark.primary,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
