import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Chip, {ChipTone} from '../../../shared/components/Chip';
import {colors, radius, spacing, typography} from '../../../shared/theme';
import {LeaveRequest, LeaveStatus} from '../types';

const STATUS: Record<LeaveStatus, {label: string; tone: ChipTone}> = {
  approved: {label: 'Đã duyệt', tone: 'success'},
  pending: {label: 'Chờ duyệt', tone: 'warning'},
  rejected: {label: 'Từ chối', tone: 'danger'},
};

type Props = {request: LeaveRequest};

export default function RequestItem({request}: Props) {
  const {label, tone} = STATUS[request.status];
  const range = request.from === request.to ? request.from : `${request.from} - ${request.to}`;
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.type}>{request.type}</Text>
        <Text style={styles.meta}>
          {range}  ·  {request.days} ngày
        </Text>
      </View>
      <Chip label={label} tone={tone} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  left: {flex: 1},
  type: {...typography.body, color: colors.textPrimary, fontWeight: '700'},
  meta: {...typography.caption, color: colors.textSecondary, marginTop: 2},
});
