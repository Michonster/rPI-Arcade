import { motion } from "framer-motion";


import pixelPanel from "/images/pixelPanel.png";
import StringDecorBackup from "../../assets/stringDecorBackup.js";

import './Banners.css'

const BotBanner = () => {
  return (
    <motion.div
      className="bannerWrapper"
      initial={{ translateY: "20%" }}
      animate={{ translateY: 0 }}
      transition={{
        duration: 0.5,
        ease: "backOut",
      }}
      style={{position: "absolute"}}
    >
      <img src={pixelPanel} alt="pixel panel" className="pixelPanelBot" />
      {/* <TextAlongPathBot className="stringDecorBot" /> */}
      <StringDecorBackup className="stringDecorBackupBot" />
      <p className="RCOS">RCOS Project</p>
    </motion.div>
  );
};

export default BotBanner;
