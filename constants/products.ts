import type { Product } from '@/types';

export const SAFFRON_PRODUCTS: Product[] = [
  {
    id: 'ps-kashmiri-5g',
    name: 'Kashmiri Mongra',
    shortDescription: 'Deep red threads, intense aroma.',
    description:
      'Hand-harvested Kashmiri saffron with long, thick threads and a sweet-hay aroma. Ideal for biryanis, desserts, and milk-based drinks.',
    priceCents: 4499,
    weightLabel: '5 g',
    origin: 'Kashmir, India',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd38af?w=800&q=80',
  },
  {
    id: 'ps-spanish-2g',
    name: 'Spanish Coupé',
    shortDescription: 'Balanced color and flavor.',
    description:
      'Coupé-grade Spanish saffron with consistent coloring power and a mellow, earthy profile. Great for paella and everyday cooking.',
    priceCents: 1899,
    weightLabel: '2 g',
    origin: 'La Mancha, Spain',
    image:
      'https://images.unsplash.com/photo-1615485925600-349374bb0443?w=800&q=80',
  },
  {
    id: 'ps-persian-10g',
    name: 'Persian Super Negin',
    shortDescription: 'Long-cut premium strands.',
    description:
      'Super Negin cut with minimal yellow style. Rich floral notes and deep golden hue—preferred by chefs for premium presentation.',
    priceCents: 8999,
    weightLabel: '10 g',
    origin: 'Khorasan, Iran',
    image:
      'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80',
  },
  {
    id: 'ps-gift-sampler',
    name: 'Purple Spring Sampler',
    shortDescription: 'Three origins in one gift box.',
    description:
      'A curated trio of small jars showcasing Kashmir, Spain, and Persia. Perfect as a gift or to find your favorite profile.',
    priceCents: 5999,
    weightLabel: 'Gift set',
    origin: 'Mixed',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
];

export function getProductById(id: string): Product | undefined {
  return SAFFRON_PRODUCTS.find((p) => p.id === id);
}
