import { Text, View, StyleSheet } from 'react-native';

import { useSemanticPalette } from '@/hooks/use-semantic-color';

/** Optional chrome header — uses semantic primary surface (not used on main tabs). */
export default function Header() {
  const c = useSemanticPalette();
  return (
    <View style={[styles.header, { backgroundColor: c.primary }]}>
      <Text style={[styles.title, { color: c.primaryForeground }]}>Purple Spring</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
