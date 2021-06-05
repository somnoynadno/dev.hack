#!/bin/bash

# Simple Continuous Deployment script

# Usage:
# 1. Set project folder below:
PROJECT_DIR="/home/somnoynadno/services/dev.hack";
# 2. Make sure that you cloned that repo
# 3. Set up user here:
USER="somnoynadno"
# 4. Add this script to crontab:
# 4.1. $ crontab -e
# 4.2. Insert: * * * * * /path/to/this/script
# 4.3. Note: this will be executed every minute

cd $PROJECT_DIR;
if [ -f "update.lock" ]; then
    echo "Update in progress";
else 
    echo "Trying to update...";
    touch update.lock;

    sudo -u $USER -H sh -c "cd $PROJECT_DIR && git pull && docker-compose up --no-deps --build --remove-orphans -d";

    rm update.lock;
fi

