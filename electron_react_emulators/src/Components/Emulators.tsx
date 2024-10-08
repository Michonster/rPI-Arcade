import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';

import "./emulators.css";
import StringDecor from '../assets/StringDecorSVG.tsx';
import logo from '../assets/Logo.png';

const boxData = [1, 2, 3, 4, 5];

const Emulators = () => {
  const [position, setPosition] = useState<number>(0); // Track which box is in the center

  // Move left or right based on arrow key press
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => (prev < boxData.length - 1 ? prev + 1 : prev));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (

    <div className="emulators">
      {/* Top Section */}
      <div className="top">
        <img src={logo} alt="My PNG" className="logo" />
        <motion.div
          style={{ display: "inline-block" }}
          initial={{ x: "-4vw" }}
          animate={{ x: "9.3vw" }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
        >
          <StringDecor />
        </motion.div>
      </div>

      {/* Middle Section */}
      <div className="middle">
        <motion.div
          className="box-container"
          initial={false}
          animate={{ x: `calc(50vw - ${position * 220 + 100}px)` }} // Center the active box by adjusting the x value
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
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <p className="title">Emulator Details</p>
      </div>
    </div>



  );
}

export default Emulators;
