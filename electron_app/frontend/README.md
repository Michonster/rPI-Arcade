## Setting Up the Development Environment on Windows

#### Clone the Project
1. Clone this repository to your local machine.  
   ```
   git clone <repository-url>
   ```

#### Frontend setup (Powershell)
Current doesn't run properly on Ubuntu (not sure why, need to work on fixing).

2. **<ins>Important</ins>**: you'll need to download node and npm for powershell if you don't have it. Check using ```node --version``` and ```npm version```

2. To download all the frontend dependencies: 
from administrator powershell, navigate to rPi-Arcade/electron_app/frontend/  
then run ``` npm install ```

**Common errors**: 
- If powershell says that the script is not digitally signed and cannot be run, you can use this command to bypass it:
```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned```
(note to self, i need to sign it so ppl don't have to do this)

4. At this point, you should be able to run ```npm run dev``` and load the UI.


#### Backend setup

This is for being able to run the backend python scripts on your machine. I have not tested running them on powershell, and I recommend running them through Ubuntu.

These steps are for Ubuntu/WSL terminal.

5. Verify you have python3 and pip installed. 
```python3 --version```
```pip --version```
If not, install both of them with:
```sudo apt install python3```
```sudo apt install python3-pip```

6. Check what dependencies you have with pip list. To download all: 
```pip install pyudev pygame flask flask-cors flask-socketio```
(I will eventually make a requirements.txt to make this step easier)

To run the scripts, navigate to rPi-Arcade/electron_app/ 
and to run both scripts at the same time:
```make start-backend```
Check the makefile for other options of starting them (individually, or both the backend and frontend)