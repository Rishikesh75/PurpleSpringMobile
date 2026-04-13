import React from 'react';
import { View, Text } from 'react-native';
import ProductList from '../components/ProductList';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Welcome to PurpleSprings!</Text>
      <ProductList />
    </View>
  );
}
