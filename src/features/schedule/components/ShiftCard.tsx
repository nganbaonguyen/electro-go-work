import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {IconName} from '../../../assets/icons';
import {colors, radius, spacing, typography} from '../../../shared/theme';
import {Shift, ShiftType} from '../types';

const STYLE: Record<ShiftType, {color: string; icon: IconName}> = {
  morning: {color: colors.accent, icon: 'sunny-outline'},
  afternoon: {color: colors.primaryLight, icon: 'time-outline'},
  night: {color: colors.primary, icon: 'moon-outline'},
};

type Props = {shift: Shift};

export default function ShiftCard({shift}: Props) {
  const {color, icon} = STYLE[shift.type];
  return (
    <View style={styles.card}>
      <View style={[styles.bar, {backgroundColor: color}]} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Ionicons name={icon} size={18} color={color} />
          <Text style={styles.title}>{shift.title}</Text>
        </View>
        <Text style={styles.time}>
          {shift.start} - {shift.end}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.location}>{shift.location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  bar: {width: 6},
  body: {flex: 1, padding: spacing.lg},
  titleRow: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm},
  title: {...typography.body, color: colors.textSecondary, fontWeight: '600'},
  time: {fontSize: 26, fontWeight: '700', color: colors.textPrimary, marginVertical: spacing.xs},
  locationRow: {flexDirection: 'row', alignItems: 'center', gap: spacing.xs},
  location: {...typography.caption, color: colors.textSecondary},
});
