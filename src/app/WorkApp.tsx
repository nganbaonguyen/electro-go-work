import React from 'react';
import {AttendanceScreen} from '../features/attendance';

/**
 * Component gốc của mini app Chấm công.
 * Khi cần nhiều màn hình, đặt navigator của mini app ở đây.
 */
export default function WorkApp() {
  return <AttendanceScreen />;
}
