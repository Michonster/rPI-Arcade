""" Program meant to be run on startup, allowing for the user 
to press a button and trigger a reset (reboot) of the raspberry pi. 
Instructions on how to run on bootup can be found in the rPIArcade 
README. """

from gpiozero import Button
import time
import subprocess
import os
from signal import pause

#Utilizes GPIO Pin 17
button = Button(17)

#when reset is pressed, reboot the raspberry pi
def handle_button_press():
    if button.is_pressed:
        print("Now rebooting RPi")
        time.sleep(1)
        os.system("sudo reboot")

try:
    while True:
        button.when_pressed = handle_button_press
        pause()
except KeyboardInterrupt:
    print("User Ended")
