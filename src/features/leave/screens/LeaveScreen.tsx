import React from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {icons} from '../../../assets/icons';
import StateView from '../../../shared/components/StateView';
import {colors, radius, spacing, typography} from '../../../shared/theme';
import BalanceCard from '../components/BalanceCard';
import RequestItem from '../components/RequestItem';
import {useLeave} from '../hooks/useLeave';

export default function LeaveScreen() {
  const leave = useLeave();

  if (leave.status !== 'ready' || !leave.data) {
    return (
      <StateView
        status={leave.status === 'error' ? 'error' : 'loading'}
        message={leave.error}
        onRetry={leave.reload}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <BalanceCard total={leave.data.total} used={leave.data.used} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Tạo đơn xin nghỉ"
        onPress={() => Alert.alert('Xin nghỉ phép', 'Tính năng đang được phát triển')}
        style={({pressed}) => [styles.button, pressed && styles.pressed]}>
        <Ionicons name={icons.add} size={22} color={colors.textOnPrimary} />
        <Text style={styles.buttonText}>Tạo đơn xin nghỉ</Text>
      </Pressable>

      <Text style={styles.section}>Đơn gần đây</Text>
      {leave.data.requests.map(r => (
        <RequestItem key={r.id} request={r} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: spacing.xl},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xl,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
  },
  pressed: {opacity: 0.85},
  buttonText: {...typography.body, color: colors.textOnPrimary, fontWeight: '700'},
  section: {...typography.title, color: colors.textPrimary, marginBottom: spacing.md},
});
