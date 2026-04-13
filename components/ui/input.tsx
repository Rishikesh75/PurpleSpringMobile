import React, { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useSemanticPalette } from '@/hooks/use-semantic-color';

export type InputProps = TextInputProps;

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { style, placeholderTextColor, ...props },
  ref,
) {
  const c = useSemanticPalette();
  return (
    <TextInput
      ref={ref}
      placeholderTextColor={placeholderTextColor ?? c.mutedForeground}
      style={[
        {
          borderWidth: 1,
          borderColor: c.input,
          borderRadius: radius.md,
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
          fontSize: 16,
          color: c.foreground,
          backgroundColor: c.background,
        },
        style,
      ]}
      {...props}
    />
  );
});
