#!/usr/bin/env bash
set -euo pipefail

# Wrapper to start Strapi under PM2 with a reliable PATH
# Temporarily disable nounset when sourcing user dotfiles to avoid
# errors like "/root/.bashrc: line 6: PS1: unbound variable" in non-interactive shells.
if [ -s "$HOME/.nvm/nvm.sh" ]; then
	(set +u; source "$HOME/.nvm/nvm.sh")
fi
if [ -s "$HOME/.profile" ]; then
	(set +u; source "$HOME/.profile")
fi
if [ -s "$HOME/.bashrc" ]; then
	(set +u; source "$HOME/.bashrc")
fi

BACKEND_DIR="/var/www/Sarthi/backend"
export PATH="$BACKEND_DIR/node_modules/.bin:$PATH"
cd "$BACKEND_DIR"

exec npm run start
