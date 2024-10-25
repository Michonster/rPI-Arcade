import shutil
import os
import pyudev
import time
import subprocess
import atexit

context = pyudev.Context()

monitor = pyudev.Monitor.from_netlink(context)
monitor.filter_by(subsystem = 'block')

def cleanup():
    observer.stop()
    print("\nStopped monitoring")
    
atexit.register(cleanup)

game_systems = ['NES', 'N64', 'SNES', 'Dreamcast', 'PS1']

def copy_folder_from_usb(usb_base_path, destination_base_path):
    """
    for i in range(10):
        print(i)
        time.sleep(1)
    """
    for system in game_systems:
        usb_path = os.path.join(usb_base_path, system)
        destination_path = os.path.join(destination_base_path, system)
        # Ensure the USB path exists
        if os.path.exists(usb_path):
            try:
                # Copy the directory from USB to the destination
                shutil.copytree(usb_path, destination_path, dirs_exist_ok = True)
                print(f"Successfully copied {system} games from {usb_path} to {destination_path}.")
            except Exception as e:
                print(f"Error while copying {system}: {e}")
        else:
            print(f"{system} not found on USB")

def device_event(device):
    if device.action == 'add' and 'part' in device.device_type:
            print(f"USB device {device.device_node} inserted.")
            device_path = f'{device.device_node}'
            mount_point = '/mnt/usb'
            mount_command = ['sudo', 'mount', device_path, mount_point]
            unmount_command = ['sudo', 'umount', mount_point]
            try:
                subprocess.run(mount_command, check=True)
                print("Mount Success")
                copy_folder_from_usb(os.path.join(mount_point,'Retropie'),'/home/rpiarcade/roms' )
                
                chown_command = ['sudo', 'chown', '-R', 'rpiarcade:rpiarcade','/home/rpiarcade/roms'] 
                subprocess.run(chown_command, check = True)
                print("successfully changed ownership")
                
                subprocess.run(unmount_command, check=True)
                print("Unmount Successful, safe to remove USB")
                
            except subprocess.CalledProcessError as e:
                print(f"An error has occured: {e}")
    elif device.action == 'remove' and 'part' in device.device_type:
        print(f"USB partition {device.device_node} removed")
        observer.stop()
        print("USB removed, stopping script")
observer = pyudev.MonitorObserver(monitor, callback=device_event)
observer.start()
print("Monitoring USB storage insertions...")

# Example usage
#usb_folder = '/mnt/usb/Retropie/NES'
#destination_folder = '/home/rpiarcade/NES'
#copy_folder_from_usb(usb_folder, destination_folder)

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Quitting on User request")


