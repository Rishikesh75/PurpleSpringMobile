import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { DEMO_ORDERS } from '@/constants/demo-orders';
import type { AccountUser, DeliveryAddress, Order } from '@/types/account';

const KEY_USER = '@purplespring/account_user';
const KEY_ADDRESSES = '@purplespring/account_addresses';
const KEY_ORDERS = '@purplespring/account_orders';

export type SignInDelivery = {
  recipientName: string;
  phone: string;
  addressLine: string;
  pincode: string;
};

type AccountContextValue = {
  isReady: boolean;
  user: AccountUser | null;
  addresses: DeliveryAddress[];
  orders: Order[];
  signIn: (
    email: string,
    password: string,
    delivery: SignInDelivery,
  ) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  addAddress: (fields: Omit<DeliveryAddress, 'id'>) => Promise<void>;
  updateAddress: (id: string, fields: Omit<DeliveryAddress, 'id'>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
};

const AccountContext = createContext<AccountContextValue | null>(null);

function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<AccountUser | null>(null);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [u, a, o] = await Promise.all([
          AsyncStorage.getItem(KEY_USER),
          AsyncStorage.getItem(KEY_ADDRESSES),
          AsyncStorage.getItem(KEY_ORDERS),
        ]);
        if (cancelled) return;
        if (u) {
          const parsed = JSON.parse(u) as AccountUser;
          if (parsed?.email && parsed?.name) setUser(parsed);
        }
        if (a) {
          const parsed = JSON.parse(a) as DeliveryAddress[];
          if (Array.isArray(parsed)) setAddresses(parsed);
        }
        if (o) {
          const parsed = JSON.parse(o) as Order[];
          if (Array.isArray(parsed)) setOrders(parsed);
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (user) {
      AsyncStorage.setItem(KEY_USER, JSON.stringify(user)).catch(() => {});
    } else {
      AsyncStorage.removeItem(KEY_USER).catch(() => {});
    }
  }, [user, isReady]);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(KEY_ADDRESSES, JSON.stringify(addresses)).catch(() => {});
  }, [addresses, isReady]);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(KEY_ORDERS, JSON.stringify(orders)).catch(() => {});
  }, [orders, isReady]);

  const signIn = useCallback(async (email: string, password: string, delivery: SignInDelivery) => {
    const trimmed = email.trim();
    if (!trimmed || !password.trim()) {
      return { ok: false, error: 'Enter email and password.' };
    }
    const rn = delivery.recipientName.trim();
    const ph = delivery.phone.trim();
    const al = delivery.addressLine.trim();
    const pc = delivery.pincode.trim();
    if (!rn || !ph || !al || !pc) {
      return { ok: false, error: 'Enter the full delivery address (name, phone, address, PIN).' };
    }
    if (!/^\d{6}$/.test(pc)) {
      return { ok: false, error: 'PIN code must be 6 digits.' };
    }
    const local = trimmed.split('@')[0] ?? 'Customer';
    const name = local.charAt(0).toUpperCase() + local.slice(1);
    const primaryAddress: DeliveryAddress = {
      id: genId('addr'),
      name: rn,
      phone: ph,
      addressLine: al,
      pincode: pc,
    };
    setUser({ email: trimmed, name });
    setAddresses([primaryAddress]);
    setOrders((prev) => (prev.length === 0 ? [...DEMO_ORDERS] : prev));
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setAddresses([]);
    setOrders([]);
    await Promise.all([
      AsyncStorage.removeItem(KEY_USER),
      AsyncStorage.removeItem(KEY_ADDRESSES),
      AsyncStorage.removeItem(KEY_ORDERS),
    ]).catch(() => {});
  }, []);

  const addAddress = useCallback(async (fields: Omit<DeliveryAddress, 'id'>) => {
    const next: DeliveryAddress = { ...fields, id: genId('addr') };
    setAddresses((prev) => [...prev, next]);
  }, []);

  const updateAddress = useCallback(async (id: string, fields: Omit<DeliveryAddress, 'id'>) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...fields, id: a.id } : a)),
    );
  }, []);

  const deleteAddress = useCallback(async (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      user,
      addresses,
      orders,
      signIn,
      signOut,
      addAddress,
      updateAddress,
      deleteAddress,
    }),
    [isReady, user, addresses, orders, signIn, signOut, addAddress, updateAddress, deleteAddress],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount(): AccountContextValue {
  const ctx = useContext(AccountContext);
  if (!ctx) {
    throw new Error('useAccount must be used within AccountProvider');
  }
  return ctx;
}
