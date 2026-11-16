import {config} from '../../../config/env';
import {http} from '../../../services/api/httpClient';
import {delay} from '../../../shared/utils/delay';
import {MOCK_SHIFTS} from '../data/mockShifts';
import {ScheduleDay} from '../types';

const WEEKDAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

/** Lịch làm việc 7 ngày của tuần hiện tại (bắt đầu từ thứ hai). */
export async function fetchWeekSchedule(): Promise<ScheduleDay[]> {
  if (!config.useMock) {
    return http.get<ScheduleDay[]>('/schedule/week');
  }
  const now = new Date();
  const mondayOffset = (now.getDay() + 6) % 7; // chủ nhật = 0 -> lùi 6 ngày
  const days: ScheduleDay[] = Array.from({length: 7}, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset + i);
    return {
      date,
      weekday: WEEKDAY_LABELS[i],
      isToday: i === mondayOffset,
      shifts: MOCK_SHIFTS[i] ?? [],
    };
  });
  return delay(days);
}
