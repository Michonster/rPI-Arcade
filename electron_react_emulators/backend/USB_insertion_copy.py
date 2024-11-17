"""Script to copy roms via USB from any user when USB is inserted into 
the Raspberry Pi. Upon insertion, each game system file will be scanned
and the rooms within will be copied onto the RPI. In the case of duplicates,
the roms won't be installed. """

import shutil
import os
import pyudev
import time
import subprocess
import zipfile
from flask import Flask, jsonify
from flask_cors import CORS

# Flask app setup
app = Flask(__name__)
log_messages = []  # A list to store log messages

CORS(app)

#Setup for USB monitoring 
context = pyudev.Context()
monitor = pyudev.Monitor.from_netlink(context)
monitor.filter_by(subsystem = 'block')

#variable to check whether to stop script
stop_script = False

game_systems = ['nes', 'n64', 'snes', 'dreamcast', 'psp', 'psx', 'nds', 'megadrive']

#Extracts PSP, PS1, and Dreamcast games from zips/7z files
def extract_file(file_path, extract_to):
    #Zip extraction
    if file_path.endswith('.zip'):
        try:
            subprocess.run(['unzip', '-n', file_path, '-d', extract_to], check=True)
            print(f"Successfully extracted {file_path} to {extract_to}")
            log_messages.append(f"Successfully extracted {file_path} to {extract_to}")
        except subprocess.CalledProcessError as e:
            print(f"Error extracting {file_path}: {e}")
            log_messages.append(f"Error extracting {file_path}: {e}")
    
    #7z extraction
    elif file_path.endswith('.7z'):
        try:
            subprocess.run(['7z', 'x', file_path, f'-o{extract_to}', '-aos'], check = True)
            print(f"Successfully extracted {file_path} to {extract_to}")
            log_messages.append(f"Successfully extracted {file_path} to {extract_to}")
        except Exception as e:
            print(f"Error extracting {file_path}: {e}")
            log_messages.append(f"Error extracting {file_path}: {e}")

#Copys games from USB folders onto raspberry pi
def copy_folder_from_usb(usb_base_path, destination_base_path):
    #Repeat this process for each emulator
    for system in game_systems:
        usb_path = os.path.join(usb_base_path, system)
        final_destination_path = os.path.join(destination_base_path, system)
        # Ensure the USB path exists
        if os.path.exists(usb_path):
            try:
                # Copy the directory from USB to the destination
                for item in os.listdir(usb_path):
                    source_item = os.path.join(usb_path, item)
                    dest_item = os.path.join(final_destination_path, item)
                    #If game is a duplicate, continue to next game
                    if os.path.exists(dest_item):
                        print(f"{item} already exists in {final_destination_path}")
                        log_messages.append(f"{item} already exists in {final_destination_path}")
                        continue
                    #Copy file or directory onto raspberry pi
                    try:
                        if os.path.isdir(source_item):
                            shutil.copytree(source_item, dest_item, dirs_exist_ok=True)
                        else:
                            shutil.copy2(source_item, final_destination_path)
                            #If game is PS1, PSP, or Dreamcast, extract necessary zips/7z
                            if system in ['psx', 'dreamcast', 'psp']:
                                if item.endswith('.zip') or item.endswith('.7z'):
                                    extract_file(dest_item, final_destination_path)
                        print(f"Successfully moved {system} game {item} to {final_destination_path}")
                        log_messages.append(f"Successfully moved {system} game {item} to {final_destination_path}")
                    except Exception as e:
                        print(f"Error moving {item} for {system}: {e}")
                        log_messages.append(f"Error moving {item} for {system}: {e}")
                #Change ownership to rpiarcade
                chown_command = ['sudo', 'chown', '-R', 'rpiarcade:rpiarcade',final_destination_path] 
                subprocess.run(chown_command, check = True)

            except Exception as e:
                print(f"Error while copying {system}: {e}")
                log_messages.append(f"Error while copying {system}: {e}")
        #Print that USB path doesnt exist if no path is found
        else:
            print(f"{system} not found on USB")
            log_messages.append(f"{system} not found on USB")


#Monitor USB insertion/removal
def device_event(device):
    global stop_script
    #Perform when USB is inserted
    if device.action == 'add' and 'part' in device.device_type:
            print(f"USB device {device.device_node} inserted.")
            log_messages.append(f"USB device {device.device_node} inserted.")
            device_path = f'{device.device_node}'
            mount_point = '/mnt/usb'
            mount_command = ['sudo', 'mount', device_path, mount_point]
            unmount_command = ['sudo', 'umount', mount_point]
            try:
                #Mount the USB and run copy function
                subprocess.run(mount_command, check=True)
                print("Mount Success")
                copy_folder_from_usb(os.path.join(mount_point,'RetroPie'),'/home/rpiarcade/RetroPie/roms' )
                
                #Unmount the USB
                subprocess.run(unmount_command, check=True)
                print("Unmount Successful, safe to remove USB")
                log_messages.append("Please remove USB.")
                
            except subprocess.CalledProcessError as e:
                print(f"An error has occurred: {e}")
                log_messages.append(f"An error has occurred: {e}")
    #When device is removed, stop script
    elif device.action == 'remove' and 'part' in device.device_type:
        print(f"USB partition {device.device_node} removed")
        log_messages.append("USB successfully removed.")
        stop_script = True
        observer.stop()
        print("USB removed, stopping script")
        

# Endpoint to start USB monitoring
@app.route('/start_usb_monitoring', methods=['GET'])
def start_usb_monitoring():
    global observer
    observer = pyudev.MonitorObserver(monitor, callback=device_event)
    observer.start()
    print("Monitoring USB storage insertions...")
    return jsonify({"message": "USB monitoring started"}), 200

# Endpoint to stop USB monitoring
@app.route('/stop_usb_monitoring', methods=['GET'])
def stop_usb_monitoring():
    global observer
    if observer is not None:
        observer.stop()
        observer = None
        print("Stopped USB monitoring.")
    return jsonify({"message": "USB monitoring stopped"}), 200

# Flask route to get log messages
@app.route('/get_log_messages', methods=['GET'])
def get_log_messages():
    global log_messages
    messages = log_messages.copy()  # Make a copy to send
    log_messages = []  # Clear the log after sending
    return jsonify(messages), 200

if __name__ == "__main__":
    # >>> moved this to /start_usb_monitoring endpoint
    # observer = pyudev.MonitorObserver(monitor, callback=device_event)
    # observer.start()
    # print("Monitoring USB storage insertions...")

    # try:
    #     while not stop_script:
    #         time.sleep(1)
    # except KeyboardInterrupt:
    #     print("Quitting on User request")

    # Starts the flask server, waiting for frontend to call the script
    app.run(debug=True, host="127.0.0.1", port=5000)


