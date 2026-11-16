/**
 * Cấu hình của mini app. Đổi `useMock` thành false khi đã có backend.
 * Mọi nơi cần URL hay cờ môi trường đều đọc từ đây, không gõ trực tiếp trong code.
 */
export const config = {
  apiBaseUrl: 'https://api.electrogo.example/work',
  timeoutMs: 10000,
  useMock: true,
};
