import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export default function AboutTabScreen() {
  const router = useRouter();
  const c = useSemanticPalette();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
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
        <Button onPress={() => router.push('/(tabs)/cart')} style={styles.cta}>
          Shop now
        </Button>
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
    marginTop: 8,
    alignSelf: 'stretch',
  },
});
