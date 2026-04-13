import type { Order } from '@/types/account';

/** Shown after sign-in when there are no saved orders yet (demo / offline-first). */
export const DEMO_ORDERS: Order[] = [
  {
    id: 'PS-10421',
    placedAt: '2026-03-28T10:15:00.000Z',
    totalLabel: '$48.00',
    status: 'delivered',
    itemsSummary: '2× Kashmiri Saffron 1g',
  },
  {
    id: 'PS-10489',
    placedAt: '2026-04-10T14:22:00.000Z',
    totalLabel: '$32.00',
    status: 'processing',
    itemsSummary: '1× Spanish Coupe 1g',
  },
  {
    id: 'PS-10490',
    placedAt: '2026-04-08T09:00:00.000Z',
    totalLabel: '$64.00',
    status: 'shipped',
    itemsSummary: '2× Persian Premium 1g',
  },
];
