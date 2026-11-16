import {AttendanceRecord} from '../types';

/** Dữ liệu mẫu, chỉ dùng khi config.useMock = true. */
export const MOCK_HISTORY: AttendanceRecord[] = [
  {id: '1', date: '15/11/2026', checkIn: '08:02', checkOut: '17:31'},
  {id: '2', date: '14/11/2026', checkIn: '07:58', checkOut: '17:45'},
  {id: '3', date: '13/11/2026', checkIn: '08:10', checkOut: '17:30'},
  {id: '4', date: '12/11/2026', checkIn: '08:00', checkOut: '17:35'},
  {id: '5', date: '11/11/2026', checkIn: '08:05', checkOut: '17:28'},
  {id: '6', date: '10/11/2026', checkIn: '07:55', checkOut: '17:40'},
];
