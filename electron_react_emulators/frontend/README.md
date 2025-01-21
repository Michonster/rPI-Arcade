To setup development environment on Windows:
1. Clone project into your machine.
2. cd to frontend/ and run npm i
3. cd to backend/ and make sure you have Python and pip downloaded,
then check if you have pyudev & flask & flask-cors ('pip list')
  - note: backend run from WSL
  - Python script might not run in most recent version;
  - may need to downgrade to Python v3.11 (may change)
5. if no pip, run sudo apt install python3-pip
6. then for pyudev, flask, and flask-cors: pip install pyudev flask flask-cors
python3 -m pip install pygame flask-socketio


Now to run the program:
1. in WSL, in electron_react_emulators/ run make start-backend
2. in powershell, in frontend/ run npm run dev