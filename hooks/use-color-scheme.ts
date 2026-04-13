import { useColorSchemeContext } from '@/context/ColorSchemeContext';

/** Effective color scheme (respects user preference + system). */
export function useColorScheme(): 'light' | 'dark' {
  return useColorSchemeContext().resolvedColorScheme;
}
