export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  weightLabel: string;
  image: string;
  origin: string;
};

export type CartLine = {
  product: Product;
  quantity: number;
};
