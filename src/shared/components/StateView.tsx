import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {icons} from '../../assets/icons';
import {colors, radius, spacing, typography} from '../theme';

type Props = {
  status: 'loading' | 'error';
  message?: string | null;
  onRetry?: () => void;
};

/** Hiển thị trạng thái đang tải hoặc lỗi (kèm nút thử lại). */
export default function StateView({status, message, onRetry}: Props) {
  if (status === 'loading') {
    return (
      <View style={styles.box}>
        <ActivityIndicator color={colors.primaryLight} />
      </View>
    );
  }
  return (
    <View style={styles.box}>
      <Ionicons name={icons.error} size={32} color={colors.danger} />
      <Text style={styles.message}>{message ?? 'Đã có lỗi xảy ra'}</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} style={styles.retry} accessibilityRole="button">
          <Text style={styles.retryText}>Thử lại</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {alignItems: 'center', justifyContent: 'center', padding: spacing.xxl},
  message: {...typography.body, color: colors.textSecondary, marginTop: spacing.sm},
  retry: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
  },
  retryText: {...typography.body, color: colors.textOnPrimary, fontWeight: '600'},
});
