#!/bin/bash

echo "🔁 Restarting bot using PM2..."
pm2 restart dear-archibald-bot || pm2 start src/index.js --name dear-archibald-bot
echo "✅ Bot restarted!"
