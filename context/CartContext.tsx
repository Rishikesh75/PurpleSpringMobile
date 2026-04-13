import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

type CartContextType = {
  cart: any[];
  setCart: Dispatch<SetStateAction<any[]>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
