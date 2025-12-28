#!/usr/bin/env bash
set -euo pipefail

# Simple helper to set GitHub Actions secrets for this repo
# Requires GitHub CLI (gh) installed and authenticated

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install from https://cli.github.com/" >&2
  exit 1
fi

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)
if [ -z "$REPO" ]; then
  echo "Unable to detect repo. Run 'gh repo set-default <owner>/<repo>' or run from a cloned repo." >&2
  exit 1
fi

gen_secret() {
  # 48 bytes base64, strip non-alnum to be safe
  openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 64
}

confirm() {
  read -r -p "$1 [y/N]: " yn
  case $yn in
    [Yy]*) return 0;;
    *) return 1;;
  esac
}

# Frontend secret
NEXT_PUBLIC_API_URL_DEFAULT="http://139.84.142.191:1337"
read -r -p "NEXT_PUBLIC_API_URL [$NEXT_PUBLIC_API_URL_DEFAULT]: " NEXT_PUBLIC_API_URL
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-$NEXT_PUBLIC_API_URL_DEFAULT}

echo "Setting frontend secret NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL"
echo -n "$NEXT_PUBLIC_API_URL" | gh secret set NEXT_PUBLIC_API_URL -R "$REPO" --app actions --body -

echo "\nGenerating backend secrets..."
APP_KEYS="$(gen_secret),$(gen_secret),$(gen_secret)"
API_TOKEN_SALT=$(gen_secret)
ADMIN_JWT_SECRET=$(gen_secret)
TRANSFER_TOKEN_SALT=$(gen_secret)
JWT_SECRET=$(gen_secret)
ENCRYPTION_KEY=$(gen_secret)

# Allow user to override
read -r -p "Use generated backend secrets? (recommended) [Y/n]: " usegen
iuserec=${usegen:-Y}
if [[ $iuserec =~ ^[Nn]$ ]]; then
  read -r -p "APP_KEYS (comma-separated): " APP_KEYS
  read -r -p "API_TOKEN_SALT: " API_TOKEN_SALT
  read -r -p "ADMIN_JWT_SECRET: " ADMIN_JWT_SECRET
  read -r -p "TRANSFER_TOKEN_SALT: " TRANSFER_TOKEN_SALT
  read -r -p "JWT_SECRET: " JWT_SECRET
  read -r -p "ENCRYPTION_KEY: " ENCRYPTION_KEY
fi

echo -n "$APP_KEYS" | gh secret set APP_KEYS -R "$REPO" --app actions --body -
echo -n "$API_TOKEN_SALT" | gh secret set API_TOKEN_SALT -R "$REPO" --app actions --body -
echo -n "$ADMIN_JWT_SECRET" | gh secret set ADMIN_JWT_SECRET -R "$REPO" --app actions --body -
echo -n "$TRANSFER_TOKEN_SALT" | gh secret set TRANSFER_TOKEN_SALT -R "$REPO" --app actions --body -
echo -n "$JWT_SECRET" | gh secret set JWT_SECRET -R "$REPO" --app actions --body -
echo -n "$ENCRYPTION_KEY" | gh secret set ENCRYPTION_KEY -R "$REPO" --app actions --body -

# Optional DB
if confirm "Configure database secrets (optional)?"; then
  read -r -p "DATABASE_CLIENT [sqlite|postgres|mysql] (default sqlite): " DATABASE_CLIENT
  read -r -p "DATABASE_URL (optional): " DATABASE_URL
  read -r -p "DATABASE_HOST (optional): " DATABASE_HOST
  read -r -p "DATABASE_PORT (optional): " DATABASE_PORT
  read -r -p "DATABASE_NAME (optional): " DATABASE_NAME
  read -r -p "DATABASE_USERNAME (optional): " DATABASE_USERNAME
  read -r -p "DATABASE_PASSWORD (optional): " DATABASE_PASSWORD
  read -r -p "DATABASE_FILENAME (sqlite path, default .tmp/data.db): " DATABASE_FILENAME
  read -r -p "DATABASE_SSL [true/false] (default false): " DATABASE_SSL

  [ -n "${DATABASE_CLIENT:-}" ] && echo -n "$DATABASE_CLIENT" | gh secret set DATABASE_CLIENT -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_URL:-}" ] && echo -n "$DATABASE_URL" | gh secret set DATABASE_URL -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_HOST:-}" ] && echo -n "$DATABASE_HOST" | gh secret set DATABASE_HOST -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_PORT:-}" ] && echo -n "$DATABASE_PORT" | gh secret set DATABASE_PORT -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_NAME:-}" ] && echo -n "$DATABASE_NAME" | gh secret set DATABASE_NAME -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_USERNAME:-}" ] && echo -n "$DATABASE_USERNAME" | gh secret set DATABASE_USERNAME -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_PASSWORD:-}" ] && echo -n "$DATABASE_PASSWORD" | gh secret set DATABASE_PASSWORD -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_FILENAME:-}" ] && echo -n "$DATABASE_FILENAME" | gh secret set DATABASE_FILENAME -R "$REPO" --app actions --body - || true
  [ -n "${DATABASE_SSL:-}" ] && echo -n "$DATABASE_SSL" | gh secret set DATABASE_SSL -R "$REPO" --app actions --body - || true
fi

# Server SSH
if confirm "Configure server SSH secrets now?"; then
  read -r -p "SSH_HOST: " SSH_HOST
  read -r -p "SSH_USER: " SSH_USER
  echo "Paste private key (END with Ctrl-D):"
  SSH_KEY=$(cat)
  echo -n "$SSH_HOST" | gh secret set SSH_HOST -R "$REPO" --app actions --body -
  echo -n "$SSH_USER" | gh secret set SSH_USER -R "$REPO" --app actions --body -
  echo -n "$SSH_KEY"  | gh secret set SSH_KEY  -R "$REPO" --app actions --body -
fi

echo "\nAll done. Trigger a workflow run by pushing to main or via the Actions tab."