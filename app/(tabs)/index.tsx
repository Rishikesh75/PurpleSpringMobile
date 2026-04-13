import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SAFFRON_PRODUCTS } from '@/constants/products';
import { radius } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import { formatUsd } from '@/utils/format';

export default function HomeScreen() {
  const router = useRouter();
  const c = useSemanticPalette();
  const featured = SAFFRON_PRODUCTS[0];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedView style={styles.hero}>
          <ThemedText type="title" style={styles.brandTitle}>
            Purple Spring
          </ThemedText>
          <ThemedText style={styles.tagline}>Premium saffron, sourced with care.</ThemedText>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1596040033229-a9821ebd38af?w=1200&q=80',
            }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <ThemedText style={styles.heroCopy}>
            Threads hand-selected for color and aroma—perfect for rice dishes, desserts, and tea.
          </ThemedText>
          <Button onPress={() => router.push('/(tabs)/shop')}>Shop saffron</Button>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Featured</ThemedText>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/product/${featured.id}`)}
            style={[styles.featureCard, { borderColor: c.border }]}>
            <Image source={{ uri: featured.image }} style={styles.featureImage} />
            <View style={styles.featureText}>
              <ThemedText type="defaultSemiBold">{featured.name}</ThemedText>
              <ThemedText style={styles.muted}>{featured.shortDescription}</ThemedText>
              <ThemedText style={[styles.price, { color: c.primary }]}>
                {formatUsd(featured.priceCents)} · {featured.weightLabel}
              </ThemedText>
            </View>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: 32 },
  hero: { paddingHorizontal: 20, paddingTop: 8, gap: 12 },
  brandTitle: { fontSize: 32, letterSpacing: 0.5 },
  tagline: { fontSize: 16, opacity: 0.85 },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: radius.xl,
  },
  heroCopy: { fontSize: 15, lineHeight: 22 },
  section: { paddingHorizontal: 20, marginTop: 28, gap: 12 },
  featureCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: radius.xl,
    overflow: 'hidden',
    gap: 12,
    padding: 12,
  },
  featureImage: { width: 100, height: 100, borderRadius: radius.lg },
  featureText: { flex: 1, justifyContent: 'center', gap: 4 },
  muted: { opacity: 0.75, fontSize: 14 },
  price: { fontWeight: '700', marginTop: 4 },
});
