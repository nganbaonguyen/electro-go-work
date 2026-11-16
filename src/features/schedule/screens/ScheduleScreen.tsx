import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import StateView from '../../../shared/components/StateView';
import {colors, spacing, typography} from '../../../shared/theme';
import ShiftCard from '../components/ShiftCard';
import WeekStrip from '../components/WeekStrip';
import {useWeekSchedule} from '../hooks/useWeekSchedule';

export default function ScheduleScreen() {
  const schedule = useWeekSchedule();
  const [selected, setSelected] = useState(0);

  // Mặc định chọn hôm nay khi dữ liệu về
  useEffect(() => {
    const todayIndex = schedule.data?.findIndex(d => d.isToday) ?? -1;
    if (todayIndex >= 0) {
      setSelected(todayIndex);
    }
  }, [schedule.data]);

  if (schedule.status !== 'ready' || !schedule.data) {
    return (
      <StateView
        status={schedule.status === 'error' ? 'error' : 'loading'}
        message={schedule.error}
        onRetry={schedule.reload}
      />
    );
  }

  const day = schedule.data[selected];
  const totalShifts = schedule.data.reduce((n, d) => n + d.shifts.length, 0);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <WeekStrip days={schedule.data} selected={selected} onSelect={setSelected} />
      <Text style={styles.summary}>Tuần này bạn có {totalShifts} ca làm</Text>

      {day.shifts.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cafe-outline" size={40} color={colors.textSecondary} />
          <Text style={styles.emptyTitle}>Ngày nghỉ</Text>
          <Text style={styles.emptyHint}>Không có ca làm nào trong ngày này</Text>
        </View>
      ) : (
        day.shifts.map(shift => <ShiftCard key={shift.id} shift={shift} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: spacing.xl},
  summary: {...typography.body, color: colors.textSecondary, marginVertical: spacing.lg},
  empty: {alignItems: 'center', paddingVertical: spacing.xxl * 1.5},
  emptyTitle: {...typography.title, color: colors.textPrimary, marginTop: spacing.md},
  emptyHint: {...typography.body, color: colors.textSecondary, marginTop: spacing.xs},
});
