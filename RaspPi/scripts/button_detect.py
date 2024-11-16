import pygame

DEAD_ZONE = 0.2  # Define a dead zone for joystick axes

#variables to track joystick holding
is_holding_right = False
is_holding_left = False
is_holding_up = False
is_holding_down = False

#maps button numbers to correct symbol
def map_button(event_button):
    button_map = {
        4: 'Y', 5: 'X', 2: 'LT', 3: 'RT',
        1: 'B', 7: 'A', 6: 'LB', 0: 'RB',
        8: 'Select', 9: 'Start'
    }
    return button_map.get(event_button, f"Unknown ({event_button})")

#checks position of the joystick
def handle_axis_motion(axis, value):
    global is_holding_right, is_holding_left, is_holding_up, is_holding_down
    if axis == 0:  # X-axis
        # Right direction
        if value > 0.5:
            if not is_holding_right: 
                print("Joystick held right")
                is_holding_right = True
            is_holding_left = False  

        # Left direction
        elif value < -0.5:
            if not is_holding_left:  
                print("Joystick held left")
                is_holding_left = True
            is_holding_right = False  

        # Neutral position (release)
        elif abs(value) < DEAD_ZONE:
            if is_holding_right or is_holding_left:
                print("Joystick released")
            is_holding_right = False
            is_holding_left = False
    if axis == 1:  # Y-axis
        # Down direction
        if value > 0.5:
            if not is_holding_down:  
                print("Joystick held down")
                is_holding_down = True
            is_holding_up = False  

        # Up direction
        elif value < -0.5:
            if not is_holding_up:  
                print("Joystick held up")
                is_holding_up = True
            is_holding_down = False  

        # Neutral position (release)
        elif abs(value) < DEAD_ZONE:
            if is_holding_up or is_holding_down:
                print("Joystick released")
            is_holding_up = False
            is_holding_down = False

def main():
    pygame.init()
    pygame.joystick.init()
    
    if pygame.joystick.get_count() == 0:
        print("No joystick detected. Please connect your arcade controller.")
        return

    joystick = pygame.joystick.Joystick(0)
    joystick.init()

    print(f"Joystick detected: {joystick.get_name()}")
    print(f"Number of axes: {joystick.get_numaxes()}")
    print(f"Number of buttons: {joystick.get_numbuttons()}")

    try:
        while True:
            for event in pygame.event.get():
                #button press
                if event.type == pygame.JOYBUTTONDOWN:
                    button = map_button(event.button)
                    print(f"{button} Button pressed")
                #button release
                elif event.type == pygame.JOYBUTTONUP:
                    button = map_button(event.button)
                    print(f"{button} Button released")
                #joystick movement
                elif event.type == pygame.JOYAXISMOTION:
                    handle_axis_motion(event.axis, event.value)
                elif event.type == pygame.QUIT:
                    print("Exiting...")
                    return

    except KeyboardInterrupt:
        print("Exiting...")

    finally:
        pygame.quit()

if __name__ == "__main__":
    main()
