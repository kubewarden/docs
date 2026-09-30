#!/usr/bin/env bash
#
# Check the documentation version invariants that the release automation
# depends on.
#
# The automation in updatecli/updatecli.d/antora.yaml promotes a released
# version and creates the next placeholder. It can only do that when each
# component has exactly one placeholder directory and exactly one released
# directory. When those markers drift, the promotion stops and no new
# documentation version appears.
#
# This script reports every problem it finds and then exits with 1.
#
# Usage: ./scripts/check-docs-versions.sh

set -euo pipefail

# Components with automated version promotion. Keep this list in sync with
# the case statement in scripts/make-new-release.sh.
#
# docs/kw is not in the list. It is the umbrella landing component, it has a
# single directory, and it carries no version markers.
COMPONENTS=(admission-controller sbom-scanner runtime-enforcer network-enforcer)

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
cd "$repo_root"

problems=0

report() {
  local location="$1"
  local problem="$2"
  local hint="$3"

  echo "$location: $problem"
  echo "    hint: $hint"
  problems=$((problems + 1))
}

# Print the value of a top level key, without the surrounding quotes.
yaml_value() {
  local file="$1"
  local key="$2"

  sed -n -E "s/^${key}:[[:space:]]*(.*)\$/\1/p" "$file" |
    head -1 |
    sed -E "s/[[:space:]]+\$//; s/^['\"]//; s/['\"]\$//"
}

for component in "${COMPONENTS[@]}"; do
  component_dir="docs/$component"

  if [[ ! -d "$component_dir" ]]; then
    report "$component_dir" \
      "component directory not found" \
      "remove the component from COMPONENTS in this script, or restore the directory"
    continue
  fi

  placeholders=()
  latest_versions=()

  for dir in "$component_dir"/version-*/; do
    antora_file="${dir}antora.yml"
    [[ -f "$antora_file" ]] || continue

    dir_version="$(basename "$dir")"
    dir_version="${dir_version#version-}"
    file_version="$(yaml_value "$antora_file" version)"

    if [[ "$file_version" != "$dir_version" ]]; then
      report "$antora_file" \
        "declares version \"$file_version\" but the directory is version-$dir_version" \
        "the version key and the directory name must carry the same number"
    fi

    if grep -Eq "^prerelease:" "$antora_file"; then
      placeholders+=("$dir_version")
    fi

    display="$(yaml_value "$antora_file" display)"
    if [[ "$display" == *-latest ]]; then
      latest_versions+=("$dir_version")

      if [[ "$display" != "${dir_version}-latest" ]]; then
        report "$antora_file" \
          "carries display \"$display\" but the directory is version-$dir_version" \
          "the display marker must name the version of its own directory"
      fi
    fi
  done

  if [[ "${#placeholders[@]}" -ne 1 ]]; then
    report "$component_dir" \
      "expected exactly 1 version directory with 'prerelease:', found ${#placeholders[@]}" \
      "exactly one version is the placeholder for the next release"
  fi

  if [[ "${#latest_versions[@]}" -ne 1 ]]; then
    report "$component_dir" \
      "expected exactly 1 version with a '-latest' display marker, found ${#latest_versions[@]}" \
      "add 'display: \"X.Y-latest\"' to the released version and remove it from the others"
  fi

  if [[ "${#placeholders[@]}" -eq 1 ]] && [[ "${#latest_versions[@]}" -eq 1 ]]; then
    if [[ "${placeholders[0]}" == "${latest_versions[0]}" ]]; then
      report "$component_dir/version-${placeholders[0]}" \
        "is both the placeholder and the latest release" \
        "the placeholder is the next version, so it cannot also be the released one"
    fi
  fi
done

if [[ "$problems" -gt 0 ]]; then
  echo
  echo "check-docs-versions: $problems problem(s) found"
  exit 1
fi

echo "check-docs-versions: ${#COMPONENTS[@]} components OK"
