import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useCart } from '@/hooks/useCart';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { itemCount } = useCart();
  const c = useSemanticPalette();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: c.mutedForeground,
        tabBarStyle: {
          backgroundColor: c.card,
          borderTopColor: c.border,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bag.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Support',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="headset.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
