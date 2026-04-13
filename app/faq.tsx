import { ScrollView, StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ThemedText } from '@/components/themed-text';
import { FAQ_ITEMS } from '@/constants/faqs';
import { radius, spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export default function FaqScreen() {
  const c = useSemanticPalette();

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: c.background }]}
      contentContainerStyle={styles.scroll}>
      <ThemedText style={[styles.intro, { color: c.mutedForeground }]}>
        Tap a question to expand the answer.
      </ThemedText>
      <View style={[styles.list, { borderColor: c.border, backgroundColor: c.card }]}>
        {FAQ_ITEMS.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.faqItem,
              index < FAQ_ITEMS.length - 1 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: c.border,
              },
            ]}>
            <Collapsible title={item.question}>
              <ThemedText style={styles.answer}>{item.answer}</ThemedText>
            </Collapsible>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: spacing[5], paddingBottom: 40 },
  intro: { fontSize: 14, lineHeight: 20, marginBottom: spacing[4] },
  list: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  faqItem: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  answer: { fontSize: 15, lineHeight: 22, opacity: 0.95 },
});
