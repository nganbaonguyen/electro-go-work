#!/usr/bin/env bash
# Chạy server dev (Re.Pack) của mini app này. Host (pnpm start:dev) sẽ nạp mini app từ đây
# khi bạn bấm vào ô tương ứng trên Home.
#   Cổng: biến PORT (mặc định theo package.json), host đọc http://localhost:<cổng>/<platform>/mf-manifest.json
# Lệnh chạy từ thư mục gốc host vì react-native.config.js (Re.Pack) và node_modules nằm ở đó;
# cả packages/<tên> và sub/<tên> đều cách host đúng 2 cấp nên dùng chung được.

set -euo pipefail

PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOST_DIR="$(cd "$PKG_DIR/../.." && pwd)"

if [ ! -f "$HOST_DIR/react-native.config.js" ]; then
  echo "Không tìm thấy host ElectroGo ở $HOST_DIR (package phải nằm trong packages/ hoặc sub/)." >&2
  exit 1
fi

cd "$HOST_DIR"
exec pnpm exec react-native start --port "${PORT:-9001}" --config "$PKG_DIR/rspack.config.mjs"
