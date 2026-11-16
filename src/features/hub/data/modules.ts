import {FeatureItem} from '../../../shared/components/FeatureGrid';
import {ModuleKey} from '../types';

/** Danh sách chức năng hiển thị trên màn hình trung tâm, theo đúng thứ tự. */
export const MODULES: FeatureItem<ModuleKey>[] = [
  {key: 'attendance', label: 'Chấm công', icon: 'finger-print-outline'},
  {key: 'schedule', label: 'Lịch làm việc', icon: 'calendar-outline'},
  {key: 'leave', label: 'Nghỉ phép', icon: 'umbrella-outline'},
  {key: 'payslip', label: 'Phiếu lương', icon: 'cash-outline'},
];
