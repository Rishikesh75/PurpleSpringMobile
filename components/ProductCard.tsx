import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { radius, spacing } from '@/constants/theme';
import type { Product } from '@/types';
import { formatUsd } from '@/utils/format';

import { useSemanticPalette } from '@/hooks/use-semantic-color';

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const c = useSemanticPalette();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: c.card,
          borderColor: c.border,
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
      <View style={styles.text}>
        <ThemedText type="defaultSemiBold" numberOfLines={2}>
          {product.name}
        </ThemedText>
        <ThemedText style={styles.sub} numberOfLines={2}>
          {product.shortDescription}
        </ThemedText>
        <ThemedText style={[styles.price, { color: c.primary }]}>{formatUsd(product.priceCents)}</ThemedText>
        <ThemedText style={styles.weight}>{product.weightLabel}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing[2],
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
  },
  pressed: { opacity: 0.92 },
  image: { width: '100%', aspectRatio: 1 },
  text: { padding: spacing[3], gap: spacing[1] },
  sub: { fontSize: 13, opacity: 0.8 },
  price: { fontWeight: '700', fontSize: 16, marginTop: 4 },
  weight: { fontSize: 12, opacity: 0.65 },
});
