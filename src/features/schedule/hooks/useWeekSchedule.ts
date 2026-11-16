import {useAsync} from '../../../shared/hooks/useAsync';
import {fetchWeekSchedule} from '../services/scheduleService';

export function useWeekSchedule() {
  return useAsync(fetchWeekSchedule, []);
}
