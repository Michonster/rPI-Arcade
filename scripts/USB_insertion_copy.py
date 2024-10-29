import shutil
import os
import pyudev
import time
import subprocess
import zipfile
from tqdm import tqdm

context = pyudev.Context()

monitor = pyudev.Monitor.from_netlink(context)
monitor.filter_by(subsystem = 'block')

stop_script = False

game_systems = ['nes', 'n64', 'snes', 'dreamcast', 'psp', 'psx', 'nds', 'megadrive']

def extract_file(file_path, extract_to):
    if file_path.endswith('.zip'):
        try:
            # Use '-o' to overwrite existing files, '-n' to skip extracting existing files
            subprocess.run(['unzip', '-n', file_path, '-d', extract_to], check=True)
            print(f"Successfully extracted {file_path} to {extract_to}")
        except subprocess.CalledProcessError as e:
            print(f"Error extracting {file_path}: {e}")
    elif file_path.endswith('.7z'):
        try:
            subprocess.run(['7z', 'x', file_path, f'-o{extract_to}', '-aos'], check = True)
            print(f"Successfully extracted {file_path} to {extract_to}")
        except Exception as e:
            print(f"Error extracting {file_path}: {e}")
"""
def copy_file_with_progress(src, dst):
    total_size = os.path.getsize(src)
    with open(src, 'rb') as fsrc, open(dst, 'wb') as fdst:
        with tqdm(total=total_size, unit='B', unit_scale=True, desc=os.path.basename(src)) as pbar:
            while True:
                buf = fsrc.read(1024 * 1024)  # Read in chunks of 1 MB
                if not buf:  # Break the loop if no more data is read
                    break
                fdst.write(buf)
                pbar.update(len(buf))  # Update the progress bar
"""

def copy_folder_from_usb(usb_base_path, destination_base_path):
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
                    if os.path.exists(dest_item):
                        print(f"{item} already exists in {final_destination_path}")
                        continue
                    try:
                        if os.path.isdir(source_item):
                            shutil.copytree(source_item, dest_item, dirs_exist_ok=True)
                        else:
                            shutil.copy2(source_item, final_destination_path)
                            #copy_file_with_progress(source_item, dest_item)

                            if system in ['psx', 'dreamcast', 'psp']:
                                if item.endswith('.zip') or item.endswith('.7z'):
                                    extract_file(dest_item, final_destination_path)
                        print(f"Successfully moved {system} game {item} to {final_destination_path}")
                    except Exception as e:
                        print(f"Error moving {item} for {system}: {e}")
                chown_command = ['sudo', 'chown', '-R', 'rpiarcade:rpiarcade',final_destination_path] 
                subprocess.run(chown_command, check = True)

                # Clean up the temporary destination_path after moving items
                #print(f"Successfully moved {system} games to {final_destination_path}")
            except Exception as e:
                print(f"Error while copying {system}: {e}")
        else:
            print(f"{system} not found on USB")



def device_event(device):
    global stop_script
    if device.action == 'add' and 'part' in device.device_type:
            print(f"USB device {device.device_node} inserted.")
            device_path = f'{device.device_node}'
            mount_point = '/mnt/usb'
            mount_command = ['sudo', 'mount', device_path, mount_point]
            unmount_command = ['sudo', 'umount', mount_point]
            try:
                subprocess.run(mount_command, check=True)
                print("Mount Success")
                copy_folder_from_usb(os.path.join(mount_point,'RetroPie'),'/home/rpiarcade/RetroPie/roms' )
                
                
                subprocess.run(unmount_command, check=True)
                print("Unmount Successful, safe to remove USB")
                
            except subprocess.CalledProcessError as e:
                print(f"An error has occurred: {e}")
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


