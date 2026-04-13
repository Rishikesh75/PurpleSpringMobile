import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { isPolicySlug, POLICIES } from '@/constants/policies';
import { spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export default function PolicyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const c = useSemanticPalette();

  const slug = typeof id === 'string' ? id : '';
  const policy = isPolicySlug(slug) ? POLICIES[slug] : null;

  useLayoutEffect(() => {
    if (policy) {
      navigation.setOptions({ title: policy.title });
    }
  }, [navigation, policy]);

  if (!policy) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Policy not found.</ThemedText>
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <ThemedText type="link">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: c.background }]}
      contentContainerStyle={styles.scroll}>
      <ThemedText type="subtitle" style={styles.title}>
        {policy.title}
      </ThemedText>
      {policy.paragraphs.map((p, i) => (
        <ThemedText key={i} style={[styles.p, { color: c.foreground }]}>
          {p}
        </ThemedText>
      ))}
      <ThemedText style={[styles.note, { color: c.mutedForeground }]}>
        This is a general summary for the app demo. Replace with counsel-approved text before
        production.
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: spacing[5], paddingBottom: 40, gap: spacing[4] },
  center: { flex: 1, padding: spacing[6], justifyContent: 'center', gap: spacing[3], alignItems: 'center' },
  title: { marginBottom: spacing[1] },
  p: { fontSize: 16, lineHeight: 26, opacity: 0.95 },
  note: { fontSize: 13, lineHeight: 18, marginTop: spacing[4], fontStyle: 'italic' },
});
