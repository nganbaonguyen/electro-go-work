/**
 * Thông tin bản bundle, do rspack.config.mjs chèn lúc đóng gói (__BUILD_INFO__):
 *   - version: phiên bản trong package.json (cùng biến VERSION của scripts/build-bundle.sh)
 *   - number:  số lần chạy `pnpm build`, tăng thêm 1 mỗi lần (scripts/build-bundle.sh), dùng để biết app đã nạp
 *              đúng gói tar vừa upload chưa dù version không đổi
 * Chạy dev (pnpm start:module) không tăng số: hiện số của lần build gần nhất.
 */
declare const __BUILD_INFO__: {version: string; number: number; builtAt: string} | undefined;

export type BuildInfo = {version: string; number: number; builtAt: string};

export function getBuildInfo(): BuildInfo {
  if (typeof __BUILD_INFO__ === 'undefined' || !__BUILD_INFO__) {
    return {version: '', number: 0, builtAt: ''};
  }
  return __BUILD_INFO__;
}
