import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../../shared/theme';
import CheckInButton from '../components/CheckInButton';
import HistoryList from '../components/HistoryList';
import {MOCK_HISTORY} from '../data/mockHistory';
import {formatClock, formatDate, formatTime, useNow} from '../hooks/useNow';

export default function AttendanceScreen() {
  const now = useNow();
  const [checkedInAt, setCheckedInAt] = useState<Date | null>(null);

  const onToggle = () => setCheckedInAt(prev => (prev ? null : new Date()));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Chấm công</Text>

      <View style={styles.clockBox}>
        <Text style={styles.clock}>{formatClock(now)}</Text>
        <Text style={styles.date}>{formatDate(now)}</Text>
      </View>

      <View style={styles.buttonBox}>
        <CheckInButton checkedIn={checkedInAt !== null} onPress={onToggle} />
        <Text style={styles.status}>
          {checkedInAt
            ? `Đã vào ca lúc ${formatTime(checkedInAt)}`
            : 'Bạn chưa chấm công hôm nay'}
        </Text>
      </View>

      <Text style={styles.section}>Lịch sử gần đây</Text>
      <HistoryList records={MOCK_HISTORY} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: spacing.xl},
  title: {...typography.headline, color: colors.textPrimary},
  clockBox: {alignItems: 'center', marginTop: spacing.xxl},
  clock: {fontSize: 44, fontWeight: '700', color: colors.primary},
  date: {...typography.body, color: colors.textSecondary, marginTop: spacing.xs},
  buttonBox: {alignItems: 'center', marginVertical: spacing.xxl},
  status: {...typography.body, color: colors.textSecondary, marginTop: spacing.lg},
  section: {...typography.title, color: colors.textPrimary, marginBottom: spacing.md},
});
