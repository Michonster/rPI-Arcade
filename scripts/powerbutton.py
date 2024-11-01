"""Code successfully rebooted and turned off the pi but was unable to
turn the pi on from a shutdown state"""

from gpiozero import Button
import time
import subprocess
import os
from signal import pause

# Setup button on pin 5 (BCM numbering)
button = Button(3)

def handle_button_press():
    press_time = time.time()
    while button.is_pressed:
        time.sleep(0.1)
    press_duration = time.time() - press_time
    
    if press_duration>=3:
        print("Now shutting down RPi")
        time.sleep(5)
        os.system("sudo shutdown now")
    elif press_duration>=0.5:
        print("Now rebooting RPi")
        time.sleep(5)
        os.system("sudo reboot")
    
button.when_pressed = handle_button_press

pause()

"""import RPi.GPIO as GPIO
import time
import subprocess

# we will use the pin numbering to match the pins on the Pi, instead of the 
# GPIO pin outs (makes it easier to keep track of things)
# Pin 5 = GPIO 3
GPIO.setmode(GPIO.BOARD)  

# use the same pin that is used for the reset button
GPIO.setup(5, GPIO.IN, pull_up_down = GPIO.PUD_UP)  

oldButtonState1 = True

while True:
    #grab the current button state
    buttonState1 = GPIO.input(5)

    # check to see if button has been pushed
    if buttonState1 != oldButtonState1 and buttonState1 == False:
      subprocess.call("shutdown -h now", shell=True, 
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
      oldButtonState1 = buttonState1

    time.sleep(.1)"""
