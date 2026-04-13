import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

const STORAGE_KEY = '@purple_spring_color_scheme';

export type ColorSchemePreference = 'light' | 'dark' | 'system';

type ColorSchemeContextValue = {
  preference: ColorSchemePreference;
  /** Resolved appearance used by the app */
  resolvedColorScheme: 'light' | 'dark';
  setPreference: (value: ColorSchemePreference) => Promise<void>;
  /** Switches between light and dark (persists explicit choice) */
  toggleLightDark: () => Promise<void>;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreferenceState] = useState<ColorSchemePreference>('system');

  useEffect(() => {
    void (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setPreferenceState(stored);
        }
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const resolvedColorScheme = useMemo((): 'light' | 'dark' => {
    if (preference === 'system') {
      return systemScheme ?? 'light';
    }
    return preference;
  }, [preference, systemScheme]);

  const setPreference = useCallback(async (value: ColorSchemePreference) => {
    setPreferenceState(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLightDark = useCallback(async () => {
    const next: 'light' | 'dark' = resolvedColorScheme === 'dark' ? 'light' : 'dark';
    await setPreference(next);
  }, [resolvedColorScheme, setPreference]);

  const value = useMemo(
    () => ({
      preference,
      resolvedColorScheme,
      setPreference,
      toggleLightDark,
    }),
    [preference, resolvedColorScheme, setPreference, toggleLightDark],
  );

  return <ColorSchemeContext.Provider value={value}>{children}</ColorSchemeContext.Provider>;
}

export function useColorSchemeContext(): ColorSchemeContextValue {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx) {
    throw new Error('useColorSchemeContext must be used within ColorSchemeProvider');
  }
  return ctx;
}
