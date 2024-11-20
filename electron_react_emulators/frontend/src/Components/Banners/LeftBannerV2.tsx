import { motion } from "framer-motion";

import pixelPanel from "/images/pixelPanel.png";
import StringDecorBackup from "../../assets/stringDecorBackup.js";
// import logo from "/images/Logo.png";

import './Banners.css';

const LeftBannerV2 = () => {
  return (
    <motion.div
      className="bannerWrapper"
      initial={{ rotate: 0, translateY: 0, translateX: 0 }} // Initial position
      animate={{ rotate: -90, translateY: "50vh", translateX: "-50%" }} // Center the component on the left side
      transition={{
        duration: 0.5, 
        ease: "easeOut",
      }}
      style={{
        transformOrigin: "center",
        position: "fixed",
        height: "auto",
        translateX: "-50%",
      }}
    >
      <img src={pixelPanel} alt="pixel panel" className="pixelPanelLeft" />
      <StringDecorBackup className="stringDecorBackup" />
      {/* <img src={logo} alt="logo" className="logo" /> */}
    </motion.div>
  );
};

export default LeftBannerV2;
