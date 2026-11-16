export type Payslip = {
  month: string; // MM/YYYY
  base: number; // lương cơ bản
  allowance: number; // phụ cấp
  bonus: number; // thưởng
  insurance: number; // bảo hiểm (trừ)
  tax: number; // thuế TNCN (trừ)
};
