import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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
import { radius, spacing } from '@/constants/theme';
import { useAccount } from '@/context/AccountContext';
import { useCart } from '@/hooks/useCart';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import { formatUsd } from '@/utils/format';

type PaymentMethod = 'upi' | 'cod' | 'card';

export default function CheckoutScreen() {
  const router = useRouter();
  const c = useSemanticPalette();
  const { isReady, user, addresses } = useAccount();
  const { lines, subtotalCents, clear } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  const defaultAddress = addresses[0];
  const addressPrefilled = useRef(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (defaultAddress && !addressPrefilled.current) {
      addressPrefilled.current = true;
      setAddress(
        `${defaultAddress.name}\n${defaultAddress.phone}\n${defaultAddress.addressLine}\nPIN ${defaultAddress.pincode}`,
      );
    }
  }, [defaultAddress]);

  if (!isReady) {
    return (
      <SafeAreaView style={[styles.flex, { backgroundColor: c.background }]} edges={['bottom']}>
        <ThemedView style={styles.centered}>
          <ActivityIndicator size="large" color={c.primary} />
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (lines.length === 0) {
    return (
      <SafeAreaView style={[styles.flex, { backgroundColor: c.background }]} edges={['bottom']}>
        <ThemedView style={styles.empty}>
          <ThemedText type="title">Nothing to checkout</ThemedText>
          <Pressable onPress={() => router.replace('/(tabs)/shop')}>
            <ThemedText type="link">Go to shop</ThemedText>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={[styles.flex, { backgroundColor: c.background }]} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.gateScroll}>
          <ThemedText type="title" style={styles.gateTitle}>
            Sign in to checkout
          </ThemedText>
          <ThemedText style={[styles.gateBody, { color: c.mutedForeground }]}>
            Please sign in to continue with your order, view delivery options, and pay securely. Your
            cart is saved.
          </ThemedText>
          <Button onPress={() => router.push('/(tabs)/profile')} style={styles.gateBtn}>
            Sign in
          </Button>
          <Button variant="outline" onPress={() => router.back()}>
            Back to cart
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const submit = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing info', 'Please enter your name and email.');
      return;
    }
    if (paymentMethod !== 'upi') {
      Alert.alert('Payment method', 'Only UPI is available for now.');
      return;
    }
    clear();
    Alert.alert(
      'Order placed (demo)',
      'Paid with UPI (demo—no real payment). Thank you!',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)') }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <ThemedText type="subtitle">Account</ThemedText>
        <ThemedText style={[styles.hint, { color: c.mutedForeground }]}>
          Signed in as {user.email}
        </ThemedText>

        <ThemedText type="subtitle" style={styles.blockTitle}>
          Delivery
        </ThemedText>
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
          placeholder="Delivery address"
          style={styles.multiline}
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <ThemedText type="subtitle" style={styles.blockTitle}>
          Payment
        </ThemedText>
        <ThemedText style={[styles.hint, { color: c.mutedForeground }]}>
          UPI is available now. Cash on delivery and cards will be supported in a future update.
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: paymentMethod === 'upi' }}
          onPress={() => setPaymentMethod('upi')}
          style={[
            styles.payRow,
            {
              borderColor: paymentMethod === 'upi' ? c.primary : c.border,
              backgroundColor: c.card,
            },
          ]}>
          <View style={styles.payRowMain}>
            <ThemedText type="defaultSemiBold">UPI</ThemedText>
            <ThemedText style={[styles.paySub, { color: c.mutedForeground }]}>
              Pay with any UPI app (demo flow)
            </ThemedText>
          </View>
          <View style={[styles.radioOuter, { borderColor: c.primary }]}>
            {paymentMethod === 'upi' ? <View style={[styles.radioInner, { backgroundColor: c.primary }]} /> : null}
          </View>
        </Pressable>

        <View
          style={[
            styles.payRow,
            styles.payRowDisabled,
            { borderColor: c.border, backgroundColor: c.muted },
          ]}>
          <View style={styles.payRowMain}>
            <ThemedText style={{ opacity: 0.65 }}>Cash on delivery (COD)</ThemedText>
            <ThemedText style={[styles.paySub, { color: c.mutedForeground }]}>
              Coming soon
            </ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.payRow,
            styles.payRowDisabled,
            { borderColor: c.border, backgroundColor: c.muted },
          ]}>
          <View style={styles.payRowMain}>
            <ThemedText style={{ opacity: 0.65 }}>Credit / debit card</ThemedText>
            <ThemedText style={[styles.paySub, { color: c.mutedForeground }]}>
              Coming soon
            </ThemedText>
          </View>
        </View>

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
          Pay with UPI & place order
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 },
  gateScroll: { padding: 24, paddingTop: 40, gap: spacing[4], paddingBottom: 40 },
  gateTitle: { textAlign: 'center' },
  gateBody: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  gateBtn: { marginTop: spacing[2] },
  scroll: { padding: 20, gap: 12, paddingBottom: 40 },
  blockTitle: { marginTop: spacing[2] },
  hint: { opacity: 0.85, marginBottom: 4, fontSize: 14 },
  multiline: { minHeight: 88, textAlignVertical: 'top' },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 2,
    gap: spacing[3],
  },
  payRowDisabled: { opacity: 0.9 },
  payRowMain: { flex: 1, gap: 4 },
  paySub: { fontSize: 13, lineHeight: 18 },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
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
