import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { CartLine, Product } from '@/types';

const STORAGE_KEY = '@purplespring/cart';

type CartContextValue = {
  lines: CartLine[];
  isReady: boolean;
  itemCount: number;
  subtotalCents: number;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function sumSubtotal(lines: CartLine[]): number {
  return lines.reduce((acc, line) => acc + line.product.priceCents * line.quantity, 0);
}

function sumCount(lines: CartLine[]): number {
  return lines.reduce((acc, line) => acc + line.quantity, 0);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (cancelled) return;
        if (raw) {
          const parsed = JSON.parse(raw) as CartLine[];
          if (Array.isArray(parsed)) setLines(parsed);
        }
      } catch {
        /* ignore corrupt storage */
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lines)).catch(() => {});
  }, [lines, isReady]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const q = Math.max(1, Math.floor(quantity));
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.product.id === product.id);
      if (idx === -1) return [...prev, { product, quantity: q }];
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + q };
      return next;
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.floor(quantity);
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.product.id !== productId));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.product.id === productId ? { ...l, quantity: q } : l)),
    );
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(() => sumCount(lines), [lines]);
  const subtotalCents = useMemo(() => sumSubtotal(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      isReady,
      itemCount,
      subtotalCents,
      addItem,
      setQuantity,
      removeLine,
      clear,
    }),
    [lines, isReady, itemCount, subtotalCents, addItem, setQuantity, removeLine, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
