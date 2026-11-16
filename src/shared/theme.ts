/**
 * Design tokens của mini app. Giá trị trùng với theme của host (ElectroGo/src/shared/theme)
 * để giao diện đồng nhất. Mini app là repo riêng nên không import trực tiếp từ host.
 * Khi có package `shared` chung thì thay file này bằng import từ đó.
 */
export const colors = {
  primary: '#0B3AA8',
  primaryLight: '#1D5FE8',
  accent: '#FF9A1F',
  success: '#16A34A',
  danger: '#DC2626',
  background: '#F4F6FB',
  surface: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textOnPrimary: '#FFFFFF',
  divider: '#E5E7EB',
};

export const spacing = {xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28};

export const radius = {md: 14, lg: 20, pill: 999};

export const typography = {
  caption: {fontSize: 12, lineHeight: 16},
  body: {fontSize: 14, lineHeight: 20},
  title: {fontSize: 18, lineHeight: 24, fontWeight: '700' as const},
  headline: {fontSize: 22, lineHeight: 28, fontWeight: '700' as const},
};
