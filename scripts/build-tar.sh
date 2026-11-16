#!/usr/bin/env bash
# Đóng gói mini app thành file .tar: chạy `pnpm build` trong thư mục package này.
# Kết quả: build/<tên-thư-mục>-<version>.tar  (version lấy từ package.json)
# Giải nén ra một thư mục tên <tên-thư-mục>/ chứa: package.json, README.md, src/.
# Muốn thêm hoặc bớt file trong gói: sửa dòng `cp -R` bên dưới.

set -euo pipefail
cd "$(dirname "$0")/.."

NAME="$(basename "$PWD")"
VERSION="$(node -p "require('./package.json').version")"
OUT="build/${NAME}-${VERSION}.tar"
STAGE="build/.stage"

rm -rf build
mkdir -p "$STAGE/$NAME"
cp -R package.json README.md src "$STAGE/$NAME/"

# COPYFILE_DISABLE: tránh macOS chèn thêm file ._* vào tar
COPYFILE_DISABLE=1 tar -cf "$OUT" -C "$STAGE" "$NAME"
rm -rf "$STAGE"

echo "Đã build: $OUT"
ls -lh "$OUT"
