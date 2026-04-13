import { useColorSchemeContext } from '@/context/ColorSchemeContext';

/** Effective color scheme on web (same as native — user preference + system). */
export function useColorScheme(): 'light' | 'dark' {
  return useColorSchemeContext().resolvedColorScheme;
}
