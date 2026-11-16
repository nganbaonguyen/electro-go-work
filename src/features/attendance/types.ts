export type AttendanceRecord = {
  id: string;
  date: string; // dd/MM/yyyy
  checkIn: string; // HH:mm
  checkOut?: string; // HH:mm, rỗng nếu chưa chấm công ra
};

export type CheckType = 'in' | 'out';
