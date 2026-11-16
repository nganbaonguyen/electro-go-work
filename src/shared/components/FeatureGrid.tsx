import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {IconName} from '../../assets/icons';
import {colors, radius, spacing, typography} from '../theme';

export type FeatureItem<K extends string = string> = {
  key: K;
  label: string;
  icon: IconName;
};

const COLUMNS = 4;

type Props<K extends string> = {
  items: FeatureItem<K>[];
  onPress: (key: K) => void;
};

/** Lưới icon chức năng 4 cột (cùng ngôn ngữ thiết kế với Home của host). */
export default function FeatureGrid<K extends string>({items, onPress}: Props<K>) {
  const padding = (COLUMNS - (items.length % COLUMNS)) % COLUMNS;
  return (
    <View style={styles.grid}>
      {items.map(item => (
        <View key={item.key} style={styles.cell}>
          <Pressable
            onPress={() => onPress(item.key)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            style={({pressed}) => [styles.tile, pressed && styles.pressed]}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={28} color={colors.primaryLight} />
            </View>
            <Text style={styles.label} numberOfLines={2}>
              {item.label}
            </Text>
          </Pressable>
        </View>
      ))}
      {Array.from({length: padding}).map((_, i) => (
        <View key={`pad-${i}`} style={styles.cell} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -spacing.xs},
  cell: {width: '25%', paddingHorizontal: spacing.xs, paddingVertical: spacing.sm},
  tile: {alignItems: 'center'},
  pressed: {transform: [{scale: 0.95}], opacity: 0.8},
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.iconTile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.caption,
    marginTop: spacing.sm,
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
