#!/usr/bin/env bash

set -e

# Prefer an OpenCode executable already available on PATH.
if command -v opencode >/dev/null 2>&1; then
  OPENCODE=opencode
# The installer may add OpenCode to the user directory without updating
# this shell's PATH.
elif [ -x "$HOME/.opencode/bin/opencode" ]; then
  OPENCODE="$HOME/.opencode/bin/opencode"
# Install OpenCode on first use, then start the newly installed binary.
else
  curl -fsSL https://opencode.ai/v2/install | bash
  OPENCODE="$HOME/.opencode/bin/opencode"
fi

# Forward arguments so npm run opencode -- --help and other CLI flags work.
"$OPENCODE" "$@"
