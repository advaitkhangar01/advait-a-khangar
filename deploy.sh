#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "==========================================="
echo " Starting Deployment for advait.website"
echo "==========================================="

# Navigate to the repository directory (just in case)
cd "$(dirname "$0")"

# 1. Pull the latest code
echo "--> Pulling latest code from Git..."
git pull

# 2. Install dependencies
echo "--> Installing dependencies..."
npm install --legacy-peer-deps

# 3. Build production bundle
echo "--> Building production bundle..."
npm run build

echo "--> Production build completed successfully in './dist'."

# 4. Optional: Restart process manager if serving via PM2
# If you serve using PM2 (e.g. pm2 serve dist 3000 --spa), uncomment below:
# echo "--> Reloading PM2 process..."
# pm2 reload advait-website || pm2 start npx --name "advait-website" -- serve dist 3000 --spa

echo "==========================================="
echo " Deployment Completed Successfully!"
echo "==========================================="
