import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { radius, spacing } from '@/constants/theme';
import { useAccount } from '@/context/AccountContext';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import type { Order, OrderStatus } from '@/types/account';

function statusLabel(status: OrderStatus): string {
  switch (status) {
    case 'processing':
      return 'Processing';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    default:
      return status;
  }
}

function OrderRow({
  order,
  onTrack,
}: {
  order: Order;
  onTrack: () => void;
}) {
  const c = useSemanticPalette();
  const date = new Date(order.placedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const showTrack = order.status === 'processing' || order.status === 'shipped';

  return (
    <View style={[styles.card, { borderColor: c.border, backgroundColor: c.card }]}>
      <View style={styles.cardTop}>
        <ThemedText type="defaultSemiBold">{order.id}</ThemedText>
        <View style={[styles.badge, { backgroundColor: c.muted }]}>
          <ThemedText style={[styles.badgeText, { color: c.primary }]}>{statusLabel(order.status)}</ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.date, { color: c.mutedForeground }]}>{date}</ThemedText>
      <ThemedText style={styles.summary}>{order.itemsSummary}</ThemedText>
      <ThemedText type="defaultSemiBold" style={[styles.total, { color: c.foreground }]}>
        {order.totalLabel}
      </ThemedText>
      {showTrack ? (
        <Button onPress={onTrack} style={styles.trackBtn} size="sm">
          Track your order
        </Button>
      ) : null}
    </View>
  );
}

export default function OrdersScreen() {
  const router = useRouter();
  const { user, orders } = useAccount();
  const c = useSemanticPalette();

  if (!user) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.centerText}>Sign in from Profile to see your orders.</ThemedText>
        <Button onPress={() => router.back()}>Go back</Button>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: c.background }]}
      contentContainerStyle={styles.scroll}>
      {orders.length === 0 ? (
        <ThemedText style={[styles.empty, { color: c.mutedForeground }]}>No orders yet.</ThemedText>
      ) : (
        orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            onTrack={() => router.push({ pathname: '/order/[id]', params: { id: order.id } })}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: spacing[5], paddingBottom: 40, gap: spacing[4] },
  center: { flex: 1, padding: spacing[6], justifyContent: 'center', gap: spacing[4] },
  centerText: { textAlign: 'center', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: spacing[8] },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing[4],
    gap: spacing[2],
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: spacing[2], paddingVertical: 4, borderRadius: radius.sm },
  badgeText: { fontSize: 12, fontWeight: '700' },
  date: { fontSize: 14 },
  summary: { fontSize: 15, lineHeight: 22 },
  total: { marginTop: spacing[1] },
  trackBtn: { marginTop: spacing[2], alignSelf: 'flex-start' },
});
