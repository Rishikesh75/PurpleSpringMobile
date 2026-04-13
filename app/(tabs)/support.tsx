import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { radius, spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import { generateAssistantReply, nextMessageId } from '@/utils/support-ai-replies';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text:
    "Hi! I'm Purple Spring's AI assistant. Ask about saffron, orders, shipping, or policies—I'm here to help.",
};

export default function SupportTabScreen() {
  const c = useSemanticPalette();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const send = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || thinking) return;

    const userMsg: ChatMessage = {
      id: nextMessageId(),
      role: 'user',
      text: trimmed,
    };
    setInput('');
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    const delayMs = 600 + Math.floor(Math.random() * 400);
    setTimeout(() => {
      const reply: ChatMessage = {
        id: nextMessageId(),
        role: 'assistant',
        text: generateAssistantReply(trimmed),
      };
      setMessages((prev) => [...prev, reply]);
      setThinking(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }, delayMs);
  }, [input, thinking]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <ThemedView style={[styles.header, { borderBottomColor: c.border }]}>
        <View style={[styles.headerIcon, { backgroundColor: c.muted }]}>
          <IconSymbol name="headset.circle.fill" size={26} color={c.primary} />
        </View>
        <View style={styles.headerText}>
          <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
            Customer support
          </ThemedText>
          <ThemedText style={[styles.headerSub, { color: c.mutedForeground }]}>
            AI assistant · demo replies
          </ThemedText>
        </View>
      </ThemedView>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubbleWrap,
                item.role === 'user' ? styles.bubbleWrapUser : styles.bubbleWrapAssistant,
              ]}>
              <View
                style={[
                  styles.bubble,
                  item.role === 'user'
                    ? { backgroundColor: c.primary }
                    : { backgroundColor: c.muted, borderWidth: 1, borderColor: c.border },
                ]}>
                <ThemedText
                  style={[
                    styles.bubbleText,
                    item.role === 'user' ? { color: c.primaryForeground } : { color: c.foreground },
                  ]}>
                  {item.text}
                </ThemedText>
              </View>
            </View>
          )}
          ListFooterComponent={
            thinking ? (
              <View style={[styles.typing, { alignSelf: 'flex-start' }]}>
                <ActivityIndicator size="small" color={c.primary} />
                <ThemedText style={[styles.typingText, { color: c.mutedForeground }]}>
                  Assistant is typing…
                </ThemedText>
              </View>
            ) : null
          }
        />

        <View style={[styles.composer, { borderTopColor: c.border, backgroundColor: c.card }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message…"
            placeholderTextColor={c.mutedForeground}
            style={[
              styles.input,
              {
                color: c.foreground,
                borderColor: c.border,
                backgroundColor: c.background,
              },
            ]}
            multiline
            maxLength={2000}
            editable={!thinking}
            onSubmitEditing={() => send()}
            blurOnSubmit={false}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send message"
            onPress={() => send()}
            disabled={thinking || !input.trim()}
            style={({ pressed }) => [
              styles.sendBtn,
              { backgroundColor: c.primary, opacity: pressed ? 0.85 : thinking ? 0.5 : 1 },
            ]}>
            <IconSymbol name="paperplane.fill" size={22} color={c.primaryForeground} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 18 },
  headerSub: { fontSize: 13, marginTop: 2 },
  listContent: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    paddingBottom: spacing[6],
    gap: spacing[3],
  },
  bubbleWrap: { maxWidth: '88%' },
  bubbleWrapUser: { alignSelf: 'flex-end' },
  bubbleWrapAssistant: { alignSelf: 'flex-start' },
  bubble: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  bubbleText: { fontSize: 16, lineHeight: 22 },
  typing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[2],
  },
  typingText: { fontSize: 13 },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: 16,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
