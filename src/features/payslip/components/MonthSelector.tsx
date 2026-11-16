import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {colors, spacing, typography} from '../../../shared/theme';

type Props = {
  label: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

/** Chọn tháng: mũi tên trái = tháng trước, phải = tháng sau. */
export default function MonthSelector({label, canPrev, canNext, onPrev, onNext}: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onPrev} disabled={!canPrev} hitSlop={10} accessibilityLabel="Tháng trước">
        <Ionicons name="chevron-back" size={22} color={canPrev ? colors.textPrimary : colors.divider} />
      </Pressable>
      <Text style={styles.label}>Tháng {label}</Text>
      <Pressable onPress={onNext} disabled={!canNext} hitSlop={10} accessibilityLabel="Tháng sau">
        <Ionicons name="chevron-forward" size={22} color={canNext ? colors.textPrimary : colors.divider} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg},
  label: {...typography.title, color: colors.textPrimary},
});
