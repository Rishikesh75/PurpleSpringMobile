import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import ProductCard from '@/components/ProductCard';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import useProducts from '@/hooks/useProducts';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProductList() {
  const router = useRouter();
  const { products, loading, error } = useProducts();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <ThemedText>{error}</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
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
