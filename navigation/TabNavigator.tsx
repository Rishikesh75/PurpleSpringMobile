import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../app/home';
import ProductsScreen from '../app/products';
import CartScreen from '../app/cart';
import ProfileScreen from '../app/profile';
import Icon from '../components/ui/Icon';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="home" /> }} />
      <Tab.Screen name="Explore" component={ProductsScreen} options={{ tabBarIcon: () => <Icon name="search" /> }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarIcon: () => <Icon name="cart" /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Icon name="person" /> }} />
    </Tab.Navigator>
  );
}
