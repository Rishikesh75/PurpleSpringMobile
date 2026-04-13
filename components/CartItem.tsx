import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CartItemProps {
  name: string;
  price: string;
  quantity: number;
}

export default function CartItem({ name, price, quantity }: CartItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.quantity}>x{quantity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: { fontWeight: 'bold' },
  price: { color: '#6c63ff' },
  quantity: { color: '#888' },
});
