#!/bin/bash
# Run on the VPS after code is in /var/www/render-king
set -euo pipefail

cd /var/www/render-king

echo "==> Installing dependencies..."
npm ci --omit=dev 2>/dev/null || npm install --omit=dev

echo "==> Building app..."
npm run build

echo "==> Running database migrations..."
npm run db:push

echo "==> Restarting PM2..."
mkdir -p /var/log/render-king
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "==> Done. Check: pm2 status && curl -I http://127.0.0.1:3000"
