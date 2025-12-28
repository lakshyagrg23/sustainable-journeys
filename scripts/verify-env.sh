#!/usr/bin/env bash
set -euo pipefail

# Basic environment and service verification script for server

# Source common profiles to get PATH for nvm/node/pm2
source ~/.profile 2>/dev/null || true
source ~/.bashrc 2>/dev/null || true
source ~/.nvm/nvm.sh 2>/dev/null || true

export PATH="/usr/local/bin:/usr/bin:/bin:$HOME/.nvm/versions/node/$(nvm current 2>/dev/null || echo 'v20.0.0')/bin:$PATH"

echo "== Node & PM2 versions =="
node -v || true
npm -v || true
pm2 -v || true

echo
echo "== Frontend env =="
if [ -f /var/www/Sarthi/frontend/.env.local ]; then
  cat /var/www/Sarthi/frontend/.env.local
else
  echo "/var/www/Sarthi/frontend/.env.local missing"
fi

echo
echo "== Backend env =="
if [ -f /var/www/Sarthi/backend/.env ]; then
  cat /var/www/Sarthi/backend/.env
else
  echo "/var/www/Sarthi/backend/.env missing"
fi

echo
echo "== PM2 status =="
pm2 status || true

# Simple curl checks
curl_silent() {
  curl -sS --max-time 5 "$1" | head -c 200 || true
}

echo
echo "== HTTP checks =="
FRONTEND_PORT=${FRONTEND_PORT:-3000}
BACKEND_PORT=${PORT:-1337}

# Try localhost; adjust if apps are proxied behind nginx on 80/443
echo "Frontend (localhost:$FRONTEND_PORT):"
curl_silent "http://127.0.0.1:${FRONTEND_PORT}/" || true

echo

echo "Backend (localhost:$BACKEND_PORT /api):"
curl_silent "http://127.0.0.1:${BACKEND_PORT}/api" || true

echo

echo "== Done =="
