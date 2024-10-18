import React, { useState } from "react";
import { motion } from 'framer-motion';

import "./startup.css";
import vid from '../assets/rpi_arcade4.mp4';
import logo from '../assets/Logo.png';
import pixelPanel from '../assets/pixelPanel.png';
import backdrop from '../assets/backdrop.png';
import TextAlongPath from "../assets/textAlongPath.tsx";

//have a startup screen that plays vid before going to a title screen
const Startup = () => {
    const [showTitle, setShowTitle] = useState(false);

    const handleVideoEnd = () => {
        console.log("Video ended, showing title screen");
        setShowTitle(true);
    };

    return (
        <div className="startup">
            {!showTitle ? ( //play the video first
                <video autoPlay onEnded={handleVideoEnd}>
                    <source src={vid} type="video/mp4" />
                </video>
            ) : ( //if the intro already played, show title screen
                <div className="title">
                    <img src={backdrop} alt="backdrop" className='backDrop' />
                    {/* Top Section */}
                    <div className="top">
                        <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
                        <img src={logo} alt="logo" className="logo" />
                    </div>
                    <TextAlongPath className="stringDecor" />

                    {/* Title Section */}
                    <div className="middle">
                        <h1>rPi Arcade</h1>
                        <h2>An RCOS Project</h2>
                    </div>

                    {/* Bottom Section */}
                    <div className="bottom">
                        <img src={pixelPanel} alt="pixel panel" className="pixelPanelBot" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Startup;