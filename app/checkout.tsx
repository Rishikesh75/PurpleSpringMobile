import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useCart } from '@/hooks/useCart';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { formatUsd } from '@/utils/format';

export default function CheckoutScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const { lines, subtotalCents, clear } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  if (lines.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
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
      [{ text: 'OK', onPress: () => router.replace('/(tabs)/') }],
    );
  };

  const inputStyle = [
    styles.input,
    colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <ThemedText type="subtitle">Delivery</ThemedText>
        <ThemedText style={styles.hint}>Demo only—no real orders.</ThemedText>
        <TextInput
          placeholder="Full name"
          placeholderTextColor="#888"
          style={inputStyle}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={inputStyle}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Address (optional)"
          placeholderTextColor="#888"
          style={[inputStyle, styles.multiline]}
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
          <View style={[styles.row, styles.totalRow]}>
            <ThemedText type="defaultSemiBold">Total</ThemedText>
            <ThemedText style={{ color: tint, fontWeight: '700', fontSize: 18 }}>
              {formatUsd(subtotalCents)}
            </ThemedText>
          </View>
        </View>
        <Pressable style={[styles.place, { backgroundColor: tint }]} onPress={submit}>
          <ThemedText style={styles.placeText} lightColor="#fff" darkColor="#1a1025">
            Place order
          </ThemedText>
        </Pressable>
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
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputLight: {
    borderColor: '#ccc',
    color: '#111',
    backgroundColor: '#fafafa',
  },
  inputDark: {
    borderColor: '#444',
    color: '#eee',
    backgroundColor: '#222',
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  summary: { marginTop: 16, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { flex: 1, paddingRight: 12 },
  totalRow: { marginTop: 8, paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#888' },
  place: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeText: { fontSize: 17, fontWeight: '600' },
});
