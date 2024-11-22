import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Emulators from './Emulators';
import DetailsMain from './Details/DetailsMain.js';
import Flashdrive from './Flashdrive/Flashdrive.tsx';
import backdrop from "/images/backdrop.png";
// import TopBanner from './Banners/TopBanner.tsx';
// import BotBanner from './Banners/BotBanner.tsx'

import boxData from "../emuData.json";

function App() {
  const [selectedEmu, setSelectedEmu] = useState<number | null>(null); // for getting to details screen
  const [position, setPosition] = useState<number>(0); // in order to preserve position after returning to selection screen

  const handleEmuClick = (position: number) => {
    if (boxData.length > position) { // if box does not exist in the emulator data
      setSelectedEmu(position);
    }

  };

  return (
    <>
      <img src={backdrop} alt="backdrop" className="backDrop" />
      {/* <TopBanner /> */}
      {/* <BotBanner/> */}

      <Router>
        <Routes>
          {/* Main Emulator selection screen */}
          <Route
            path="/"
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