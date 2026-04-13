import { SAFFRON_PRODUCTS } from '@/constants/products';
import type { Product } from '@/types';

export async function fetchProducts(): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 200));
  return SAFFRON_PRODUCTS;
}
