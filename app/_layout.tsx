import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { semanticDark, semanticLight } from '@/constants/theme';
import { CartProvider } from '@/context/CartContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

const NavigationLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: semanticLight.primary,
    background: semanticLight.background,
    card: semanticLight.card,
    text: semanticLight.foreground,
    border: semanticLight.border,
    notification: semanticLight.destructive,
  },
};

const NavigationDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: semanticDark.primary,
    background: semanticDark.background,
    card: semanticDark.card,
    text: semanticDark.foreground,
    border: semanticDark.border,
    notification: semanticDark.destructive,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? NavigationDark : NavigationLight}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="product/[id]"
            options={{ title: 'Product', headerBackTitle: 'Back' }}
          />
          <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        {/* <StatusBar style="auto" /> */}
      </CartProvider>
    </ThemeProvider>
  );
}
