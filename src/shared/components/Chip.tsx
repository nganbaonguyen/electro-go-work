import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

export type ChipTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const TONES: Record<ChipTone, {bg: string; fg: string}> = {
  success: {bg: colors.successBg, fg: colors.success},
  warning: {bg: colors.warningBg, fg: colors.warning},
  danger: {bg: colors.dangerBg, fg: colors.danger},
  info: {bg: colors.iconTile, fg: colors.primaryLight},
  neutral: {bg: colors.background, fg: colors.textSecondary},
};

type Props = {label: string; tone?: ChipTone};

/** Nhãn nhỏ bo tròn để hiển thị trạng thái (đã duyệt, còn hàng, hạng khách...). */
export default function Chip({label, tone = 'neutral'}: Props) {
  const {bg, fg} = TONES[tone];
  return (
    <View style={[styles.chip, {backgroundColor: bg}]}>
      <Text style={[styles.text, {color: fg}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
  text: {...typography.caption, fontWeight: '700'},
});
