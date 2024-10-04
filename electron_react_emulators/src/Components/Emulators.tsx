import React from "react";
import { motion } from 'framer-motion';

import "./emulators.css"
import StringDecor from '../assets/StringDecorSVG.tsx';

const Emulators = () => {
  return (
    <div className="emulators">
      <h1> Emulator Selector</h1>

      <motion.div
        style={{ display: "inline-block" }}
        initial={{ x: "-4vw" }}
        animate={{ x: "9.3vw" }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      >
        <StringDecor />
      </motion.div>



    </div>

  );
}

export default Emulators;
