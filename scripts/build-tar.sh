#!/usr/bin/env bash
# Đóng gói MÃ NGUỒN mini app thành file .tar: chạy `pnpm build:src` trong thư mục package này.
# Kết quả: build/<tên-thư-mục>-<version>-src.tar  (version lấy từ package.json)
# Giải nén ra một thư mục tên <tên-thư-mục>/ chứa: package.json, README.md, src/.
#
# KHÔNG upload file này lên web phân phối: nó không có mf-manifest.json nên web từ chối ("Tar không phải bundle").
# File upload lên web là tar BUNDLE do `pnpm build` tạo: build/<tên-thư-mục>-<version>.tar (không có đuôi -src).
# Tên file khác nhau và script này không xóa thư mục build/, nên chạy nhầm cũng không đè mất tar bundle.
# Muốn thêm hoặc bớt file trong gói: sửa dòng `cp -R` bên dưới.

set -euo pipefail
cd "$(dirname "$0")/.."

NAME="$(basename "$PWD")"
VERSION="$(node -p "require('./package.json').version")"
OUT="build/${NAME}-${VERSION}-src.tar"
STAGE="build/.stage"

mkdir -p build
rm -rf "$STAGE" "$OUT"
mkdir -p "$STAGE/$NAME"
cp -R package.json README.md src "$STAGE/$NAME/"

# COPYFILE_DISABLE: tránh macOS chèn thêm file ._* vào tar
COPYFILE_DISABLE=1 tar -cf "$OUT" -C "$STAGE" "$NAME"
rm -rf "$STAGE"

echo "Đã build: $OUT"
ls -lh "$OUT"
echo ""
echo "Đây là tar MÃ NGUỒN, không upload lên web. Muốn upload hãy chạy: pnpm build"
