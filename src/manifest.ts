/**
 * Hồ sơ của mini app: host dùng để biết tên, icon, phiên bản.
 * Khi host chuyển sang tự đọc danh sách mini app, chỉ cần đọc manifest này.
 */
export const manifest = {
  id: 'work',
  name: 'Chấm công',
  icon: 'time-outline',
  version: '0.1.0',
} as const;
