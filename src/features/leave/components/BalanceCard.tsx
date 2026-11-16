import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../../../shared/theme';

type Props = {total: number; used: number};

/** Thẻ số ngày phép còn lại kèm thanh tiến độ đã dùng. */
export default function BalanceCard({total, used}: Props) {
  const remaining = total - used;
  const percent = Math.min(100, Math.round((used / total) * 100));
  return (
    <View style={styles.card}>
      <Text style={styles.caption}>Ngày phép còn lại</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{remaining}</Text>
        <Text style={styles.unit}> / {total} ngày</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, {width: `${percent}%`}]} />
      </View>
      <Text style={styles.caption}>Đã dùng {used} ngày ({percent}%)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.xl},
  caption: {...typography.body, color: 'rgba(255,255,255,0.78)'},
  valueRow: {flexDirection: 'row', alignItems: 'flex-end', marginVertical: spacing.sm},
  value: {fontSize: 44, lineHeight: 50, fontWeight: '700', color: colors.textOnPrimary},
  unit: {...typography.title, color: 'rgba(255,255,255,0.78)', marginBottom: 6},
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  fill: {height: 8, borderRadius: 4, backgroundColor: colors.accent},
});
