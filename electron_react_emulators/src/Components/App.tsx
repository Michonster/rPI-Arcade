import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Emulators from './Emulators';
import DetailsMain from './Details/DetailsMain.js';
import Flashdrive from './Flashdrive/Flashdrive.tsx';

import boxData from "../emu.json";

function App() {
  const [selectedEmu, setSelectedEmu] = useState<number | null>(null);

  const handleEmuClick = (position: number) => {
    setSelectedEmu(position);
  };

  return (
    <Router>
      <Routes>
        {/* Main Emulator selection screen */}
        <Route
          path="/"
          element={<Emulators onEmuClick={handleEmuClick} />}
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
  );
}

export default App;