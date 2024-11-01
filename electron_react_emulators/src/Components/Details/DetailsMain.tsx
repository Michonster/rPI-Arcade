import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Cube from './Cube';
import './DetailsMain.css';

// Define the shape of each emulator object
interface Emulator {
  text: string;
  description: string;
  image: string;
  games: string[];
}

// Define props for the DetailsMain component
interface DetailsMainProps {
  emulatorName: string;  // Emulator name passed as a prop
}

const DetailsMain: React.FC<DetailsMainProps> = ({ emulatorName }) => {
  const [emulators, setEmulators] = useState<Emulator[]>([]);
  const [selectedEmulator, setSelectedEmulator] = useState<Emulator | null>(null);

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

  return (
    <div className="Main_Div">
      {/* Canvas for 3D content */}
      <Canvas className="canvas-container">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="red" intensity={1} />
        <Cube src={selectedEmulator?.image ?? '/path/to/fallback-image.webp'} /> {/* in case no img found */}

      </Canvas>

      {/* Display emulator information if found */}
      {selectedEmulator ? (
        <>
          <div className="emulator_summary">
            <p>{selectedEmulator.description}</p>
          </div>
          <div className="game_recommendations">
            <h1 className="creator_header">Creator Recommendations</h1>
            <ul style={{ listStyleType: 'none' }}>
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
