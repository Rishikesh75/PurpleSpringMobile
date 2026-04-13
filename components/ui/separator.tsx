import { StyleSheet, View, type ViewProps } from 'react-native';

import { useSemanticColor } from '@/hooks/use-semantic-color';

export type SeparatorProps = ViewProps & {
  orientation?: 'horizontal' | 'vertical';
};

export function Separator({ orientation = 'horizontal', style, ...props }: SeparatorProps) {
  const border = useSemanticColor('border');
  const isH = orientation === 'horizontal';
  return (
    <View
      style={[
        {
          backgroundColor: border,
          flexShrink: 0,
        },
        isH ? { height: StyleSheet.hairlineWidth, width: '100%' } : { width: StyleSheet.hairlineWidth, flex: 1 },
        style,
      ]}
      {...props}
    />
  );
}
