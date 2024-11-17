import React, { useState, useEffect, useRef } from 'react';
import pixelPanel from '/images/pixelPanel.png';
import StringDecorBackup from "../../assets/stringDecorBackup.js";
import { useNavigate } from 'react-router-dom';

import "./Flashdrive.css";

const Flashdrive: React.FC = () => {
  const navigate = useNavigate();
  const [logMessages, setLogMessages] = useState<string[]>([]); // State to store log messages
  const outputRef = useRef<HTMLDivElement>(null); // Ref for the log output container
  const [isMonitoring, setIsMonitoring] = useState(false); // State to track if monitoring started

  const handleCancel = () => {
    navigate('/');
  };

  // Function to start monitoring
  const startMonitoring = async () => {
    try {
      if (!isMonitoring) {
        await fetch("http://127.0.0.1:5000/start_usb_monitoring");
        setIsMonitoring(true);
      }
      else {
        await fetch("http://127.0.0.1:5000/stop_usb_monitoring");
        setIsMonitoring(false);
      }

    } catch (error) {
      console.error("Error toggling USB monitoring:", error);
    }
  };

  // Function to poll log messages every second
  useEffect(() => {
    if (isMonitoring) {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/get_log_messages");
          const messages: string[] = await response.json();
          setLogMessages(messages);
          // console.log(messages.length)
        } catch (error) {
          console.error("Error fetching log messages:", error);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isMonitoring]);

  return (
    <div className="flashdrive">
      {/* TOP */}
      <div className="top">
        <img src={pixelPanel} alt="pixel panel" className="pixelPanelTop" />
        <StringDecorBackup className="stringDecorBackup" />

        <div className="cancel">
          cancel &
          <br />
          return to main screen
          <button className="buttonCircle" onClick={handleCancel}> button2 </button>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="middle">
        <p>INSERT YOUR FLASHDRIVE</p>
        <button className="button" onClick={startMonitoring} >
          {isMonitoring ? "Monitoring..." : "Start Monitoring"}
        </button>

        <div ref={outputRef} className="log-output">
          {logMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>

      </div>

      {/* BOTTOM */}
      <div className="bottom">

      </div>
    </div>
  );
};

export default Flashdrive;
