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
        except subprocess.CalledProcessError as e:
            print(f"Error extracting {file_path}: {e}")
    
    #7z extraction
    elif file_path.endswith('.7z'):
        try:
            subprocess.run(['7z', 'x', file_path, f'-o{extract_to}', '-aos'], check = True)
            print(f"Successfully extracted {file_path} to {extract_to}")
        except Exception as e:
            print(f"Error extracting {file_path}: {e}")

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
                    except Exception as e:
                        print(f"Error moving {item} for {system}: {e}")
                #Change ownership to rpiarcade
                chown_command = ['sudo', 'chown', '-R', 'rpiarcade:rpiarcade',final_destination_path] 
                subprocess.run(chown_command, check = True)

            except Exception as e:
                print(f"Error while copying {system}: {e}")
        #Print that USB path doesnt exist if no path is found
        else:
            print(f"{system} not found on USB")


#Monitor USB insertion/removal
def device_event(device):
    global stop_script
    #Perform when USB is inserted
    if device.action == 'add' and 'part' in device.device_type:
            print(f"USB device {device.device_node} inserted.")
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
                
            except subprocess.CalledProcessError as e:
                print(f"An error has occurred: {e}")
    #When device is removed, stop script
    elif device.action == 'remove' and 'part' in device.device_type:
        print(f"USB partition {device.device_node} removed")
        stop_script = True
        observer.stop()
        print("USB removed, stopping script")
        
if __name__ == "__main__":
    
    observer = pyudev.MonitorObserver(monitor, callback=device_event)
    observer.start()
    print("Monitoring USB storage insertions...")

    try:
        while not stop_script:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Quitting on User request")


