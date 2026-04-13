import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useCart } from '@/hooks/useCart';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import type { CartLine } from '@/types';
import { formatUsd } from '@/utils/format';

type Props = {
  line: CartLine;
};

export default function CartLineRow({ line }: Props) {
  const { product, quantity } = line;
  const { setQuantity, removeLine } = useCart();
  const c = useSemanticPalette();

  const lineTotal = product.priceCents * quantity;

  return (
    <View style={[styles.row, { borderBottomColor: c.border }]}>
      <Image source={{ uri: product.image }} style={styles.thumb} contentFit="cover" />
      <View style={styles.mid}>
        <ThemedText type="defaultSemiBold" numberOfLines={2}>
          {product.name}
        </ThemedText>
        <ThemedText style={styles.unit}>{formatUsd(product.priceCents)} each</ThemedText>
        <View style={styles.stepper}>
          <Pressable
            style={[styles.stepBtn, { borderColor: c.border }]}
            onPress={() => setQuantity(product.id, quantity - 1)}
            hitSlop={8}>
            <ThemedText style={[styles.stepLabel, { color: c.primary }]}>−</ThemedText>
          </Pressable>
          <ThemedText style={styles.qty}>{quantity}</ThemedText>
          <Pressable
            style={[styles.stepBtn, { borderColor: c.border }]}
            onPress={() => setQuantity(product.id, quantity + 1)}
            hitSlop={8}>
            <ThemedText style={[styles.stepLabel, { color: c.primary }]}>+</ThemedText>
          </Pressable>
        </View>
      </View>
      <View style={styles.right}>
        <ThemedText style={[styles.lineTotal, { color: c.primary }]}>{formatUsd(lineTotal)}</ThemedText>
        <Pressable onPress={() => removeLine(product.id)} hitSlop={8}>
          <ThemedText style={styles.remove}>Remove</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  thumb: { width: 72, height: 72, borderRadius: 12 },
  mid: { flex: 1, gap: 6 },
  unit: { fontSize: 13, opacity: 0.75 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: { fontSize: 18, fontWeight: '700' },
  qty: { fontSize: 16, fontWeight: '600', minWidth: 24, textAlign: 'center' },
  right: { alignItems: 'flex-end', gap: 8 },
  lineTotal: { fontWeight: '700', fontSize: 16 },
  remove: { fontSize: 14, opacity: 0.7 },
});
