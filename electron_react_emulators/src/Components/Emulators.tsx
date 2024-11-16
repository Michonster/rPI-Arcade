import React, { useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";


import "./emulators.css";
// import StringDecor from '../assets/StringDecorSVG.tsx';
import logo from '../../public/images/Logo.png';
import pixelPanel from '../../public/images/pixelPanel.png';
import backdrop from '../../public/images/backdrop.png';
import TextAlongPath from "../assets/waveTop.tsx";
import TextAlongPathBot from "../assets/waveBottom.tsx";

import boxData from "../../public/emu.json";

const Emulators: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const totalBoxes = boxData.length;
  const navigate = useNavigate(); 

  const handleRightClick = () => {
    setPosition((prev) => (prev > 0 ? prev - 1 : totalBoxes - 1));
  };

  const handleLeftClick = () => {
    setPosition((prev) => (prev < totalBoxes - 1 ? prev + 1 : 0));
  };

  const handleBackToTitle = () => {
    navigate("/"); // Navigate back to title screen
  };

  return (

    <div className="emulators">
      <img src={backdrop} alt="backdrop" className='backDrop' />
      {/* Top Section */}
      <div className="top">
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
        <img src={logo} alt="logo" className="logo" />
        <div className="uploadText">
          upload games 
          <br/>(flashdrive required)
          <button className="button1"> button2 </button>
        </div>
        <button className="button1" onClick={handleBackToTitle}>
            Back to Title
        </button>

      </div>
      <TextAlongPath className="stringDecor" />

      {/* Middle Section */}
      <div className="middle">
        <div className="box-container">
          {boxData.map((box, index) => {
            const offset = (index - position + totalBoxes) % totalBoxes;

            // Start angle from +90 degrees (Math.PI/2) so the active item is at bottom center
            const angle = ((offset / totalBoxes) * 2 * Math.PI) + Math.PI / 2;

            // Use different radii for x and y to create an elliptical path
            const xRadius = 500; // Larger radius for horizontal spread
            const yRadius = 50;  // Smaller radius for vertical spread

            // Calculate positions using elliptical coordinates
            const xPosition = xRadius * Math.cos(angle);
            const yPosition = yRadius * Math.sin(angle);
            let scale = 1;
            let zIndex = 1;
            const maxZIndex = totalBoxes; // Set maxZIndex to total number of boxes

            if (offset === 0) {
              scale = 1.2;
              zIndex = maxZIndex; // Highest zIndex for the active box
            } else if (offset === 1 || offset === totalBoxes - 1) {
              scale = 1;
              zIndex = maxZIndex - 1; // Second highest zIndex
            } else {
              // For other boxes, calculate zIndex based on their offset
              const relativePosition = Math.abs(offset - Math.floor(totalBoxes / 2));
              zIndex = relativePosition - maxZIndex - 2;
              // Calculate scale based on zIndex and clamp the value between 0.4 and 0.8
              scale = Math.min(0.85, Math.max(0.5, 1 - zIndex * -0.02));
            }

            return (
              <motion.div
                key={index}
                className={`box ${offset === 0 ? 'active' : ''}`}
                animate={{
                  zIndex: zIndex,
                  x: xPosition,
                  y: yPosition,
                  scale: scale,

                }}
                transition={{
                  type: "spring",
                  stiffness: 600,
                  damping: 60,
                }}
              >
                {/* Emu {box} */}

                {/* Render image and text */}
                <img src={box.image} alt={`Box ${index + 1}`} />
                <p className="boxText">{box.text}</p>

              </motion.div>
            );
          })}
        </div>

        <div className="button-container">
          <button className="left-button" onClick={handleLeftClick} />
          <button className="right-button" onClick={handleRightClick} />
        </div>

      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelBot" />
        <TextAlongPathBot className="stringDecorBot" />

        <div className="text">
          <div className="buttonDesc">
            <p className="desc"> Press </p>
            <button className="button1"> button1 </button>
            <p> for </p>
          </div>

          <p className="title">Emulator Details</p>

          
        </div>
        
        <p className="RCOS">RCOS Project</p>

      </div>
    </div>



  );
}

export default Emulators;
