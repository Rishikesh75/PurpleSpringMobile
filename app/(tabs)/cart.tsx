import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CartLineRow from '@/components/CartItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useCart } from '@/hooks/useCart';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { formatUsd } from '@/utils/format';

export default function CartTabScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const { lines, isReady, subtotalCents, clear } = useCart();

  if (!isReady) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={tint} />
      </ThemedView>
    );
  }

  if (lines.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ThemedView style={styles.empty}>
          <ThemedText type="title">Your cart is empty</ThemedText>
          <ThemedText style={styles.emptySub}>
            Add saffron from the Shop tab to see it here.
          </ThemedText>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/(tabs)/shop')}
            style={[styles.cta, { backgroundColor: tint }]}>
            <ThemedText style={styles.ctaText} lightColor="#fff" darkColor="#1a1025">
              Browse shop
            </ThemedText>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Cart</ThemedText>
        <Pressable onPress={clear} hitSlop={12}>
          <ThemedText style={[styles.clearText, { color: tint }]}>Clear all</ThemedText>
        </Pressable>
      </ThemedView>
      <FlatList
        data={lines}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartLineRow line={item} />}
      />
      <ThemedView style={styles.footer}>
        <ThemedText type="defaultSemiBold" style={styles.totalLabel}>
          Subtotal
        </ThemedText>
        <ThemedText type="title" style={{ color: tint }}>
          {formatUsd(subtotalCents)}
        </ThemedText>
        <Pressable
          style={[styles.checkout, { backgroundColor: tint }]}
          onPress={() => router.push('/checkout')}>
          <ThemedText style={styles.ctaText} lightColor="#fff" darkColor="#1a1025">
            Checkout
          </ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, padding: 24, justifyContent: 'center', gap: 12 },
  emptySub: { opacity: 0.8 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  clearText: { fontSize: 16, fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  footer: {
    padding: 20,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  totalLabel: { fontSize: 14, opacity: 0.8 },
  checkout: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cta: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
  },
  ctaText: { fontSize: 17, fontWeight: '600' },
});
