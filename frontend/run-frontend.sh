#!/usr/bin/env bash
set -euo pipefail

# Wrapper to start Next.js under PM2 with a reliable PATH
# Temporarily disable nounset when sourcing user dotfiles to avoid
# errors like "/root/.bashrc: line 6: PS1: unbound variable" in non-interactive shells.
if [ -s "$HOME/.nvm/nvm.sh" ]; then
	# shellcheck disable=SC2164
	(set +u; source "$HOME/.nvm/nvm.sh")
fi
if [ -s "$HOME/.profile" ]; then
	(set +u; source "$HOME/.profile")
fi
if [ -s "$HOME/.bashrc" ]; then
	(set +u; source "$HOME/.bashrc")
fi

FRONTEND_DIR="/var/www/Sarthi/frontend"
export PATH="$FRONTEND_DIR/node_modules/.bin:$PATH"
cd "$FRONTEND_DIR"

exec npm run start -- -p 3000 -H 0.0.0.0
