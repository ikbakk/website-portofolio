#!/usr/bin/env bash
# Imports byte-exact P1 frozen PNGs into this branch's repository checkout.
# Usage: bash scripts/import-p1-references.sh <zip-file | directory>
# Does not stage, commit or push any files.
set -euo pipefail

SOURCE="${1:-}"
if [[ -z "$SOURCE" ]]; then
  echo "Usage: bash scripts/import-p1-references.sh /path/to/portfolio-p1-frozen-reference-pack.zip" >&2
  exit 2
fi

if ! command -v sha256sum >/dev/null 2>&1; then
  echo "sha256sum is required" >&2
  exit 2
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/docs/design/references"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

NAMES=(01-normal-master.png 02-cryo-variant.png 03-electro-variant.png)
HASHES=(
  64c5116914745e6b3677f0ada5bc238a221afd2e963fdf59f5dc07c91a7fdc57
  015d742ea2d4297eaaf2db61ac476e941f467cac0ca4adb9186f0c19ca8109bd
  2811e80e892d132647fc2b544d7a6af74cd510baef5254a02367f8707e01a841
)

if [[ -f "$SOURCE" ]]; then
  command -v unzip >/dev/null 2>&1 || { echo "unzip is required" >&2; exit 2; }
  for name in "${NAMES[@]}"; do
    unzip -p "$SOURCE" "references/$name" > "$TMP/$name" || {
      echo "Archive missing references/$name" >&2
      exit 1
    }
  done
elif [[ -d "$SOURCE" ]]; then
  for name in "${NAMES[@]}"; do
    if [[ -f "$SOURCE/$name" ]]; then
      cp "$SOURCE/$name" "$TMP/$name"
    elif [[ -f "$SOURCE/references/$name" ]]; then
      cp "$SOURCE/references/$name" "$TMP/$name"
    else
      echo "Folder missing $name" >&2
      exit 1
    fi
  done
else
  echo "No such ZIP or directory: $SOURCE" >&2
  exit 2
fi

# Verify *all* bytes before installing any assets.
for i in "${!NAMES[@]}"; do
  actual="$(sha256sum "$TMP/${NAMES[$i]}")"
  actual="${actual%% *}"
  if [[ "$actual" != "${HASHES[$i]}" ]]; then
    echo "SHA-256 mismatch: ${NAMES[$i]}" >&2
    exit 1
  fi
  echo "OK: ${NAMES[$i]} matches the frozen reference hash"
done

mkdir -p "$DEST"
for name in "${NAMES[@]}"; do
  cp "$TMP/$name" "$DEST/$name"
done
echo "Installed 3 byte-exact references in docs/design/references/"
echo "Next: node scripts/validate-weather-p1.mjs --strict"
echo "This script did not stage, commit or push."
