import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import StateView from '../../../shared/components/StateView';
import {colors, spacing, typography} from '../../../shared/theme';
import CheckInButton from '../components/CheckInButton';
import HistoryList from '../components/HistoryList';
import {useCheckIn} from '../hooks/useCheckIn';
import {useHistory} from '../hooks/useHistory';
import {formatClock, formatDate, formatTime, useNow} from '../hooks/useNow';

type Props = {onOpenHistory: () => void};

export default function AttendanceScreen({onOpenHistory}: Props) {
  const now = useNow();
  const {checkedInAt, submitting, toggle} = useCheckIn();
  const history = useHistory(3);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.clockBox}>
        <Text style={styles.clock}>{formatClock(now)}</Text>
        <Text style={styles.date}>{formatDate(now)}</Text>
      </View>

      <View style={styles.buttonBox}>
        <CheckInButton
          checkedIn={checkedInAt !== null}
          disabled={submitting}
          onPress={toggle}
        />
        <Text style={styles.status}>
          {checkedInAt
            ? `Đã vào ca lúc ${formatTime(checkedInAt)}`
            : 'Bạn chưa chấm công hôm nay'}
        </Text>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Lịch sử gần đây</Text>
        <Pressable onPress={onOpenHistory} hitSlop={8} accessibilityRole="button">
          <Text style={styles.link}>Xem tất cả</Text>
        </Pressable>
      </View>

      {history.status === 'ready' && history.data ? (
        <HistoryList records={history.data} />
      ) : (
        <StateView
          status={history.status === 'error' ? 'error' : 'loading'}
          message={history.error}
          onRetry={history.reload}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: spacing.xl},
  clockBox: {alignItems: 'center', marginTop: spacing.lg},
  clock: {fontSize: 44, fontWeight: '700', color: colors.primary},
  date: {...typography.body, color: colors.textSecondary, marginTop: spacing.xs},
  buttonBox: {alignItems: 'center', marginVertical: spacing.xxl},
  status: {...typography.body, color: colors.textSecondary, marginTop: spacing.lg},
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  section: {...typography.title, color: colors.textPrimary},
  link: {...typography.body, color: colors.primaryLight, fontWeight: '600'},
});
