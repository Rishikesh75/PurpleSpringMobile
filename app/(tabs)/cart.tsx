import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CartLineRow from '@/components/CartItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import { formatUsd } from '@/utils/format';

export default function CartTabScreen() {
  const router = useRouter();
  const c = useSemanticPalette();
  const { lines, isReady, subtotalCents, clear } = useCart();

  if (!isReady) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={c.primary} />
      </ThemedView>
    );
  }

  if (lines.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
        <ThemedView style={styles.empty}>
          <ThemedText type="title">Your cart is empty</ThemedText>
          <ThemedText style={styles.emptySub}>
            Add saffron from the Shop tab to see it here.
          </ThemedText>
          <Button onPress={() => router.push('/(tabs)/cart')} style={styles.cta}>
            Browse shop
          </Button>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Cart</ThemedText>
        <Pressable onPress={clear} hitSlop={12}>
          <ThemedText style={[styles.clearText, { color: c.primary }]}>Clear all</ThemedText>
        </Pressable>
      </ThemedView>
      <FlatList
        data={lines}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartLineRow line={item} />}
      />
      <ThemedView style={[styles.footer, { borderTopColor: c.border }]}>
        <ThemedText type="defaultSemiBold" style={styles.totalLabel}>
          Subtotal
        </ThemedText>
        <ThemedText type="title" style={{ color: c.primary }}>
          {formatUsd(subtotalCents)}
        </ThemedText>
        <Button onPress={() => router.push('/checkout')} style={styles.checkout}>
          Checkout
        </Button>
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
  },
  totalLabel: { fontSize: 14, opacity: 0.8 },
  checkout: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
  cta: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
});
