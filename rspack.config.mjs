import fs from 'node:fs';
import path from 'node:path';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';

const __dirname = Repack.getDirname(import.meta.url);

/**
 * Số bản build: scripts/build-bundle.sh tăng số trong .build-info.json (đưa lên git để các máy dùng chung số) mỗi lần `pnpm build`,
 * rồi chèn vào bundle dưới tên __BUILD_INFO__ để màn hình trung tâm hiện "Bản build #N".
 */
function readBuildInfo() {
  // version: lấy từ package.json (cùng biến VERSION trong scripts/build-bundle.sh) để hiện "Phiên bản bundle <version>"
  const {version} = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  try {
    return {...JSON.parse(fs.readFileSync(path.join(__dirname, '.build-info.json'), 'utf8')), version};
  } catch {
    return {number: 0, builtAt: '', version};
  }
}

/**
 * Cấu hình Re.Pack của mini app Chấm công: đóng vai trò REMOTE của Module Federation.
 *   - Expose './App' (component gốc) để host nạp động bằng import('work/App').
 *   - Chạy dev: `pnpm start:module` (cổng 9001); host đọc http://localhost:9001/<platform>/mf-manifest.json
 *   - Thư viện dùng chung (react, react-native, ...) lấy từ host, không đóng gói lại.
 *   - entry `./dev/index.js` chỉ dùng khi chạy riêng (khung Harness), host không chạy file này.
 */
const shared = Object.fromEntries(
  ['react', 'react-native', 'react-native-safe-area-context'].map(name => [
    name,
    // import: false = không đóng gói bản dự phòng, luôn dùng bản của host (nhẹ hơn nhiều)
    {singleton: true, eager: false, requiredVersion: '*', import: false},
  ]),
);

export default Repack.defineRspackConfig(env => {
  const {mode, platform} = env;

  return {
    mode,
    context: __dirname,
    entry: './dev/index.js',
    // enablePackageExports: Module Federation 2 cần đọc trường `exports` của package
    resolve: {...Repack.getResolveOptions({enablePackageExports: true})},
    output: {
      path: path.join(__dirname, 'build/generated', platform),
      uniqueName: 'electrogo-work',
    },
    module: {
      rules: [...Repack.getJsTransformRules(), ...Repack.getAssetTransformRules()],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new rspack.DefinePlugin({__BUILD_INFO__: JSON.stringify(readBuildInfo())}),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'work',
        // Tên file container khác index.bundle (file entry) để không bị trùng
        filename: 'work.container.js.bundle',
        dts: false,
        exposes: {'./App': './src/index.tsx'},
        shared,
      }),
    ],
  };
});
