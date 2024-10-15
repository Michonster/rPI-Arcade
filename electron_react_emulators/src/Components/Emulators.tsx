import React, { useState } from "react";
import { motion } from 'framer-motion';


import "./emulators.css";
// import StringDecor from '../assets/StringDecorSVG.tsx';
import logo from '../assets/Logo.png';
import pixelPanel from '../assets/pixelPanel.png';
import backdrop from '../assets/backdrop.png';


import TextAlongPath from "../assets/textAlongPath.tsx";


const boxData = [1, 2, 3, 4, 5];

const Emulators: React.FC = () => {
  const [position, setPosition] = useState<number>(2);
  const totalBoxes = boxData.length;

  const handleLeftClick = () => {
    setPosition((prev) => (prev > 0 ? prev - 1 : totalBoxes - 1));
  };

  const handleRightClick = () => {
    setPosition((prev) => (prev < totalBoxes - 1 ? prev + 1 : 0));
  };

  return (

    <div className="emulators">
      <img src={backdrop} alt="backdrop" className='backDrop' />
      {/* Top Section */}
      <div className="top">
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
        <img src={logo} alt="logo" className="logo" />
      </div>
      <TextAlongPath className="stringDecor" />

      {/* Middle Section */}
      <div className="middle">
        <div className="box-container">
          {boxData.map((box, index) => {
            const offset = (index - position + totalBoxes) % totalBoxes;
            let xPosition = '0%';
            let yPosition = '0%';
            let scale = 1;
            let zIndex = 1;

            if (offset === 0) {
              yPosition = '20%';
              scale = 1.2;
              zIndex = 5;
            } else if (offset === 1 || offset === totalBoxes - 1) {
              xPosition = offset === 1 ? '80%' : '-80%';
              yPosition = '-5%';
              scale = 0.8;
              zIndex = 3;
            } else {
              xPosition = offset === 2 ? '150%' : '-150%';
              yPosition = '-30%';
              scale = 0.6;
              zIndex = 1;
            }

            return (
              <motion.div
                key={index}
                className={`box ${offset === 0 ? 'active' : ''}`}
                animate={{
                  x: xPosition,
                  y: yPosition,
                  scale: scale,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 600,
                  damping: 60
                }}
              >
                Emu {box}
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
