import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AboutTabScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedView style={styles.block}>
          <ThemedText type="title">Purple Spring</ThemedText>
          <ThemedText style={styles.p}>
            We sell traceable, lab-tested saffron from trusted regions—Kashmir, Spain, and Persia—so
            you get real threads with the aroma and color you expect.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.block}>
          <ThemedText type="subtitle">Shipping</ThemedText>
          <ThemedText style={styles.p}>
            Orders pack in light-proof jars. Standard delivery timelines apply at checkout
            (demo—no real charges in this app).
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.block}>
          <ThemedText type="subtitle">Support</ThemedText>
          <ThemedText style={styles.p}>hello@purplespring.example</ThemedText>
        </ThemedView>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/(tabs)/shop')}
          style={[styles.cta, { backgroundColor: tint }]}>
          <ThemedText style={styles.ctaText} lightColor="#fff" darkColor="#1a1025">
            Shop now
          </ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40, gap: 20 },
  block: { gap: 8 },
  p: { fontSize: 16, lineHeight: 24, opacity: 0.9 },
  cta: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaText: { fontSize: 17, fontWeight: '600' },
});
