import React from 'react';
import { View, FlatList } from 'react-native';
import ProductCard from './ProductCard';

const products = [
  { id: '1', name: 'Purple T-shirt', price: '$20', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Springs Mug', price: '$12', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Eco Tote Bag', price: '$15', image: 'https://via.placeholder.com/100' },
];

export default function ProductList() {
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            image={item.image}
            onPress={() => {}}
          />
        )}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
}
