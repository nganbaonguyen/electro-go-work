import {config} from '../../../config/env';
import {http} from '../../../services/api/httpClient';
import {delay} from '../../../shared/utils/delay';
import {MOCK_PAYSLIPS} from '../data/mockPayslips';
import {Payslip} from '../types';

export const PAYSLIP_MONTHS = MOCK_PAYSLIPS.length;

const pad = (n: number) => String(n).padStart(2, '0');

/** Phiếu lương của tháng cách hiện tại `monthsAgo` tháng (0 = tháng này). */
export async function fetchPayslip(monthsAgo: number): Promise<Payslip> {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  const month = `${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  if (!config.useMock) {
    return http.get<Payslip>(`/payslip?month=${month}`);
  }
  return delay({month, ...MOCK_PAYSLIPS[monthsAgo]});
}
