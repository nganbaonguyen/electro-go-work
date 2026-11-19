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

# Tăng số bản build thêm 1. Số lưu ở .build-info.json và ĐƯỢC đưa lên git, nên các máy dùng chung một bộ đếm:
# lấy số lớn hơn giữa máy này và bản mới nhất trên GitHub (nếu có mạng) rồi cộng 1. Số hiện ở cuối màn hình
# trung tâm của mini app để biết app đã nạp đúng gói tar vừa upload chưa. Sau khi build nhớ commit + push file này
# để máy khác thấy. Đặt lại về 0: xóa file .build-info.json (cả trên GitHub).
INFO="$PKG_DIR/.build-info.json"
read_number() { node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).number||0)}catch{console.log(0)}})'; }
PREV="$(read_number < "$INFO" 2>/dev/null || echo 0)"
if git -C "$PKG_DIR" rev-parse --abbrev-ref '@{u}' >/dev/null 2>&1; then
  GIT_TERMINAL_PROMPT=0 git -C "$PKG_DIR" fetch -q 2>/dev/null || echo "    (không lấy được số build từ GitHub, dùng số của máy này)"
  REMOTE="$(git -C "$PKG_DIR" show '@{u}:.build-info.json' 2>/dev/null | read_number || echo 0)"
  if [ "${REMOTE:-0}" -gt "$PREV" ]; then
    echo "    Số build trên GitHub (#$REMOTE) lớn hơn máy này (#$PREV), tiếp tục từ #$REMOTE"
    PREV="$REMOTE"
  fi
fi
BUILD_NUMBER=$((PREV + 1))
printf '{"number": %s, "builtAt": "%s"}\n' "$BUILD_NUMBER" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$INFO"
echo "==> Bản build #$BUILD_NUMBER"

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
echo "Đã build: build/${NAME}-${VERSION}.tar (bản build #$BUILD_NUMBER)"
echo "Nhớ commit + push .build-info.json để máy khác tiếp tục đếm từ #$BUILD_NUMBER."
ls -lh "$TAR"
