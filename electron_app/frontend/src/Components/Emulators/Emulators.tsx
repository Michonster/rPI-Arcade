import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./Emulators.css";
import TopBanner from '../Banners/TopBanner.tsx';
import BotBanner from '../Banners/BotBanner.tsx';
import logo from "/images/Logo.png";

import emuData from "../../assets/emuData.json";

import { useController } from "../ControllerContext";

// Type Definitions ==========================
interface EmulatorsProps {
  onEmuClick: (position: number) => void;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

interface ElectronAPI {
  startEmulationStation: () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
// ===========================================

const Emulators: React.FC<EmulatorsProps> = ({
  onEmuClick,
  position,
  setPosition,
}) => {
  const navigate = useNavigate();
  const { registerHandler, registerButtonHandler } = useController();

  const addGamesBox = {
    image: "",
    text: "ADD GAMES",
  };

  const playGamesBox = {
    image: "/images/emustation.png",
    text: "LAUNCH"
  };

  const allEmuData = [...emuData, addGamesBox, playGamesBox]; //concat addGamesBox
  const totalBoxes = allEmuData.length;

  // Register joystick handlers for this page
  useEffect(() => {
    registerHandler("left", handleLeftClick);
    registerHandler("right", handleRightClick);
    if (position === totalBoxes - 1) {
      // console.log("flashdrive reg")
      registerButtonHandler("X", handleFlashdriveSelection);
    } else if (position === 0) {
      // console.log("play reg")
      registerButtonHandler("X", handlePlaySelection);
    }
    else {
      // console.log("register for emu")
      registerButtonHandler("X", handleEmulatorSelection);
    }
  }, [position, registerHandler, registerButtonHandler]);

  const handleRightClick = () => {
    setPosition((prev) => (prev < totalBoxes - 1 ? prev + 1 : 0));
  };

  const handleLeftClick = () => {
    setPosition((prev) => (prev > 0 ? prev - 1 : totalBoxes - 1));
  };

  const handleEmulatorSelection = () => {
    // console.log(position - 1)
    onEmuClick(position - 1);
    navigate("/details");
  };

  const handleFlashdriveSelection = () => {
    navigate("/flashdrive");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  // Stop app and open EmulationStation; sends command to Electron backend via IPC
  const handlePlaySelection = () => {
    console.log("sending msg")
    window.electronAPI.startEmulationStation();
    console.log("returning from sending msg")
  };

  return (
    <div className="emulators">
      <TopBanner />
      <BotBanner />
      {/* This logo is invisible & just for testing purposes; on click, returns to startup screen. */}
      <img src={logo} alt="logo" className="logo" style={{ opacity: 0, zIndex: "99" }} onClick={handleLogoClick} />
      {/* Middle Section =====================================================*/}
      <div className="middle">
        <div className="carousel">
          {allEmuData.map((box, index) => {
            const offset = (position - index - 1 + totalBoxes) % totalBoxes;

            // Start angle from +90 degrees (Math.PI/2) so the active item is at bottom center
            const angle = (offset / totalBoxes) * 2 * Math.PI + Math.PI / 2;

            // Radii x and y for the elliptical path
            const xRadius = 500; // horizontal
            const yRadius = 50; // vertical

            // Calculate positions using elliptical coordinates
            const xPosition = xRadius * Math.cos(angle);
            const yPosition = yRadius * Math.sin(angle);
            let scale = 1;
            let zIndex = 1;
            const maxZIndex = totalBoxes; // Set maxZIndex to total number of boxes

            // The closer the box is to the center, the larger it is
            if (offset === 0) {
              scale = 1.2;
              zIndex = maxZIndex;
            } else if (offset === 1 || offset === totalBoxes - 1) {
              scale = 1;
              zIndex = maxZIndex - 1;
            } else {
              // For other boxes, calculate zIndex based on their offset
              const relativePosition = Math.abs(
                offset - Math.floor(totalBoxes / 2)
              );
              zIndex = relativePosition - maxZIndex - 2;
              // Calculate scale based on zIndex and clamp the value between 0.4 and 0.8
              scale = Math.min(0.85, Math.max(0.5, 1 - zIndex * -0.02));
            }

            return (
              <motion.div
                key={index}
                className={`box ${offset === 0 ? "active" : ""} ${index === totalBoxes - 2 || index === totalBoxes - 1 ? "borderCustom" : ""}`}
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
                {/* Render all boxes. Note that certain boxes like addGamesBox and launchGamesBox
                    are special so they get their own styles. */}
                {index === totalBoxes - 2 ? (
                  <div className="addGamesBox">
                    <p style={{ margin: "0" }}> ★ {box.text} ★ </p>
                    <p style={{ textAlign: "left", fontSize: "24px", margin: "5% 0 0 0" }}>
                      REQUIRED: &nbsp;&nbsp;&nbsp;flashdrive +
                      &nbsp;&nbsp;&nbsp;proper format Select to see format.
                    </p>
                  </div>
                ) : index === totalBoxes - 1 ? (
                  <div className="launchGamesBox">
                    <p style={{ margin: "0" }}> ★ {box.text} ★ </p>
                    <p style={{ margin: 0 }}> GAME MENU </p>
                    <img src={box.image} alt={`Box ${index + 1}`} />
                  </div>
                ) : (
                  <>
                    <img src={box.image} alt={`Box ${index + 1}`} />
                    <p className="boxText">{box.text}</p>
                  </>
                )}
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

        <div className="text">
          {position === totalBoxes - 1 ? (
            <>
              <div className="buttonDesc">
                <p> Press </p>
                <button
                  className="buttonCircle"
                  onClick={handleFlashdriveSelection}
                >
                  button
                </button>
                <p> to access </p>
              </div>
              <p className="title">Flashdrive Details & Upload Games</p>
            </>
          ) : position === 0 ? (
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <div className="buttonDesc">
                <p> Press </p>
                <button
                  className="buttonCircle"
                  onClick={handlePlaySelection}
                >
                  button
                </button>
                <p> to </p>
              </div>
              <p className="title">PLAY</p>
            </div>
          ) : (
            <>
              <div className="buttonDesc">
                <p> Press </p>
                <button
                  className="buttonCircle"
                  onClick={handleEmulatorSelection}
                >
                  button
                </button>
                <p> for </p>
              </div>
              <p className="title">Emulator Details</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emulators;
