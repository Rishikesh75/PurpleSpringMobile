import { useState } from 'react';

export default function useCart() {
  const [cart, setCart] = useState([]);
  // Add cart logic here
  return { cart, setCart };
}
