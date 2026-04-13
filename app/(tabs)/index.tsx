import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SAFFRON_PRODUCTS } from '@/constants/products';
import { radius, spacing } from '@/constants/theme';
import { useColorSchemeContext } from '@/context/ColorSchemeContext';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import { formatUsd } from '@/utils/format';

const HOME_PREVIEW_COUNT = 3;

const CUSTOMER_REVIEWS = [
  {
    id: 'r1',
    name: 'Ananya K.',
    location: 'Bengaluru',
    rating: 5,
    text: 'The Kashmiri saffron aroma is incredible—vivid color in biryani and exactly what we hoped for. Will order again.',
  },
  {
    id: 'r2',
    name: 'Rahul M.',
    location: 'Hyderabad',
    rating: 5,
    text: 'Packaging is light-proof and delivery was smooth. Great for gifting—friends asked where we bought it.',
  },
  {
    id: 'r3',
    name: 'Priya S.',
    location: 'Pune',
    rating: 4,
    text: 'Organic range feels trustworthy. Support answered quickly when we had a question about storage.',
  },
] as const;

function Stars({ count, color }: { count: number; color: string }) {
  return (
    <ThemedText
      style={{ fontSize: 16, letterSpacing: 2, color }}
      accessibilityLabel={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
    </ThemedText>
  );
}

const REVIEW_GAP = 12;

export default function HomeScreen() {
  const router = useRouter();
  const c = useSemanticPalette();
  const { resolvedColorScheme, toggleLightDark } = useColorSchemeContext();
  const previewProducts = SAFFRON_PRODUCTS.slice(0, HOME_PREVIEW_COUNT);
  const { width: windowWidth } = useWindowDimensions();
  /** One primary card per “page”, slight peek of the next slide */
  const reviewCardWidth = Math.min(windowWidth - 56, 340);
  const reviewSnapInterval = reviewCardWidth + REVIEW_GAP;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.topBar}>
          <View style={styles.topBarActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                resolvedColorScheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
              }
              accessibilityHint="Toggles app color theme"
              onPress={() => void toggleLightDark()}
              style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}>
              <IconSymbol
                name={resolvedColorScheme === 'dark' ? 'sun.max.fill' : 'moon.stars'}
                size={28}
                color={c.foreground}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="About Purple Spring"
              accessibilityHint="Opens the About page"
              onPress={() => router.push('/about')}
              style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}>
              <IconSymbol name="info.circle.fill" size={28} color={c.foreground} />
            </Pressable>
          </View>
        </View>

        <ThemedView style={styles.hero}>
          <View style={styles.brandBlock}>
            <ThemedText type="title" style={styles.brandTitle}>
              Purple Springs
            </ThemedText>
            <ThemedText style={[styles.categoryGold, { color: c.chart2 }]}>
              wellness/Skincare/HerbalLiving
            </ThemedText>
          </View>
          <View style={[styles.heroImageWrap, { borderColor: c.border }]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1596040033229-a9821ebd38af?w=1200&q=80',
              }}
              style={styles.heroImage}
              contentFit="cover"
            />
            <View style={styles.heroImageOverlay}>
              <ThemedText style={styles.heroOverlayText}>
                Discover premium Kashmiri saffron and handpicked organic products sourced directly from
                the finest farms.
              </ThemedText>
            </View>
          </View>
          <Button onPress={() => router.push('/(tabs)/shop')}>Shop saffron</Button>
        </ThemedView>

        <ThemedView style={styles.section}>
          <View style={styles.sectionHeading}>
            <ThemedText type="subtitle">Popular picks</ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityHint="Opens the full shop catalog"
              onPress={() => router.push('/(tabs)/shop')}
              style={({ pressed }) => [styles.showMore, pressed && styles.showMorePressed]}>
              <ThemedText style={[styles.showMoreText, { color: c.primary }]}>Show more</ThemedText>
              <IconSymbol name="chevron.right" size={18} color={c.primary} />
            </Pressable>
          </View>
          {previewProducts.map((product) => (
            <Pressable
              key={product.id}
              accessibilityRole="button"
              onPress={() => router.push(`/product/${product.id}`)}
              style={[styles.featureCard, { borderColor: c.border }]}>
              <Image source={{ uri: product.image }} style={styles.featureImage} />
              <View style={styles.featureText}>
                <ThemedText type="defaultSemiBold">{product.name}</ThemedText>
                <ThemedText style={styles.muted}>{product.shortDescription}</ThemedText>
                <ThemedText style={[styles.price, { color: c.primary }]}>
                  {formatUsd(product.priceCents)} · {product.weightLabel}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </ThemedView>

        <ThemedView style={styles.reviewsSection}>
          <ThemedText type="subtitle" style={styles.reviewsSectionTitle}>
            What customers say
          </ThemedText>
          <ThemedText style={[styles.reviewsIntro, { color: c.mutedForeground }]}>
            Real feedback from shoppers who tried Purple Spring saffron and organic picks. Swipe
            sideways for more.
          </ThemedText>
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator
            decelerationRate="fast"
            snapToInterval={reviewSnapInterval}
            snapToAlignment="start"
            disableIntervalMomentum
            contentContainerStyle={styles.reviewsCarouselContent}
            accessibilityLabel="Customer reviews carousel">
            {CUSTOMER_REVIEWS.map((review, index) => (
              <View
                key={review.id}
                style={[
                  styles.reviewCard,
                  {
                    width: reviewCardWidth,
                    borderColor: c.border,
                    backgroundColor: c.card,
                    marginRight: index < CUSTOMER_REVIEWS.length - 1 ? REVIEW_GAP : 0,
                  },
                ]}>
                <Stars count={review.rating} color={c.chart2} />
                <ThemedText style={styles.reviewQuote}>&ldquo;{review.text}&rdquo;</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.reviewName}>
                  {review.name}
                </ThemedText>
                <ThemedText style={[styles.reviewMeta, { color: c.mutedForeground }]}>
                  {review.location}
                </ThemedText>
              </View>
            ))}
          </ScrollView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: 32 },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  topBarActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn: {
    padding: 4,
    borderRadius: radius.md,
  },
  iconBtnPressed: { opacity: 0.65 },
  hero: { paddingHorizontal: 20, paddingTop: 8, gap: 12 },
  brandBlock: { gap: 0 },
  brandTitle: { fontSize: 32, letterSpacing: 0.5, marginBottom: 0, lineHeight: 38 },
  categoryGold: {
    marginTop: 0,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  heroImageWrap: {
    width: '100%',
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroImageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroOverlayText: {
    color: '#fafafa',
    fontSize: 14,
    lineHeight: 20,
  },
  section: { paddingHorizontal: 20, marginTop: 28, gap: 12 },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  showMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
    paddingLeft: 8,
  },
  showMorePressed: { opacity: 0.7 },
  showMoreText: { fontSize: 15, fontWeight: '600' },
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
  reviewsSection: { marginTop: 28, gap: 12 },
  reviewsSectionTitle: { marginBottom: 0, paddingHorizontal: 20 },
  reviewsIntro: { fontSize: 14, lineHeight: 20, marginBottom: 4, paddingHorizontal: 20 },
  reviewsCarouselContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 4,
  },
  reviewCard: {
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing[4],
    gap: spacing[2],
  },
  reviewQuote: { fontSize: 15, lineHeight: 22, marginTop: 4 },
  reviewName: { fontSize: 16, marginTop: 4 },
  reviewMeta: { fontSize: 13 },
});
