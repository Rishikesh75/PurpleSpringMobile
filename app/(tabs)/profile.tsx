import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { radius, spacing } from '@/constants/theme';
import { useAccount } from '@/context/AccountContext';
import { useSemanticPalette } from '@/hooks/use-semantic-color';
import type { Order, OrderStatus } from '@/types/account';

function orderStatusLabel(s: OrderStatus): string {
  switch (s) {
    case 'processing':
      return 'Processing';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    default:
      return s;
  }
}

export default function ProfileScreen() {
  const router = useRouter();
  const c = useSemanticPalette();
  const { isReady, user, signIn, signOut, addresses, orders, deleteAddress } = useAccount();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [pincode, setPincode] = useState('');
  const [signInError, setSignInError] = useState<string | null>(null);

  const onSignIn = async () => {
    setSignInError(null);
    const result = await signIn(email, password, {
      recipientName,
      phone: deliveryPhone,
      addressLine,
      pincode,
    });
    if (!result.ok) {
      setSignInError(result.error ?? 'Could not sign in.');
    }
  };

  if (!isReady) {
    return (
      <ThemedView style={[styles.loading, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {!user ? (
          <>
            <ThemedText type="title" style={styles.signInTitle}>
              Sign in
            </ThemedText>
            <ThemedText style={[styles.demoNote, { color: c.mutedForeground }]}>
              Demo: use any email and password. Your delivery address is required and saved on this
              device.
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Email
            </ThemedText>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Password
            </ThemedText>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />

            <ThemedText type="subtitle" style={styles.deliveryHeading}>
              Delivery address
            </ThemedText>
            <ThemedText style={[styles.deliveryHint, { color: c.mutedForeground }]}>
              Where should we ship your orders? Required to create your account.
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Recipient name
            </ThemedText>
            <Input
              value={recipientName}
              onChangeText={setRecipientName}
              placeholder="Full name for delivery"
              autoCapitalize="words"
            />
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Phone number
            </ThemedText>
            <Input
              value={deliveryPhone}
              onChangeText={setDeliveryPhone}
              placeholder="10-digit mobile"
              keyboardType="phone-pad"
            />
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Address
            </ThemedText>
            <Input
              value={addressLine}
              onChangeText={setAddressLine}
              placeholder="House, street, area, city"
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

            {signInError ? (
              <ThemedText style={[styles.error, { color: c.destructive }]}>{signInError}</ThemedText>
            ) : null}
            <Button onPress={() => void onSignIn()} style={styles.signInBtn}>
              Sign in
            </Button>
          </>
        ) : (
          <>
            <ThemedView style={styles.header}>
              <View style={[styles.avatar, { backgroundColor: c.muted, borderColor: c.border }]}>
                <IconSymbol name="person.circle.fill" size={56} color={c.mutedForeground} />
              </View>
              <ThemedText type="title" style={styles.name}>
                {user.name}
              </ThemedText>
              <ThemedText style={[styles.email, { color: c.mutedForeground }]}>{user.email}</ThemedText>
              <Button variant="outline" onPress={() => void signOut()} style={styles.signOutBtn}>
                Sign out
              </Button>
            </ThemedView>

            <ThemedText type="subtitle" style={styles.sectionLabel}>
              Delivery addresses
            </ThemedText>
            <Button variant="outline" onPress={() => router.push('/address/new')} style={styles.addBtn}>
              Add new address
            </Button>
            {addresses.length === 0 ? (
              <ThemedText style={[styles.emptyHint, { color: c.mutedForeground }]}>
                No saved addresses yet. Add your name, phone, address, and PIN code.
              </ThemedText>
            ) : (
              addresses.map((a) => (
                <View
                  key={a.id}
                  style={[styles.addressCard, { borderColor: c.border, backgroundColor: c.card }]}>
                  <ThemedText type="defaultSemiBold">{a.name}</ThemedText>
                  <ThemedText style={styles.addrLine}>{a.phone}</ThemedText>
                  <ThemedText style={styles.addrLine}>{a.addressLine}</ThemedText>
                  <ThemedText style={styles.addrLine}>PIN {a.pincode}</ThemedText>
                  <View style={styles.addressActions}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Change address for ${a.name}`}
                      onPress={() =>
                        router.push({ pathname: '/address/[id]', params: { id: a.id } })
                      }
                      style={styles.changeAddr}>
                      <ThemedText style={{ color: c.primary, fontSize: 14, fontWeight: '600' }}>
                        Change
                      </ThemedText>
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Remove address for ${a.name}`}
                      onPress={() => void deleteAddress(a.id)}
                      style={styles.removeAddr}>
                      <ThemedText style={{ color: c.destructive, fontSize: 14, fontWeight: '600' }}>
                        Remove
                      </ThemedText>
                    </Pressable>
                  </View>
                </View>
              ))
            )}

            <ThemedText type="subtitle" style={styles.sectionLabel}>
              Your orders
            </ThemedText>
            {orders.length === 0 ? (
              <ThemedText style={[styles.emptyHint, { color: c.mutedForeground }]}>
                No orders yet. Purchases will appear here.
              </ThemedText>
            ) : (
              <>
                {orders.slice(0, 4).map((o) => (
                  <OrderPreviewCard key={o.id} order={o} />
                ))}
                <Button variant="outline" onPress={() => router.push('/orders')} style={styles.viewAll}>
                  View all orders
                </Button>
              </>
            )}
          </>
        )}

        <ThemedText type="subtitle" style={styles.sectionLabel}>
          Purple Spring
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="About Purple Spring"
          onPress={() => router.push('/about')}
          style={({ pressed }) => [
            styles.row,
            { borderColor: c.border, backgroundColor: c.card, opacity: pressed ? 0.85 : 1 },
          ]}>
          <ThemedText type="defaultSemiBold" style={styles.rowTitle}>
            About Purple Spring
          </ThemedText>
          <IconSymbol name="chevron.right" size={22} color={c.mutedForeground} />
        </Pressable>
        <ThemedText style={[styles.rowCaption, { color: c.mutedForeground }]}>
          Our story, values, events, and videos.
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

function OrderPreviewCard({ order }: { order: Order }) {
  const router = useRouter();
  const c = useSemanticPalette();
  const date = new Date(order.placedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const canTrack = order.status === 'processing' || order.status === 'shipped';

  return (
    <View style={[styles.orderCard, { borderColor: c.border, backgroundColor: c.card }]}>
      <View style={styles.orderTop}>
        <ThemedText type="defaultSemiBold">{order.id}</ThemedText>
        <View style={[styles.badge, { backgroundColor: c.muted }]}>
          <ThemedText style={[styles.badgeText, { color: c.primary }]}>
            {orderStatusLabel(order.status)}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.orderDate, { color: c.mutedForeground }]}>{date}</ThemedText>
      <ThemedText style={styles.orderSummary}>{order.itemsSummary}</ThemedText>
      <ThemedText type="defaultSemiBold">{order.totalLabel}</ThemedText>
      {canTrack ? (
        <Button
          size="sm"
          onPress={() => router.push({ pathname: '/order/[id]', params: { id: order.id } })}
          style={styles.trackInline}>
          Track your order
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { padding: spacing[5], paddingBottom: 40, gap: spacing[2] },
  signInTitle: { marginBottom: spacing[1] },
  demoNote: { fontSize: 14, lineHeight: 20, marginBottom: spacing[2] },
  label: { marginTop: spacing[2] },
  signInBtn: { marginTop: spacing[4] },
  deliveryHeading: { marginTop: spacing[5] },
  deliveryHint: { fontSize: 14, lineHeight: 20, marginBottom: spacing[1] },
  addressInput: { minHeight: 80, textAlignVertical: 'top' },
  error: { marginTop: spacing[2], fontSize: 14 },
  header: { alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[1],
  },
  name: { fontSize: 26 },
  email: { fontSize: 15 },
  signOutBtn: { marginTop: spacing[2], alignSelf: 'stretch' },
  sectionLabel: { marginTop: spacing[5], marginBottom: spacing[2] },
  addBtn: { alignSelf: 'stretch' },
  emptyHint: { fontSize: 14, lineHeight: 20 },
  addressCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: 4,
    marginTop: spacing[2],
  },
  addrLine: { fontSize: 15, lineHeight: 22 },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[5],
    marginTop: spacing[2],
  },
  changeAddr: { alignSelf: 'flex-start' },
  removeAddr: { alignSelf: 'flex-start' },
  orderCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[1],
    marginTop: spacing[2],
  },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: spacing[2], paddingVertical: 4, borderRadius: radius.sm },
  badgeText: { fontSize: 12, fontWeight: '700' },
  orderDate: { fontSize: 13 },
  orderSummary: { fontSize: 15, lineHeight: 22 },
  trackInline: { marginTop: spacing[2], alignSelf: 'flex-start' },
  viewAll: { marginTop: spacing[2] },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  rowTitle: { flex: 1 },
  rowCaption: { fontSize: 14, lineHeight: 20, marginTop: spacing[1], paddingHorizontal: spacing[1] },
});
