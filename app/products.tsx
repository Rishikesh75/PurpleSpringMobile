import React from 'react';
import { View, Text } from 'react-native';
import ProductList from '../components/ProductList';

export default function ProductsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>All Products</Text>
      <ProductList />
    </View>
  );
}
