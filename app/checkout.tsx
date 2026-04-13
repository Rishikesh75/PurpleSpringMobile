import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import { formatUsd } from '@/utils/format';

export default function CheckoutScreen() {
  const router = useRouter();
  const c = useSemanticPalette();
  const { lines, subtotalCents, clear } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  if (lines.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['bottom']}>
        <ThemedView style={styles.empty}>
          <ThemedText type="title">Nothing to checkout</ThemedText>
          <Pressable onPress={() => router.replace('/(tabs)/shop')}>
            <ThemedText type="link">Go to shop</ThemedText>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const submit = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing info', 'Please enter your name and email.');
      return;
    }
    clear();
    Alert.alert(
      'Order placed (demo)',
      'Thank you! This is a demo—no payment was processed.',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)') }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <ThemedText type="subtitle">Delivery</ThemedText>
        <ThemedText style={styles.hint}>Demo only—no real orders.</ThemedText>
        <Input placeholder="Full name" value={name} onChangeText={setName} />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Address (optional)"
          style={styles.multiline}
          multiline
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.summary}>
          <ThemedText type="defaultSemiBold">Order summary</ThemedText>
          {lines.map((line) => (
            <View key={line.product.id} style={styles.row}>
              <ThemedText style={styles.rowLabel}>
                {line.product.name} × {line.quantity}
              </ThemedText>
              <ThemedText>{formatUsd(line.product.priceCents * line.quantity)}</ThemedText>
            </View>
          ))}
          <Separator style={styles.sep} />
          <View style={[styles.row, styles.totalRow]}>
            <ThemedText type="defaultSemiBold">Total</ThemedText>
            <ThemedText style={{ color: c.primary, fontWeight: '700', fontSize: 18 }}>
              {formatUsd(subtotalCents)}
            </ThemedText>
          </View>
        </View>
        <Button onPress={submit} style={styles.place}>
          Place order
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 },
  scroll: { padding: 20, gap: 12, paddingBottom: 40 },
  hint: { opacity: 0.7, marginBottom: 4 },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  summary: { marginTop: 16, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { flex: 1, paddingRight: 12 },
  totalRow: { marginTop: 8, paddingTop: 4 },
  sep: { marginTop: 8 },
  place: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
});
