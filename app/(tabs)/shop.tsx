import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductList from '@/components/ProductList';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export default function ShopScreen() {
  const c = useSemanticPalette();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Shop</ThemedText>
        <ThemedText style={styles.sub}>All Purple Spring saffron</ThemedText>
      </ThemedView>
      <View style={styles.listWrap}>
        <ProductList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 8, gap: 4 },
  sub: { opacity: 0.75 },
  listWrap: { flex: 1 },
});
