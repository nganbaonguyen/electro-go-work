import {config} from '../../../config/env';
import {http} from '../../../services/api/httpClient';
import {delay} from '../../../shared/utils/delay';
import {MOCK_HISTORY} from '../data/mockHistory';
import {AttendanceRecord, CheckType} from '../types';

/**
 * Tầng service: nơi duy nhất của feature biết dữ liệu đến từ đâu (mock hay API).
 * Màn hình và hook chỉ gọi các hàm này, không gọi http trực tiếp.
 */
export async function fetchHistory(limit?: number): Promise<AttendanceRecord[]> {
  const all = config.useMock
    ? await delay(MOCK_HISTORY)
    : await http.get<AttendanceRecord[]>('/attendance/history');
  return limit ? all.slice(0, limit) : all;
}

export async function submitCheck(type: CheckType): Promise<void> {
  if (config.useMock) {
    await delay(undefined, 300);
    return;
  }
  await http.post('/attendance/check', {type});
}
