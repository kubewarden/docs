#!/usr/bin/env bash

function is_valid_date() {
  local value="$1"
  [[ "$value" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] &&
    [[ "$(date -d "$value" +%F 2>/dev/null)" == "$value" ]]
}

usage() {
  cat <<EOF
Usage: $(basename "$0")
  <kw_component> # must be one of admission-controller sbom-scanner
  <current_latest_version>
  <current_prerelease_version>
  <new_prerelease_version>
  [ -n | yyyy-mm-dd ]
EOF
}

require_dir() {
  local path="$1"
  local label="$2"

  if [[ ! -d "$path" ]]; then
    echo "Error: $label '$path' not found."
    exit 1
  fi
}

require_file() {
  local path="$1"
  local label="$2"

  if [[ ! -f "$path" ]]; then
    echo "Error: $label '$path' not found."
    exit 1
  fi
}

run_sed_update() {
  local path="$1"
  shift

  if ! sed -E -i.bkp "$@" "$path"; then
    echo "Error: failed to update '$path'."
    exit 1
  fi

  rm "$path.bkp"
}

require_grep() {
  local mode="$1"
  local pattern="$2"
  local path="$3"
  local message="$4"

  if grep -Eq "$pattern" "$path"; then
    [[ "$mode" == "match" ]] || {
      echo "Error: $message"
      exit 1
    }
  else
    [[ "$mode" == "no-match" ]] || {
      echo "Error: $message"
      exit 1
    }
  fi
}

function update_revdate() {
  local target_dir="$1"
  local revdate="$2"
  local file

  require_dir "$target_dir" "Revdate target directory"

  while IFS= read -r -d '' file; do
    run_sed_update "$file" \
      -e "s/^:revdate:[[:space:]]*.*/:revdate: $revdate/"
  done < <(find "$target_dir" -type f -name '*.adoc' -print0)
}

repo_root="$(git rev-parse --show-toplevel)" || {
  echo "Error: not a git docs repository?"
  exit 1
}

cd "$repo_root" || exit 1

if [[ "$#" -ne 4 && "$#" -ne 5 ]]; then
  usage
  exit 1
fi

kw_component="$1"

case "$kw_component" in
  admission-controller)
    version_str="version-"
    ;;
  sbom-scanner)
    version_str="version-"
    ;;
  *)
    echo "Error: invalid component '$kw_component'. Expected one of: admission-controller sbom-scanner."
    exit 1
    ;;
esac

current_latest_version="$2"
current_latest_version_dir="$version_str$current_latest_version"
current_prerelease_version="$3"
current_prerelease_version_dir="$version_str$current_prerelease_version"
new_prerelease_version="$4"
new_prerelease_version_dir="$version_str$new_prerelease_version"

case "${5-}" in
  "")
    revdate_value="$(date +%F)"
    ;;
  -n)
    revdate_value=""
    ;;
  *)
    if ! is_valid_date "$5"; then
      echo "Error: '$5'. Only '-n' or a yyyy-mm-dd date is accepted as an optional argument."
      exit 1
    fi
    revdate_value="$5"
    ;;
esac

docs_dir="docs/$kw_component"

clv_dir="$docs_dir/$current_latest_version_dir"
cpv_dir="$docs_dir/$current_prerelease_version_dir"
npv_dir="$docs_dir/$new_prerelease_version_dir"

clv_yml="$clv_dir/antora.yml"
cpv_yml="$cpv_dir/antora.yml"
npv_yml="$npv_dir/antora.yml"

require_dir "$clv_dir" "Current latest version directory"
require_file "$clv_yml" "Current latest version antora.yml"
require_dir "$cpv_dir" "Current prerelease version directory"
require_file "$cpv_yml" "Current prerelease version antora.yml"

if [ -d "$npv_dir" ]; then
  echo "Error: New prerelease version directory '$npv_dir' already exists."
  exit 1
fi

# Safe to copy
if ! cp -r "$cpv_dir" "$npv_dir"; then
  echo "Error: failed to copy '$cpv_dir' to '$npv_dir'."
  exit 1
fi

# Modify current_latest_version/antora.yml, remove -latest from 'display:'.

run_sed_update "$clv_yml" "/^display: (['\"]).*-latest\\1$/d"
require_grep \
  "no-match" \
  "^display:[[:space:]]*(['\"]?).*-latest\\1$" \
  "$clv_yml" \
  "'-latest' display line still exists in '$clv_yml'."

# Modify current_prerelease_version/antora.yml, update 'display:' to
# current_prerelease_version-latest and remove prerelease.
run_sed_update "$cpv_yml" \
  -e "/^prerelease:/d" \
  -e "/^display: (['\"]).*\\1$/d" \
  -e "s/^version:[[:space:]]*(['\"]?)$current_prerelease_version\\1$/&\\
display: \\1$current_prerelease_version-latest\\1/"
require_grep \
  "match" \
  "^display:[[:space:]]*(['\"]?)$current_prerelease_version-latest\\1$" \
  "$cpv_yml" \
  "expected display '$current_prerelease_version-latest' was not written to '$cpv_yml'."

# Modify new_prerelease_version/antora.yml, Change version from
# current_prerelease_version to new_prerelease_version.
run_sed_update "$npv_yml" \
  -e "s/^version:[[:space:]]*(['\"]?)$current_prerelease_version\\1$/version: \\1$new_prerelease_version\\1/" \
  -e "s/^prerelease: .*$/prerelease: -dev/"
require_grep \
  "match" \
  "^version:[[:space:]]*(['\"]?)$new_prerelease_version\\1$" \
  "$npv_yml" \
  "expected version '$new_prerelease_version' was not written to '$npv_yml'."
require_grep \
  "match" \
  "^prerelease:[[:space:]]*-dev$" \
  "$npv_yml" \
  "expected prerelease '-dev' was not written to '$npv_yml'."

if [[ -n "$revdate_value" ]]; then
  update_revdate "$npv_dir" "$revdate_value"
fi
