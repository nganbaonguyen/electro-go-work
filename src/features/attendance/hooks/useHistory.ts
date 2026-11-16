import {useAsync} from '../../../shared/hooks/useAsync';
import {fetchHistory} from '../services/attendanceService';

/** Lịch sử chấm công; truyền limit để chỉ lấy N dòng gần nhất. */
export function useHistory(limit?: number) {
  return useAsync(() => fetchHistory(limit), [limit]);
}
