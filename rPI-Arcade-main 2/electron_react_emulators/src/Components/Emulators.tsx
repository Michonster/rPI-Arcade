import React, { useState } from "react";
import { motion } from 'framer-motion';

import DetailsMain from './Details/DetailsMain.js';

import "./emulators.css";
import logo from '/images/Logo.png';
import backdrop from '/images/backdrop.png';
import pixelPanel from '/images/pixelPanel.png';
// import TopStringDecor from "../assets/TopStringDecor.tsx";
import StringDecorBackup from "../assets/stringDecorBackup.js"

import boxData from "../emu.json";

const Emulators: React.FC = () => {
  const [selectedEmu, setSelectedEmu] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const [position, setPosition] = useState<number>(0);
  const totalBoxes = boxData.length;

  const handleRightClick = () => {
    setPosition((prev) => (prev > 0 ? prev - 1 : totalBoxes - 1));
  };

  const handleLeftClick = () => {
    setPosition((prev) => (prev < totalBoxes - 1 ? prev + 1 : 0));
  };

  const handleEmuClick = () => {
    setSelectedEmu(position);
    setShowDetails(true);
  };
  const goBack = () => {
    setShowDetails(false);
  };

  return (
    <div>
      {!showDetails ? (

        <div className="emulators">
          <img src={backdrop} alt="backdrop" className='backDrop' />
          {/* Top Section =====================================================*/}


          <div className="top">
            <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
            {/* <TopStringDecor className="stringDecor" /> */}
            <StringDecorBackup className="stringDecorBackup" />
            
            <img src={logo} alt="logo" className="logo" />

            <div className="uploadText">
              upload games
              <br />(flashdrive required)
              <button className="button2"> button2 </button>
            </div>
          </div>


          {/* Middle Section =====================================================*/}
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
                  zIndex = maxZIndex;
                } else if (offset === 1 || offset === totalBoxes - 1) {
                  scale = 1;
                  zIndex = maxZIndex - 1;
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

          {/* Bottom Section =====================================================*/}
          <div className="bottom">
            <img src={pixelPanel} alt="pixel panel" className="pixelPanelBot" />
            {/* <TextAlongPathBot className="stringDecorBot" /> */}
            <StringDecorBackup className="stringDecorBackupBot" />

            <div className="text">
              <div className="buttonDesc">
                <p className="desc"> Press </p>
                <button className="button1" onClick={handleEmuClick}> button1
                </button>

                <p> for </p>
              </div>
              <p className="title">Emulator Details</p>

            </div>
            <p className="RCOS">RCOS Project</p>
          </div>
        </div>


      ) : (
        // Render the EmuDetails component with selected data
        // <EmuDetails data={selectedEmu} />
        <DetailsMain emulatorName={boxData[selectedEmu].text} goBack={goBack}/>
      )}
    </div>

  );
}

export default Emulators;