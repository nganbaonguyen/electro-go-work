import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../../../shared/theme';
import {AttendanceRecord} from '../types';

type Props = {records: AttendanceRecord[]};

export default function HistoryList({records}: Props) {
  return (
    <View style={styles.card}>
      {records.map((r, i) => (
        <View key={r.id} style={[styles.row, i > 0 && styles.rowBorder]}>
          <Text style={styles.date}>{r.date}</Text>
          <Text style={styles.time}>
            {r.checkIn} - {r.checkOut ?? '--:--'}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  rowBorder: {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.divider},
  date: {...typography.body, color: colors.textPrimary},
  time: {...typography.body, color: colors.textSecondary, fontWeight: '600'},
});
