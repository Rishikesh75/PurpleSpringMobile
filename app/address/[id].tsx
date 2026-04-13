import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { spacing } from '@/constants/theme';
import { useAccount } from '@/context/AccountContext';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export default function EditAddressScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user, addresses, updateAddress } = useAccount();
  const c = useSemanticPalette();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [pincode, setPincode] = useState('');
  const [saving, setSaving] = useState(false);

  const addressId = typeof id === 'string' ? id : '';
  const existing = addresses.find((a) => a.id === addressId);

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setPhone(existing.phone);
      setAddressLine(existing.addressLine);
      setPincode(existing.pincode);
    }
  }, [existing]);

  const onSave = async () => {
    const n = name.trim();
    const p = phone.trim();
    const a = addressLine.trim();
    const z = pincode.trim();
    if (!n || !p || !a || !z) {
      Alert.alert('Missing fields', 'Please fill name, phone, address, and PIN code.');
      return;
    }
    if (!/^\d{6}$/.test(z)) {
      Alert.alert('PIN code', 'Enter a 6-digit PIN code.');
      return;
    }
    if (!existing) return;
    setSaving(true);
    try {
      await updateAddress(existing.id, { name: n, phone: p, addressLine: a, pincode: z });
      router.back();
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Sign in from Profile to edit addresses.</ThemedText>
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <ThemedText type="link">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  if (!existing) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Address not found.</ThemedText>
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <ThemedText type="link">Go back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <ThemedText style={[styles.hint, { color: c.mutedForeground }]}>
          Update where we should deliver your orders.
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Full name
        </ThemedText>
        <Input value={name} onChangeText={setName} placeholder="Name" autoCapitalize="words" />
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Phone number
        </ThemedText>
        <Input
          value={phone}
          onChangeText={setPhone}
          placeholder="10-digit mobile"
          keyboardType="phone-pad"
        />
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Address
        </ThemedText>
        <Input
          value={addressLine}
          onChangeText={setAddressLine}
          placeholder="House, street, area"
          multiline
          style={styles.addressInput}
        />
        <ThemedText type="defaultSemiBold" style={styles.label}>
          PIN code
        </ThemedText>
        <Input
          value={pincode}
          onChangeText={setPincode}
          placeholder="6-digit PIN"
          keyboardType="number-pad"
          maxLength={6}
        />
        <Button onPress={() => void onSave()} disabled={saving} style={styles.save}>
          Save changes
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: spacing[5], paddingBottom: 40, gap: spacing[2] },
  center: {
    flex: 1,
    padding: spacing[6],
    justifyContent: 'center',
    gap: spacing[4],
    alignItems: 'center',
  },
  hint: { fontSize: 14, lineHeight: 20, marginBottom: spacing[2] },
  label: { marginTop: spacing[2] },
  addressInput: { minHeight: 88, textAlignVertical: 'top' },
  save: { marginTop: spacing[6] },
});
