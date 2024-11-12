import React from 'react';
import pixelPanel from '/images/pixelPanel.png';
import StringDecorBackup from "../../assets/stringDecorBackup.js"

import "./Flashdrive.css"

const Flashdrive: React.FC = () => {
  return (
    <div className='flashdrive-page'>
      {/* TOP */}
      <div className='top'>
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
        <StringDecorBackup className="stringDecorBackup" />
      </div>
      {/* MIDDLE */}
      <div className='middle'>
        <p>
          INSERT YOUR FLASHDRIVE
        </p>
      </div>

      {/* BOTTOM */}

    </div>
  );
};

export default Flashdrive;
