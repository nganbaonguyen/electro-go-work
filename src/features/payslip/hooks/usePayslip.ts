import {useAsync} from '../../../shared/hooks/useAsync';
import {fetchPayslip} from '../services/payslipService';

export function usePayslip(monthsAgo: number) {
  return useAsync(() => fetchPayslip(monthsAgo), [monthsAgo]);
}
