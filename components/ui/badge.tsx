import React from 'react';
import { Text, View, type TextProps } from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  textProps?: TextProps;
};

export function Badge({ children, variant = 'default', textProps }: BadgeProps) {
  const c = useSemanticPalette();

  let bg = c.primary;
  let fg = c.primaryForeground;
  let borderW = 0;
  let borderC = 'transparent';

  if (variant === 'secondary') {
    bg = c.secondary;
    fg = c.secondaryForeground;
  } else if (variant === 'outline') {
    bg = 'transparent';
    fg = c.foreground;
    borderW = 1;
    borderC = c.border;
  } else if (variant === 'destructive') {
    bg = c.destructive;
    fg = c.destructiveForeground;
  }

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        borderRadius: radius.sm,
        backgroundColor: bg,
        borderWidth: borderW,
        borderColor: borderC,
      }}>
      <Text style={[{ fontSize: 12, fontWeight: '600', color: fg }]} {...textProps}>
        {children}
      </Text>
    </View>
  );
}
