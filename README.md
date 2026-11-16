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

## Chức năng (màn hình trung tâm `hub`)

Màn gốc là lưới icon 4 cột; mỗi icon mở một màn hình riêng, mỗi chức năng là một feature trong `src/features/`:

| Icon | Chức năng | Feature | Giao diện |
|---|---|---|---|
| Chấm công | Chấm công vào/ra, lịch sử | `attendance` | Đồng hồ, nút vân tay tròn, danh sách lịch sử |
| Lịch làm việc | Ca làm trong tuần | `schedule` | Dải 7 ngày chọn ngày, thẻ ca có vạch màu theo loại ca |
| Nghỉ phép | Số ngày phép và đơn xin nghỉ | `leave` | Thẻ số dư + thanh tiến độ, đơn kèm nhãn trạng thái |
| Phiếu lương | Lương từng tháng | `payslip` | Chọn tháng, thẻ "Thực nhận", các khoản cộng/trừ |

Thêm chức năng mới: tạo `src/features/<tên>/` (types, data, services, hooks, screens, components, index.ts), thêm khóa vào `ModuleKey` và một dòng vào `MODULES` trong `features/hub`, rồi thêm route, tiêu đề và nhánh render trong `app/navigation/MiniNavigator.tsx`.

## Mở thẳng một chức năng từ host

Component gốc nhận prop `initialRoute` (trùng `ModuleKey` trong `features/hub`). Host truyền prop này khi người dùng bấm một icon chức năng ngay trên Trang chủ, nên mini app mở thẳng màn hình đó; không truyền hoặc không hợp lệ thì mở màn hình trung tâm (hub).

## Quy ước

- Luồng dữ liệu một chiều: **screen -> hook -> service -> (mock | http)**. Màn hình không gọi `http` trực tiếp.
- Feature chỉ import feature khác qua `index.ts`; code dùng từ hai feature trở lên chuyển vào `shared/`.
- Không gõ màu/số trong component, lấy từ `shared/theme.ts`. Ảnh lấy từ `assets/images`, tên icon lấy từ `assets/icons.ts`.
- Có backend thật thì đổi `useMock` thành `false` trong `config/env.ts` và sửa `apiBaseUrl`.
- Thêm màn hình: thêm vào `Route` và `TITLES` trong `MiniNavigator.tsx`.

## Chạy và build (Module Federation / Re.Pack)

Mini app là **remote**: host nạp động lúc người dùng bấm ô trên Home, không nằm sẵn trong bundle của host.

| Việc | Lệnh | Ghi chú |
|---|---|---|
| Chạy dev | `pnpm start:module` | Server Re.Pack cổng 9001; host đọc `http://localhost:9001/<platform>/mf-manifest.json` |
| Build triển khai | `pnpm build` | Ra `build/<tên>-<version>.tar` chứa bundle iOS + Android (container, manifest, chunk, assets) |
| Tar mã nguồn | `pnpm build:src` | Ra `build/<tên>-<version>.tar` chứa `src/` (không phải bundle) |

Dùng cùng host: mở 2 terminal, một ở host chạy `pnpm start:dev`, một ở package này chạy `pnpm start:module`, rồi bấm ô Chấm công trên Home.

Cấu hình nằm ở `rspack.config.mjs`: `exposes: {'./App': './src/index.tsx'}` (cái host nạp), `shared` (react, react-native, safe-area-context dùng bản của host), `filename` của container.
`dev/` chỉ dùng khi chạy riêng, không nằm trong gói build.
