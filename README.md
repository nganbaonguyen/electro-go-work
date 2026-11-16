# electro-go-work

Mini app **Chấm công** (`@electrogo/work`) của super app ElectroGo. Repo này chỉ chứa code JS/TS; host gắn vào `packages/` bằng git submodule. Thư viện native (react, react-native, vector-icons) do host cài, ở đây chỉ khai báo `peerDependencies`.

## Cấu trúc

```
src/
├── index.tsx                  export default component gốc + manifest (host chỉ import từ đây)
├── manifest.ts                hồ sơ mini app: id, tên, icon, phiên bản
├── app/
│   ├── WorkApp.tsx              component gốc: ErrorBoundary + điều hướng
│   └── navigation/MiniNavigator.tsx   ngăn xếp màn hình nội bộ (Route, TITLES)
├── features/attendance/           một feature, tự chứa:
│   ├── screens/               màn hình
│   ├── components/            component riêng của feature
│   ├── hooks/                 logic trạng thái (gọi service, không gọi http trực tiếp)
│   ├── services/              tầng dữ liệu: mock hoặc API (chuyển bằng config.useMock)
│   ├── data/                  dữ liệu mẫu
│   ├── types.ts
│   └── index.ts               cổng xuất khẩu công khai của feature
├── services/api/              HTTP client dùng chung (timeout, ApiError)
├── config/env.ts              apiBaseUrl, timeoutMs, useMock
├── assets/                    images/ (khai báo trong images/index.ts) và icons.ts
└── shared/                    theme, components, hooks (useAsync), navigation (useStack), utils
```

## Quy ước

- Luồng dữ liệu một chiều: **screen -> hook -> service -> (mock | http)**. Màn hình không gọi `http` trực tiếp.
- Feature chỉ import feature khác qua `index.ts`; code dùng từ hai feature trở lên chuyển vào `shared/`.
- Không gõ màu/số trong component, lấy từ `shared/theme.ts`. Ảnh lấy từ `assets/images`, tên icon lấy từ `assets/icons.ts`.
- Có backend thật thì đổi `useMock` thành `false` trong `config/env.ts` và sửa `apiBaseUrl`.
- Thêm màn hình: thêm vào `Route` và `TITLES` trong `MiniNavigator.tsx`.
