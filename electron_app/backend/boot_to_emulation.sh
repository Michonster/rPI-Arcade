#!/bin/bash

# Switch to tty1 (CTRL + ALT + F1)
chvt 1

# Set the DISPLAY variable for the user
export DISPLAY=:0

# Run EmulationStation with the correct environment
sudo -u rpiarcade bash -c 'source /home/rpiarcade/.profile; emulationstation'