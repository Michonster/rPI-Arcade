import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./Emulators.css";
import backdrop from "/images/backdrop.png";
import pixelPanel from "/images/pixelPanel.png";
import StringDecorBackup from "../assets/stringDecorBackup.js";

import emuData from "../emuData.json";

interface EmulatorsProps {
  onEmuClick: (position: number) => void;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

const Emulators: React.FC<EmulatorsProps> = ({
  onEmuClick,
  position,
  setPosition,
}) => {
  const navigate = useNavigate();

  const addGamesBox = {
    image: "",
    text: "ADD GAMES",
  };
  const allEmuData = [...emuData, addGamesBox]; //concat addGamesBox
  const totalBoxes = allEmuData.length;

  const handleRightClick = () => {
    setPosition((prev) => (prev < totalBoxes - 1 ? prev + 1 : 0));
  };

  const handleLeftClick = () => {
    setPosition((prev) => (prev > 0 ? prev - 1 : totalBoxes - 1));
  };

  const handleEmulatorSelection = () => {
    onEmuClick(position);
    navigate("/details");
  };

  const handleFlashdriveSelection = () => {
    navigate("/flashdrive");
  };

  return (
    <div className="emulators">
      <img src={backdrop} alt="backdrop" className="backDrop" />
      
      {/* Middle Section =====================================================*/}
      <div className="middle">
        <div className="box-container">
          {allEmuData.map((box, index) => {
            const offset = (position - index + totalBoxes) % totalBoxes;

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
                className={`box ${offset === 0 ? "active" : ""}`}
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
                {/* only Add Game box gets different styling */}
                {index === totalBoxes - 1 ? (
                  <p className="addGamesBox">
                    ★ {box.text} ★
                    <p style={{ textAlign: "left" }}>
                      REQUIRED: &nbsp;&nbsp;&nbsp;flashdrive +
                      &nbsp;&nbsp;&nbsp;proper format Select to see format.
                    </p>
                  </p>
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
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelBot" />
        {/* <TextAlongPathBot className="stringDecorBot" /> */}
        <StringDecorBackup className="stringDecorBackupBot" />

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
        <p className="RCOS">RCOS Project</p>
      </div>
    </div>
  );
};

export default Emulators;
