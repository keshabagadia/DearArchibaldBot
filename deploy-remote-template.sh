#!/bin/bash

# === CONFIGURATION ===
# Replace the placeholder values below with your actual deployment setup

KEY_PATH="path/to/your-key.pem"            # Path to your PEM SSH key
EC2_USER="ubuntu"                          # EC2 username (typically 'ubuntu' for Ubuntu instances)
EC2_HOST="your.ec2.public.ip.address"      # EC2 instance public IP or DNS
PROJECT_DIR="~/your-project-directory"     # Directory on EC2 where your bot is located
PM2_PROCESS_NAME="your-pm2-process-name"   # PM2 process name (e.g., 'dear-archibald-bot')
ENTRY_FILE="src/index.js"                  # Entry file for your bot

# === DEPLOY SCRIPT ===
# This script SSHs into your EC2 instance, pulls the latest code, installs dependencies, and restarts your bot using PM2.

echo "🚀 Deploying to EC2..."

ssh -i "$KEY_PATH" ${EC2_USER}@${EC2_HOST} << ENDSSH
  echo "🔄 Pulling latest code..."
  cd $PROJECT_DIR
  git pull origin main
  npm install

  echo "🔁 Restarting bot using PM2..."
  pm2 restart $PM2_PROCESS_NAME || pm2 start $ENTRY_FILE --name $PM2_PROCESS_NAME
  echo "✅ Bot restarted!"
ENDSSH

echo "✅ Deployment Complete!"
