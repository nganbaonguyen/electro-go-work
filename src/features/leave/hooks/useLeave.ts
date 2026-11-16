import {useAsync} from '../../../shared/hooks/useAsync';
import {fetchLeave} from '../services/leaveService';

export function useLeave() {
  return useAsync(fetchLeave, []);
}
