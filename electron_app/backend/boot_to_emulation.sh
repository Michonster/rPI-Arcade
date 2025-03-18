#!/bin/bash

# Show a splash screen (image)
feh --fullscreen --hide-pointer --quiet /home/rpiarcade/electron_app/backend/load.jpg &

# Save the splash screen process ID to kill it later
LOAD_PID=$!

# Switch to tty1 (CTRL + ALT + F1)
chvt 1

# Set the DISPLAY variable for the user
export DISPLAY=:0

# Run EmulationStation with the correct environment
sudo -u rpiarcade bash -c 'source /home/rpiarcade/.profile; emulationstation' > /home/rpiarcade/emulationstation_log.txt 2>&1

# Wait for a bit to keep the splash visible, then kill the splash screen
sleep 5
kill $LOAD_PID