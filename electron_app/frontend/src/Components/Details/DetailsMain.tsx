import React, { useState, useEffect, useRef } from "react";
import Rotate from "./Rotating_Image";
import "./DetailsMain.css";
// import pixelPanel from "/images/pixelPanel.png";
import Mario64 from "/images/Mario64.gif";
// import Sonic_Run_Right from "/images/DreamCast_Moving_Right.gif";
// import Sonic_Run_Left from "/images/DreamCast_Moving_Left.gif";
import { useNavigate } from "react-router-dom";
import LeftBanner from "../Banners/LeftBanner";
import RightBanner from "../Banners/RightBanner";

import emuData from '../../emuData.json';

import { useController } from "../ControllerContext";

// Define the shape of each emulator object
interface Emulator {
  text: string;
  description: string;
  image: string;
  games: string[];
  gif1: string;
  gif2: string;
  idle: string;
}

// Define props for the DetailsMain component
interface DetailsMainProps {
  emulatorName: string;  // Emulator name passed as a prop
}

const DetailsMain: React.FC<DetailsMainProps> = ({ emulatorName }) => {
  const navigate = useNavigate();
  const { registerButtonHandler } = useController();

  const goBack = () => {
    navigate('/emulators');
  };

  useEffect(() => {
    registerButtonHandler("x", goBack);
  }, [registerButtonHandler]);


  const [emulators] = useState<Emulator[]>(emuData);
  const [selectedEmulator, setSelectedEmulator] = useState<Emulator | null>(null);

  const [GifPosition, setGifPosition] = useState(0); // Image horizontal position
  const [currentDirection, setCurrentDirection] = useState<"right" | "left">("right"); // Movement direction
  const [gifImage, setGifImage] = useState(selectedEmulator?.gif1 ?? "/path/to/fallback-image.webp"); // Image

  const directionRef = useRef(currentDirection);
  directionRef.current = currentDirection;

  // Update selectedEmulator when emulatorName changes
  useEffect(() => {
    if (emulatorName) {
      const emulator = emulators.find(
        (em) => em.text.toLowerCase() === emulatorName.toLowerCase()
      );
      setSelectedEmulator(emulator || null);
    }
  }, [emulatorName, emulators]);

  // Update gifImage when selectedEmulator or currentDirection changes
  useEffect(() => {
    setGifImage(
      currentDirection === "right"
        ? selectedEmulator?.gif1 ?? "/path/to/fallback-image.webp"
        : selectedEmulator?.gif2 ?? "/path/to/fallback-image.webp"
    );
  }, [selectedEmulator, currentDirection]);

  // Animation logic
  useEffect(() => {
    let animationId: number;
    const animateGif = () => {
      setGifPosition((prev) => {
        if (directionRef.current === "right") {
          if (prev >= (window.innerWidth / 2) - 5) {
            setCurrentDirection("left"); // Update direction in state
            return prev - 2; // Start moving left
          }
          return prev + 2; // Move right
        } else {
          if (prev <= 2) {
            setCurrentDirection("right"); // Update direction in state
            return prev + 2; // Start moving right
          }
          return prev - 2; // Move left
        }
      });
      animationId = requestAnimationFrame(animateGif);
    };

    animationId = requestAnimationFrame(animateGif);
    return () => cancelAnimationFrame(animationId); // Cleanup on unmount
  }, [currentDirection]); // Re-run effect when currentDirection changes

  return (
    <div className="Main_Div">
      <LeftBanner />
      <RightBanner />
      {/* <img className="Side1" src={pixelPanel} alt="S1" /> */}
      {/* <img className="Side2" src={pixelPanel} alt="S2" /> */}
      <button className="back_button" onClick={goBack}>
        Back
      </button>
      <img className="Mario" src={selectedEmulator?.idle ?? "/path/to/fallback-image.webp"} alt="Mario 64" />

      {/* GIF */}  
      <img
        className="Gif"
        src={gifImage}
        alt="Gift"
        style={{ left: `${GifPosition}px` }}
      />

      {/* Canvas for 3D content */}

      {/* <Canvas className="canvas-container">
        <ambientLight intensity={2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="red" intensity={1} />
        <Cube
          src={selectedEmulator?.image ?? "/path/to/fallback-image.webp"} // in case no img found
        />
         <Rotate src={selectedEmulator?.image ?? "/path/to/fallback-image.webp"} />
      </Canvas> */}
      <div className="canvas-container">
        <Rotate src={selectedEmulator?.image ?? "/path/to/fallback-image.webp"} />
      </div>
      {/* Display emulator information if found */}
      {selectedEmulator ? (
        <>
          <div className="emulator_summary">
            <p>{selectedEmulator.description}</p>
          </div>
          <div className="game_recommendations">
            <h1 className="creator_header">Creator Recommendations</h1>
            <ul
              className="actual_games"
              style={{ listStyleType: "none" }}
            >
              {selectedEmulator.games.map((game, index) => (
                <li key={index}>{game}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>No emulator selected or emulator not found.</p>
      )}
    </div>
  );
};

export default DetailsMain;