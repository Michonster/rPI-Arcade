// import React, { useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import Cube from './Cube';
// import './DetailsMain.css';
// import pixelPanel from '/images/pixelPanel.png';
// import Mario64 from '/images/Mario64.gif';
// import Link64 from '/images/Link64.gif'

// import Sonic_Run_Right from '/images/DreamCast_Moving_Right.gif'
// import Sonic_Run_Left from '/images/DreamCast_Moving_Right.gif'



// // Define the shape of each emulator object
// interface Emulator {
//   text: string;
//   description: string;
//   image: string;
//   games: string[];
// }


// // Define props for the DetailsMain component
// interface DetailsMainProps {
//   emulatorName: string;  // Emulator name passed as a prop
//   goBack: () => void;

// }

// const DetailsMain: React.FC<DetailsMainProps> = ({ emulatorName , goBack }) => {
//   const [emulators, setEmulators] = useState<Emulator[]>([]);
//   const [selectedEmulator, setSelectedEmulator] = useState<Emulator | null>(null);

//   useEffect(() => {
//     fetch("./emulator_info.json")
//       .then((response) => response.json())
//       .then((data: Emulator[]) => setEmulators(data))
//       .catch((error) => console.error("Error loading JSON:", error));
//   }, []);

//   useEffect(() => {
//     if (emulatorName) {
//       const emulator = emulators.find(
//         (em) => em.text.toLowerCase() === emulatorName.toLowerCase()
//       );
//       setSelectedEmulator(emulator || null);
//     }
//   }, [emulatorName, emulators]);

//   return (
//     <div className="Main_Div">
//       <img className ="Side1" src={pixelPanel} alt="S1" />

//       <img className ="Side2" src={pixelPanel} alt="S2" />

//       <button className ="back_button" onClick={goBack} >Back</button>
//       <img className ="Mario" src={Mario64} alt="Mario 64" />
//       <img className ="Link" src={Sonic_Run_Right} alt="Link64" />


//       {/* Canvas for 3D content */}
//       <Canvas className="canvas-container">
//         <ambientLight intensity={2} />
//         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//         <pointLight position={[-10, -10, -10]} color="red" intensity={1} />
//         <Cube src={selectedEmulator?.image ?? '/path/to/fallback-image.webp'} /> {/* in case no img found */}

//       </Canvas>

//       {/* Display emulator information if found */}
//       {selectedEmulator ? (
//         <>
//           <div className="emulator_summary">
//             <p>{selectedEmulator.description}</p>
//           </div>
//           <div className="game_recommendations">
//             <h1 className="creator_header">Creator Recommendations</h1>
//             <ul className = "actual_games" style={{ listStyleType: 'none' }}>
//               {selectedEmulator.games.map((game, index) => (
//                 <li key={index}>{game}</li>
//               ))}
//             </ul>
//           </div>

//         </>
//       ) : (
//         <p>No emulator selected or emulator not found.</p>
//       )}

//     </div>
//   );
// };

// export default DetailsMain;

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import "./DetailsMain.css";
import pixelPanel from "/images/pixelPanel.png";
import Mario64 from "/images/Mario64.gif";
import Link64 from "/images/Link64.gif";
import Sonic_Run_Right from "/images/DreamCast_Moving_Right.gif";
import Sonic_Run_Left from "/images/DreamCast_Moving_Left.gif";

// Define the shape of each emulator object
interface Emulator {
  text: string;
  description: string;
  image: string;
  games: string[];
}

// Define props for the DetailsMain component
interface DetailsMainProps {
  emulatorName: string; // Emulator name passed as a prop
  goBack: () => void;
}

const DetailsMain: React.FC<DetailsMainProps> = ({ emulatorName, goBack }) => {
  const [emulators, setEmulators] = useState<Emulator[]>([]);
  const [selectedEmulator, setSelectedEmulator] = useState<Emulator | null>(null);
  const [sonicPosition, setSonicPosition] = useState(0); // Sonic's horizontal position
  const [direction, setDirection] = useState<"right" | "left">("right"); // Movement direction
  const [sonicImage, setSonicImage] = useState(Sonic_Run_Right); // Current Sonic image

  useEffect(() => {
    fetch("./emulator_info.json")
      .then((response) => response.json())
      .then((data: Emulator[]) => setEmulators(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  useEffect(() => {
    if (emulatorName) {
      const emulator = emulators.find(
        (em) => em.text.toLowerCase() === emulatorName.toLowerCase()
      );
      setSelectedEmulator(emulator || null);
    }
  }, [emulatorName, emulators]);

  useEffect(() => {
    let currentDirection = direction; // Local variable to track direction
  
    const animateSonic = () => {
      setSonicPosition((prev) => {
        if (currentDirection === "right") {
          if (prev >= (window.innerWidth / 2) - 5 ) {
            currentDirection = "left"; // Update direction locally
            setSonicImage(Sonic_Run_Left);
            return prev - 2; // Start moving left
          }
          return prev + 2; // Move right
        } else {
          if (prev <= 2) {
            currentDirection = "right"; // Update direction locally
            setSonicImage(Sonic_Run_Right);
            return prev + 2; // Start moving right
          }
          return prev - 2; // Move left
        }
      });
  
      requestAnimationFrame(animateSonic);
    };
  
    const animationId = requestAnimationFrame(animateSonic);
    return () => cancelAnimationFrame(animationId); // Cleanup on unmount
  }, []); // Empty dependency array to run only once
  
  return (
    <div className="Main_Div">
      <img className="Side1" src={pixelPanel} alt="S1" />
      <img className="Side2" src={pixelPanel} alt="S2" />
      <button className="back_button" onClick={goBack}>
        Back
      </button>
      <img className="Mario" src={Mario64} alt="Mario 64" />

      {/* Sonic GIF */}
      <img
        className="Link"
        src={sonicImage}
        alt="Sonic"
        style={{ left: `${sonicPosition}px` }}
      />

      {/* Canvas for 3D content */}
      <Canvas className="canvas-container">
        <ambientLight intensity={2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="red" intensity={1} />
        <Cube
          src={selectedEmulator?.image ?? "/path/to/fallback-image.webp"} // in case no img found
        />
      </Canvas>

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