import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import ProductCard from '@/components/ProductCard';
import { ThemedText } from '@/components/themed-text';
import useProducts from '@/hooks/useProducts';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export default function ProductList() {
  const router = useRouter();
  const { products, loading, error } = useProducts();
  const c = useSemanticPalette();

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ThemedText>{error}</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: c.background }}
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => router.push(`/product/${item.id}`)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, minHeight: 200, justifyContent: 'center', alignItems: 'center', padding: 24 },
  list: { paddingHorizontal: 8, paddingBottom: 24 },
  row: { justifyContent: 'space-between' },
});
