import subprocess
import os

deleting = True
game_systems = ['nes', 'n64', 'snes', 'dreamcast', 'psp', 'psx', 'nds', 'megadrive']

while True:
    print("\n0 :  Exit deletion")
    for i in range(len(game_systems)):
        print(i+1, ": ", game_systems[i])

    print(len(game_systems)+2, ": Delete All Games")
    emu = int(input("Select which emulator you wish to delete games from: "))
    if emu == 0:
        break
    elif emu>len(game_systems)+1 or emu<0:
        continue
    elif emu==len(game_systems)+1:
        check = input("Are you sure you want to delete all games")
        if check == 'y':
            check = input("Are you really sure? ")
            if check == 'y':
                check = input("Theres no going back after this")
                if check == 'y':
                    print("Ok, you asked for it. Nuking all games now")
                    for system in game_systems:
                        path = os.path.join("/home/rpiarcade/RetroPie/roms/", system)
                        for game in games:
                            game_path = os.path.join(path, game)
                            os.remove(game_path)
                    print("All games deleted.")

                else:
                    continue
            else:
                continue
        else:
            continue
    system = game_systems[emu-1]
    path = os.path.join("/home/rpiarcade/RetroPie/roms/", system)
    inemu = True
    while inemu:
        games = []
        for game in os.listdir(path):
            if game.endswith(".zip") or game.endswith(".7z"):
                base_game_name = game.split('(')[0].rsplit('.', 1)[0]
                games.append(game)
                if len(games) ==1:
                    print("\n0 :  Back to Emulator Screen")
                print(len(games), ": ", base_game_name)
        
        if not games:  # Check if there are no games
            print("No games found in this directory.\n")
            inemu=False
            break 

        print(len(games)+1, " :  Clear All")
        
        rom = int(input("Select which rom you wish to delete: "))
        if rom == 0:  
            print("Returning to Emulator Screen")
            inemu=False
            break
        elif 1 <= rom <= len(games):  # Valid game selection
            game_to_delete = games[rom - 1]
            game_path = os.path.join(path, game_to_delete)
            os.remove(game_path)
            base_game_name = game_to_delete.split('(')[0].rsplit('.', 1)[0]
            for file in os.listdir(path):
                if file.startswith(base_game_name):
                    file_path = os.path.join(path, file)
                    os.remove(file_path)
            print(f"{base_game_name} has been deleted.")

        elif rom == len(games):
            print(f"\nDeleting all games in {system}...")
            for game in games:
                game_path = os.path.join(path, game)
                os.remove(game_path)
            print("All games deleted.")
            inemu=False
            break
        else:
            print("Invalid selection")
