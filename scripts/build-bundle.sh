#!/usr/bin/env bash
# Build bundle production của mini app (iOS + Android) rồi đóng gói thành file .tar để triển khai.
# Chạy: `pnpm build` trong thư mục package này.
#
# Kết quả: build/<tên-thư-mục>-<version>.tar, giải nén ra:
#   <tên-thư-mục>/ios/      mf-manifest.json, <tên>.container.js.bundle, chunk, assets
#   <tên-thư-mục>/android/  như trên
# Đưa nội dung từng thư mục lên nơi host trỏ tới (xem biến *_REMOTE_URL trong rspack.config.mjs của host),
# ví dụ https://cdn.example.com/work/ios/mf-manifest.json
#
# Cần chạy từ thư mục gốc host vì react-native.config.js (Re.Pack) và node_modules nằm ở đó;
# cả packages/<tên> và sub/<tên> đều cách host đúng 2 cấp nên dùng chung được.

set -euo pipefail

PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOST_DIR="$(cd "$PKG_DIR/../.." && pwd)"
NAME="$(basename "$PKG_DIR")"
VERSION="$(node -p "require('$PKG_DIR/package.json').version")"
OUT="$PKG_DIR/build"
STAGE="$OUT/.stage"

if [ ! -f "$HOST_DIR/react-native.config.js" ]; then
  echo "Không tìm thấy host ElectroGo ở $HOST_DIR (package phải nằm trong packages/ hoặc sub/)." >&2
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$STAGE/$NAME"

cd "$HOST_DIR"
for PLATFORM in ios android; do
  echo "==> $NAME ($PLATFORM)"
  pnpm exec react-native bundle \
    --platform "$PLATFORM" \
    --dev false \
    --entry-file dev/index.js \
    --bundle-output "$OUT/.tmp/$PLATFORM/index.bundle" \
    --assets-dest "$OUT/.tmp/$PLATFORM" \
    --config "$PKG_DIR/rspack.config.mjs" > "$OUT/.build-$PLATFORM.log" 2>&1 || {
      echo "Build $PLATFORM lỗi, xem $OUT/.build-$PLATFORM.log" >&2
      exit 1
    }
  mkdir -p "$STAGE/$NAME/$PLATFORM"
  # Bỏ source map và file thống kê: không cần khi triển khai
  (cd "$OUT/generated/$PLATFORM" && find . -type f ! -name '*.map' ! -name 'mf-stats.json' -print0 \
    | COPYFILE_DISABLE=1 tar -cf - --null -T - ) | tar -xf - -C "$STAGE/$NAME/$PLATFORM"
done

TAR="$OUT/${NAME}-${VERSION}.tar"
COPYFILE_DISABLE=1 tar -cf "$TAR" -C "$STAGE" "$NAME"
rm -rf "$STAGE" "$OUT/.tmp" "$OUT"/.build-*.log

echo ""
echo "Đã build: build/${NAME}-${VERSION}.tar"
ls -lh "$TAR"
