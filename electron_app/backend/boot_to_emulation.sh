#!/bin/bash

# Show a splash screen (image)
feh --fullscreen --hide-pointer --quiet /home/rpiarcade/electron_app/backend/load.jpg &

# Switch to tty1 (CTRL + ALT + F1)
chvt 1

# Set the DISPLAY variable for the user
export DISPLAY=:0

# Run EmulationStation with the correct environment
sudo -u rpiarcade bash -c 'source /home/rpiarcade/.profile; emulationstation' > /home/rpiarcade/emulationstation_log.txt 2>&1

# Kill the splash screen after EmulationStation starts
kill %1