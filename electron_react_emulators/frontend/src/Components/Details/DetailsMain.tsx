import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Cube from './Cube';

import TopBanner from '../Banners/TopBanner.tsx';
import './DetailsMain.css';
import Mario64 from '/images/Mario64.gif';
import Link64 from '/images/Link64.gif'

import emuData from '../../emuData.json';

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
  const navigate = useNavigate(); 

  const goBack = () => {
    navigate('/');
  };

  const [emulators] = useState<Emulator[]>(emuData);
  const [selectedEmulator, setSelectedEmulator] = useState<Emulator | null>(null);

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
      <TopBanner />
      <button className ="buttonCircle" onClick={goBack} >Back</button>
      <img className ="Mario" src={Mario64} alt="Mario 64" />
      <img className ="Link" src={Link64} alt="Link64" />


      {/* Canvas for 3D content */}
      <Canvas className="canvas-container">
        <ambientLight intensity={2} />
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
            <ul className = "actual_games" style={{ listStyleType: 'none' }}>
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