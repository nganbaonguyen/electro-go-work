import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../../../shared/theme';
import {ScheduleDay} from '../types';

type Props = {
  days: ScheduleDay[];
  selected: number;
  onSelect: (index: number) => void;
};

/** Dải 7 ngày trong tuần; ngày đang chọn tô xanh, hôm nay có chấm cam. */
export default function WeekStrip({days, selected, onSelect}: Props) {
  return (
    <View style={styles.row}>
      {days.map((d, i) => {
        const active = i === selected;
        return (
          <Pressable
            key={d.weekday}
            onPress={() => onSelect(i)}
            accessibilityRole="button"
            accessibilityLabel={`${d.weekday} ngày ${d.date.getDate()}`}
            style={[styles.pill, active && styles.pillActive]}>
            <Text style={[styles.weekday, active && styles.textActive]}>{d.weekday}</Text>
            <Text style={[styles.date, active && styles.textActive]}>{d.date.getDate()}</Text>
            <View style={[styles.dot, d.isToday && (active ? styles.dotOnActive : styles.dotToday)]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', gap: spacing.xs},
  pill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  pillActive: {backgroundColor: colors.primaryLight},
  weekday: {...typography.caption, color: colors.textSecondary, fontWeight: '600'},
  date: {...typography.title, color: colors.textPrimary, marginTop: 2},
  textActive: {color: colors.textOnPrimary},
  dot: {width: 5, height: 5, borderRadius: 3, marginTop: 4, backgroundColor: 'transparent'},
  dotToday: {backgroundColor: colors.accent},
  dotOnActive: {backgroundColor: colors.textOnPrimary},
});
