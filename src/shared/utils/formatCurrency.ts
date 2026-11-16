/** 15990000 -> "15.990.000 ₫" */
export function formatCurrency(value: number): string {
  return `${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫`;
}
