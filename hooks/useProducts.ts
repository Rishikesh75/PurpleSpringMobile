import { useState, useEffect } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products from API
    setProducts([]);
  }, []);
  return { products };
}
