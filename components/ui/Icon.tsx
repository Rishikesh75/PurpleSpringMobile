import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 24, color = '#6c63ff' }: IconProps) {
  // Use different icon names for iOS/Android if needed
  const iconName = Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`;
  return <Ionicons name={iconName as any} size={size} color={color} />;
}
