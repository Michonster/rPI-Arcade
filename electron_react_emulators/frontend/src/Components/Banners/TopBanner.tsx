import { motion } from "framer-motion";

import pixelPanel from "/images/pixelPanel.png";
import StringDecorBackup from "../../assets/stringDecorBackup.js";
import logo from "/images/Logo.png";

import './Banners.css'

const TopBanner = () => {
  return (
    <motion.div
      className="bannerWrapper"
      initial={{ translateY: "-30%" }}
      animate={{ translateY: 0 }}
      transition={{
        duration: 0.5,
        ease: "backOut",
      }}
      style={{position: "absolute"}}
    >
      <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
      <StringDecorBackup className="stringDecorBackup" />
      <img src={logo} alt="logo" className="logo" />
    </motion.div>
  );
};

export default TopBanner;
