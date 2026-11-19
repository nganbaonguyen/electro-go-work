import type {ComponentProps} from 'react';
import type {Ionicons} from '@react-native-vector-icons/ionicons/static';

/** Tên icon hợp lệ của Ionicons (có gợi ý và kiểm tra khi gõ). */
export type IconName = ComponentProps<typeof Ionicons>['name'];

/** Tên icon (Ionicons) dùng trong mini app, gom một chỗ để dễ đổi và tra cứu. */
export const icons = {
  back: 'chevron-back',
  fingerprint: 'finger-print',
  add: 'add-circle-outline',
  next: 'chevron-forward',
  error: 'alert-circle-outline',
  bundle: 'cube-outline',
} as const;
