export type OrderStatus = 'processing' | 'shipped' | 'delivered';

export type Order = {
  id: string;
  placedAt: string;
  totalLabel: string;
  status: OrderStatus;
  itemsSummary: string;
};

export type DeliveryAddress = {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  pincode: string;
};

export type AccountUser = {
  email: string;
  name: string;
};
