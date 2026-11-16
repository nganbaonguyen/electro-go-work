export type LeaveStatus = 'approved' | 'pending' | 'rejected';

export type LeaveRequest = {
  id: string;
  type: string; // Phép năm, Nghỉ ốm...
  from: string; // dd/MM
  to: string; // dd/MM
  days: number;
  status: LeaveStatus;
};

export type LeaveSummary = {
  total: number; // tổng ngày phép trong năm
  used: number;
  requests: LeaveRequest[];
};
