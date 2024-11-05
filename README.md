# rPI-Arcade
![rPI-Arcade Logo](https://github.com/user-attachments/assets/9550915a-3531-4492-b64a-8d901ebc2588)

An Open-Source Arcade Cabinet for Playing Open-Source Emulators

## Open-Source Emulators Being Used
Dreamcast: [redream](https://github.com/inolen/redream) <br />
Nintendo 64: [mupen64plus](https://github.com/mupen64plus) <br />
Nintendo DS: [desmume](https://github.com/TASEmulators/desmume) <br />
Nintendo Entertainment System: [Mesen](https://github.com/SourMesen/Mesen) <br />
Playstation 1: [PCSX_ReARMed](https://github.com/libretro/pcsx_rearmed) <br />
Playstation Portable (PSP): [ppsspp](https://github.com/hrydgard/ppsspp) <br />
Sega Genesis: [Genesis-Plus-GX](https://github.com/ekeeke/Genesis-Plus-GX) <br />
Super Nintendo Entertainment System: [snes9x](https://github.com/snes9xgit/snes9x) <br />


## Open-Source Emulators To Be Tested For Use
***Use of these emulators is subject to the capabilities of the Raspberry Pi 5*** <br />
Gamecube/Wii: [Dolphin](https://github.com/dolphin-emu/dolphin) <br />


## Project Documents
[Parts and Emulator List](https://docs.google.com/spreadsheets/d/1ALpfdckvdpH38KOAA2tQCqkrMmXP1Gw3A8R0yB0zqGg/edit?usp=sharing) <br />
[Project Proposal](https://docs.google.com/document/d/1yBoYMPRjcl2UAiMpMrb5UvjlYsrBzHMLdqXjJbXgbxs/edit?usp=sharing) <br />
[Raspberry Pi OS Flashing Procedure](https://docs.google.com/document/d/1_6FRPV2-8xxY_qosx5HeV4UK3wdhwpzHxR0WtXd2Lhs/edit?usp=sharing) <br />
[Steps to SSH into Raspberry Pi](https://docs.google.com/document/d/11Dc_4-_AeuRvbQ93VxL-Q0HaXzGft7osD1K2YTPXZ6w/edit?usp=sharing) <br />
[Steps to install Retropie onto Raspberry Pi](https://docs.google.com/document/d/1LPk0pQld89WjpNxLfQ80QWkx3yFmBLrs-CT05ln_ng4/edit?usp=sharing) <br />
[Wii/Dolphin Compatibility](https://docs.google.com/spreadsheets/d/14DkemKgZ2HnjfXpCB7fWLplWL8OP-Kb9/edit?gid=944488023#gid=944488023) <br />
[Self Testing Dolphin](https://docs.google.com/document/d/1O_d6_mQBFsOLEivDqs4IXXClCTrZQ4p_IFovj7I0358/edit?tab=t.0)<br />
[Turning Off Text to Speech on RPi](https://docs.google.com/document/d/1xQ4QbP-JYJV6gKZVdu4-s-ujuNylnBXVqJO79wuMz0Y/edit?tab=t.0)<br />

## Raspberry Pi 5 Documentation <br />
**Making Script Start at Bootup:** <br />
* Edit rc.local file:<br />
  ```
  sudo nano /etc/rc.local
  ```
* Add script to be run at bootup in the rc.local file:<br />
  ```
  sudo python /home/pi/sample.py &
  ```
  - '&' must be added at the end of the script if is intended to be run infinitely/long time<br />
![Raspberry Pi Imager](https://github.com/user-attachments/assets/3fe93e41-ee08-4a33-85ef-bf2877790e9d)
