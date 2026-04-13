import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/constants/products';
import { useCart } from '@/hooks/useCart';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import { formatUsd } from '@/utils/format';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const c = useSemanticPalette();
  const { addItem } = useCart();

  const product = typeof id === 'string' ? getProductById(id) : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.name ?? 'Product',
    });
  }, [navigation, product?.name]);

  if (!product) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Product not found.</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText type="link">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const onAdd = () => {
    addItem(product, 1);
    Alert.alert('Added to cart', `${product.name} is in your cart.`, [
      { text: 'Keep shopping', style: 'cancel' },
      { text: 'View cart', onPress: () => router.push('/(tabs)/cart') },
    ]);
  };

  return (
    <ScrollView
      style={{ backgroundColor: c.background }}
      contentContainerStyle={styles.scroll}>
      <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
      <ThemedView style={styles.body}>
        <ThemedText type="title">{product.name}</ThemedText>
        <ThemedText style={styles.meta}>
          {product.origin} · {product.weightLabel}
        </ThemedText>
        <ThemedText style={[styles.price, { color: c.primary }]}>{formatUsd(product.priceCents)}</ThemedText>
        <ThemedText style={styles.desc}>{product.description}</ThemedText>
        <Button onPress={onAdd} style={styles.addBtn}>
          Add to cart
        </Button>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  backBtn: { marginTop: 8 },
  scroll: { paddingBottom: 32 },
  image: { width: '100%', height: 280 },
  body: { padding: 20, gap: 12 },
  meta: { opacity: 0.75 },
  price: { fontSize: 22, fontWeight: '700' },
  desc: { fontSize: 16, lineHeight: 24 },
  addBtn: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
});
