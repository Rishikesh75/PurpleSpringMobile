import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { radius, spacing } from '@/constants/theme';
import { useAccount } from '@/context/AccountContext';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import type { OrderStatus } from '@/types/account';

const STEPS: { key: string; label: string }[] = [
  { key: 'placed', label: 'Order placed' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivery', label: 'Out for delivery' },
  { key: 'done', label: 'Delivered' },
];

function completedStepCount(status: OrderStatus): number {
  switch (status) {
    case 'processing':
      return 2;
    case 'shipped':
      return 3;
    case 'delivered':
      return 5;
    default:
      return 1;
  }
}

export default function OrderTrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { orders } = useAccount();
  const c = useSemanticPalette();

  const orderId = typeof id === 'string' ? decodeURIComponent(id) : '';
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>We couldn&apos;t find that order.</ThemedText>
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <ThemedText type="link">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const done = completedStepCount(order.status);
  const date = new Date(order.placedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: c.background }]}
      contentContainerStyle={styles.scroll}>
      <ThemedText type="subtitle">{order.id}</ThemedText>
      <ThemedText style={[styles.meta, { color: c.mutedForeground }]}>Placed {date}</ThemedText>
      <ThemedText style={styles.line}>{order.itemsSummary}</ThemedText>
      <ThemedText type="defaultSemiBold">{order.totalLabel}</ThemedText>

      <ThemedText type="subtitle" style={styles.trackTitle}>
        Tracking
      </ThemedText>
      <View style={[styles.timeline, { borderColor: c.border }]}>
        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isDone = stepNum <= done;
          return (
            <View key={step.key} style={styles.stepRow}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: isDone ? c.primary : c.muted,
                    borderColor: c.border,
                  },
                ]}
              />
              <View style={styles.stepText}>
                <ThemedText
                  type={isDone ? 'defaultSemiBold' : 'default'}
                  style={!isDone ? { opacity: 0.55 } : undefined}>
                  {step.label}
                </ThemedText>
              </View>
            </View>
          );
        })}
      </View>

      {order.status === 'delivered' ? (
        <ThemedText style={[styles.note, { color: c.mutedForeground }]}>
          This order has been delivered. Thank you for shopping with Purple Spring.
        </ThemedText>
      ) : (
        <ThemedText style={[styles.note, { color: c.mutedForeground }]}>
          Estimated delivery follows carrier updates (demo—no live carrier link).
        </ThemedText>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: spacing[5], paddingBottom: 40, gap: spacing[2] },
  center: { flex: 1, padding: spacing[6], justifyContent: 'center', gap: spacing[4], alignItems: 'center' },
  meta: { fontSize: 14 },
  line: { fontSize: 15, lineHeight: 22, marginTop: spacing[2] },
  trackTitle: { marginTop: spacing[6] },
  timeline: {
    marginTop: spacing[3],
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[3],
  },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[3] },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
    borderWidth: 2,
  },
  stepText: { flex: 1 },
  note: { marginTop: spacing[4], fontSize: 14, lineHeight: 20 },
});
