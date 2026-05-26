#!/usr/bin/env bash
# generate-redirects.sh
#
# Generates static HTML meta-refresh redirect files for old flat Docusaurus-
# style URLs, pointing them at the equivalent pages in the new Antora structure.
#
# Instead of reading source .adoc files, this script derives redirect targets
# from the HTML files that Antora actually produced under ANTORA_PREFIX in the
# built site. This guarantees the redirect list matches the real build output,
# regardless of which branch or remote Antora pulled content from.
#
# Usage: ./scripts/generate-redirects.sh <site-output-dir> <antora-prefix>
#   site-output-dir  path to the built site root (e.g. build/site)
#   antora-prefix    path under site-output-dir where Antora pages live
#                    (e.g. admc/1.35/en)
#
# Example:
#   ./scripts/generate-redirects.sh \
#     build/site \
#     admission-controller/1.35/en

set -euo pipefail

SITE_DIR="${1:?site-output-dir argument required}"
ANTORA_PREFIX="${2:?antora-prefix argument required}"

if [ ! -d "$SITE_DIR" ]; then
  echo "ERROR: site output directory not found: $SITE_DIR" >&2
  exit 1
fi

ANTORA_DIR="${SITE_DIR}/${ANTORA_PREFIX}"

if [ ! -d "$ANTORA_DIR" ]; then
  echo "ERROR: antora prefix directory not found: $ANTORA_DIR" >&2
  exit 1
fi

count=0

while IFS= read -r -d '' html; do
  # Derive the page path relative to the antora prefix dir, without .html
  rel="${html#"$ANTORA_DIR"/}"
  rel="${rel%.html}"

  # Derive the resulting html page
  antora_html_file="${SITE_DIR}/${rel}.html"
  antora_index_file="${SITE_DIR}/${rel}/index.html"

  # The old flat URL path (what users had bookmarked under Docusaurus)
  flat_dir="${SITE_DIR}/${rel}"
  out_file="${flat_dir}/index.html"
  new_url="/${ANTORA_PREFIX}/${rel}.html"

  # Skip only if Antora already produced a real page at this path.
  # Otherwise, overwrite the redirect deterministically on each run.
  if [ -e "$antora_html_file" ] || { [ -e "$antora_index_file" ] && [ "$antora_index_file" != "$out_file" ]; }; then
    continue
  fi

  # Overwrite unconditionally so version bumps to ANTORA_PREFIX always take effect
  mkdir -p "$flat_dir"
  cat >"$out_file" <<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${new_url}">
  <link rel="canonical" href="${new_url}">
  <title>Redirecting...</title>
</head>
<body>
  <p>This page has moved. <a href="${new_url}">Click here if you are not redirected.</a></p>
</body>
</html>
HTML

  count=$((count + 1))
done < <(find "$ANTORA_DIR" -name "*.html" -not -name "index.html" -print0)

echo "Generated ${count} redirect file(s) under ${SITE_DIR}."
