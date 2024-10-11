import React, { useState } from "react";
import { motion } from 'framer-motion';


import "./emulators.css";
// import StringDecor from '../assets/StringDecorSVG.tsx';
import logo from '../assets/Logo.png';
import pixelPanel from '../assets/pixelPanel.png';
import backdrop from '../assets/backdrop.png';


import TextAlongPath from "../assets/textAlongPath.tsx";


const boxData = [1, 2, 3, 4, 5];

const Emulators = () => {
  const [position, setPosition] = useState<number>(2); // Track which box is in the center

  const handleLeftClick = () => {
    setPosition((prev) => (prev > 0 ? prev - 1 : prev + boxData.length - 1)); // Move left
  };

  const handleRightClick = () => {
    setPosition((prev) => (prev < boxData.length - 1 ? prev + 1 : prev - boxData.length + 1)); // Move right
  };

  return (

    <div className="emulators">
      <img src={backdrop} alt="backdrop" className='backDrop' />
      {/* Top Section */}
      <div className="top">
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
        <img src={logo} alt="logo" className="logo" />
      </div>
      <TextAlongPath className="stringDecor"/>

      {/* Middle Section */}
      <div className="middle">
        <motion.div
          className="box-container"
          initial={false}
          animate={{ x: `calc(50vw - ${position * 220 + 160}px)` }} // Center the active box by adjusting the x value
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {boxData.map((box, index) => (
            <motion.div
              key={index}
              className={`box ${index === position ? "active" : ""}`}
            >
              Emu {box}
            </motion.div>
          ))}
        </motion.div>

        <div className="button-container">
          <button className="left-button" onClick={handleLeftClick} />
          <button className="right-button" onClick={handleRightClick} />
        </div>

      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelBot" />

        <div className="text">
          <div className="buttonDesc">
            <p className="desc"> Press </p>
            <button className="button1"> Button 1</button>
            <p> for </p>
          </div>

          <p className="title">Emulator Details</p>
        </div>

      </div>
    </div>



  );
}

export default Emulators;
