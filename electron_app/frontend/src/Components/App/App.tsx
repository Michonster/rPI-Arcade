import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Emulators from '../Emulators/Emulators.tsx';
import DetailsMain from '../Details/DetailsMain.js';
import Flashdrive from '../Flashdrive/Flashdrive.tsx';
import Startup from '../Startup/Startup.tsx';
import backdrop from "/images/backdrop.png";

import boxData from "../../assets/emuData.json";

function App() {
  const [selectedEmu, setSelectedEmu] = useState<number | null>(null); // Keep track of what emu to open for the Details page
  const [position, setPosition] = useState<number>(0); // Help preserve position after returning to selection screen

  const handleEmuClick = (position: number) => {
    if (boxData.length > position) { // if box does not exist in the emulator data
      setSelectedEmu(position);
    }

  };

  return (
    <>
      <img src={backdrop} alt="backdrop" className="backDrop" />

      <Router>
        <Routes>
          {/* Startup screen */}
          <Route path="/" element={<Startup />} />

          {/* Main Emulator selection screen */}
          <Route
            path="/emulators"
            element={<Emulators onEmuClick={handleEmuClick} position={position} setPosition={setPosition} />}
          />

          {/* Details page for selected emulator */}
          <Route
            path="/details"
            element={
              selectedEmu !== null ? (
                <DetailsMain emulatorName={boxData[selectedEmu].text} />
              ) : (
                <Navigate to="/" replace /> // Redirects to main if no emulator selected
              )
            }
          />

          {/* Flashdrive page */}
          <Route
            path="/flashdrive"
            element={<Flashdrive />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;