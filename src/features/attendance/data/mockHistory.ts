import {AttendanceRecord} from '../types';

/** Dữ liệu mẫu. Thay bằng dữ liệu từ API khi có backend. */
export const MOCK_HISTORY: AttendanceRecord[] = [
  {id: '1', date: '15/11/2026', checkIn: '08:02', checkOut: '17:31'},
  {id: '2', date: '14/11/2026', checkIn: '07:58', checkOut: '17:45'},
  {id: '3', date: '13/11/2026', checkIn: '08:10', checkOut: '17:30'},
];
