#!/usr/bin/env bash
# Idempotent VPS setup for Sarthi (frontend Next.js + backend Strapi)
# - Installs Node via NVM (Node 20 LTS)
# - Installs PM2 globally
# - Installs dependencies and builds both apps
# - Starts apps under PM2 using the wrapper scripts
#
# Usage (on the server as root or deploy user):
#   bash scripts/setup-vps.sh

set -euo pipefail

PROJECT_ROOT="/var/www/Sarthi"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT/backend"

echo "== Ensuring required packages (curl, build tools) =="
if command -v apt-get >/dev/null 2>&1; then
	apt-get update -y
	DEBIAN_FRONTEND=noninteractive apt-get install -y curl build-essential ca-certificates
fi

echo "== Install NVM if missing =="
export NVM_DIR="${HOME}/.nvm"
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
	curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi
# shellcheck disable=SC1090
source "$NVM_DIR/nvm.sh"

echo "== Install Node.js 20 LTS and set default =="
nvm install --lts=Hydrogen || nvm install 20
nvm alias default 20 || true
nvm use default

echo "== Ensure PM2 is installed globally =="
npm i -g pm2@latest

echo "== Create project directories if missing =="
mkdir -p "$FRONTEND_DIR" "$BACKEND_DIR"

echo "== Ensure wrapper scripts are executable =="
chmod +x "$FRONTEND_DIR/run-frontend.sh" || true
chmod +x "$BACKEND_DIR/run-backend.sh" || true

echo "== Install dependencies (frontend) =="
cd "$FRONTEND_DIR"
if [ -f package-lock.json ]; then
	npm ci
else
	npm i
fi

echo "== Build frontend =="
npm run build

echo "== Install dependencies (backend) =="
cd "$BACKEND_DIR"
if [ -f package-lock.json ]; then
	npm ci
else
	npm i
fi

echo "== Build backend (Strapi admin) =="
npm run build

echo "== Start or restart apps via PM2 =="
# Use wrapper scripts so local node_modules/.bin is on PATH
pm2 delete frontend >/dev/null 2>&1 || true
pm2 delete backend >/dev/null 2>&1 || true

pm2 start "$FRONTEND_DIR/run-frontend.sh" --name frontend
pm2 start "$BACKEND_DIR/run-backend.sh" --name backend

pm2 save

echo "== Configure PM2 to start on boot (systemd) =="
# This prints a command; run it automatically when possible
STARTUP_CMD=$(pm2 startup systemd -u "${USER}" --hp "${HOME}" | tail -n 1 || true)
if [ -n "$STARTUP_CMD" ]; then
	bash -lc "$STARTUP_CMD" || true
fi

echo "== Status =="
pm2 status || true

echo "== Tail last logs (10 lines each) =="
pm2 logs --nostream --lines 10 || true

echo "== Done. Use 'pm2 logs' to follow logs live.'"

