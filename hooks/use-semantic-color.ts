import { semanticColors, type SemanticPalette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useSemanticColor<K extends keyof SemanticPalette>(name: K): string {
  const scheme = useColorScheme() ?? 'light';
  return semanticColors[scheme][name];
}

export function useSemanticPalette(): SemanticPalette {
  const scheme = useColorScheme() ?? 'light';
  return semanticColors[scheme];
}
