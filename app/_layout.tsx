import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { semanticDark, semanticLight } from '@/constants/theme';
import { AccountProvider } from '@/context/AccountContext';
import { CartProvider } from '@/context/CartContext';
import { ColorSchemeProvider } from '@/context/ColorSchemeContext';
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

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? NavigationDark : NavigationLight}>
      <CartProvider>
        <AccountProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="product/[id]"
              options={{ title: 'Product', headerBackTitle: 'Back' }}
            />
            <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
            <Stack.Screen name="about" options={{ title: 'About', headerBackTitle: 'Back' }} />
            <Stack.Screen name="faq" options={{ title: 'FAQs', headerBackTitle: 'Back' }} />
            <Stack.Screen name="policy/[id]" options={{ title: 'Policy', headerBackTitle: 'Back' }} />
            <Stack.Screen name="orders" options={{ title: 'Your orders', headerBackTitle: 'Back' }} />
            <Stack.Screen name="order/[id]" options={{ title: 'Track order', headerBackTitle: 'Back' }} />
            <Stack.Screen name="address/new" options={{ title: 'New address', headerBackTitle: 'Back' }} />
            <Stack.Screen name="address/[id]" options={{ title: 'Edit address', headerBackTitle: 'Back' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </AccountProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ColorSchemeProvider>
      <RootLayoutNav />
    </ColorSchemeProvider>
  );
}
