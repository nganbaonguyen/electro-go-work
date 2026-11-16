import {Payslip} from '../types';

/** Phiếu lương mẫu của 3 tháng gần nhất (0 = tháng hiện tại). */
export const MOCK_PAYSLIPS: Omit<Payslip, 'month'>[] = [
  {base: 12000000, allowance: 1500000, bonus: 2000000, insurance: 1260000, tax: 350000},
  {base: 12000000, allowance: 1500000, bonus: 1200000, insurance: 1260000, tax: 210000},
  {base: 12000000, allowance: 1500000, bonus: 0, insurance: 1260000, tax: 90000},
];
