import React from 'react';
import { View, type ViewProps } from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export function Card({ style, ...props }: ViewProps) {
  const c = useSemanticPalette();
  return (
    <View
      style={[
        {
          borderRadius: radius.xl,
          borderWidth: 1,
          borderColor: c.border,
          backgroundColor: c.card,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function CardHeader({ style, ...props }: ViewProps) {
  return <View style={[{ padding: spacing[5], gap: spacing[1] }, style]} {...props} />;
}

export function CardContent({ style, ...props }: ViewProps) {
  return <View style={[{ paddingHorizontal: spacing[5], paddingBottom: spacing[5], gap: spacing[2] }, style]} {...props} />;
}

export function CardFooter({ style, ...props }: ViewProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing[5],
          paddingBottom: spacing[5],
        },
        style,
      ]}
      {...props}
    />
  );
}
