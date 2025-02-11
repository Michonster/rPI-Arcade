#!/bin/bash

# Switch to tty1 (CTRL + ALT + F1)
chvt 1

# Wait for a moment to ensure the switch happens
sleep 1

# Type the command to start emulationstation
echo "emulationstation" | sudo -u YOUR_USER_NAME bash -c "cat > /dev/tty1"