import React from 'react';
import {
  Pressable,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'default' | 'sm' | 'lg';

export type ButtonProps = Omit<PressableProps, 'children'> & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  children,
  variant = 'default',
  size = 'default',
  style,
  textStyle,
  disabled,
  ...rest
}: ButtonProps) {
  const c = useSemanticPalette();

  const paddingV = size === 'sm' ? spacing[2] : size === 'lg' ? spacing[4] : spacing[3];
  const paddingH = size === 'sm' ? spacing[3] : spacing[5];
  const fontSize = size === 'sm' ? 15 : size === 'lg' ? 18 : 17;

  let container: ViewStyle = {
    paddingVertical: paddingV,
    paddingHorizontal: paddingH,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  let labelColor = c.primaryForeground;

  if (variant === 'default') {
    container = { ...container, backgroundColor: c.primary };
  } else if (variant === 'destructive') {
    container = { ...container, backgroundColor: c.destructive };
    labelColor = c.destructiveForeground;
  } else if (variant === 'outline') {
    container = {
      ...container,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: c.border,
    };
    labelColor = c.foreground;
  } else {
    container = { ...container, backgroundColor: 'transparent' };
    labelColor = c.foreground;
  }

  const label: TextStyle = {
    fontSize,
    fontWeight: '600',
    color: labelColor,
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        container,
        state.pressed && variant !== 'ghost' && { opacity: 0.88 },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[label, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
