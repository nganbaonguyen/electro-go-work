import {Payslip} from './types';

export const netSalary = (p: Payslip): number =>
  p.base + p.allowance + p.bonus - p.insurance - p.tax;
