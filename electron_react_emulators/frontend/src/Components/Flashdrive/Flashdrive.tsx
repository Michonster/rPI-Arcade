import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

import "./Flashdrive.css";
import LeftBanner from '../Banners/LeftBanner'
import Step1Instruction from './Step1Instruction';

import { useController } from "../ControllerContext";

// Connect to flaskio server for handling flashdrive insertions
const socket = io('http://127.0.0.1:5001', {
  reconnection: false, // Disable automatic reconnections
  timeout: 5000,
});

const Flashdrive: React.FC = () => {
  const navigate = useNavigate();
  const { registerButtonHandler } = useController();

  const handleCancel = () => {
    if (hasStarted.current) {
      socket.emit('STOP');
      hasStarted.current = false;
    }
    navigate('/emulators');
  };

  useEffect(() => {
    registerButtonHandler("x", handleCancel);
  }, [registerButtonHandler]);

  // handle getting messages ======================================
  const [successGames, setSuccessGames] = useState([]);
  const [duplicateGames, setDuplicateGames] = useState([]);
  const [failedGames, setFailedGames] = useState([]);

  const [logMessages, setLogMessages] = useState<string[]>([]);
  const hasStarted = useRef(false);

  // Supposed to run once when entering page
  // Is actually ran 2x, so hasStarted ref to prevent repeat

  // Prompts monitoring for flashdrives
  useEffect(() => {
    if (!hasStarted.current) {
      socket.emit('START');
      hasStarted.current = true;
    }
  }, []);

  useEffect(() => {
    // Process log messages
    const handleStatus = (data: any) => {
      setLogMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data.message];
        console.log(data.message)

        // Check for key phrases to transition steps
        if (updatedMessages.some(msg => msg.includes("USB device"))) {
          markStepComplete(1);
          setActiveStep(2);
        }

        if (updatedMessages.some(msg => msg.includes("Please remove"))) {
          markStepComplete(2);
          setActiveStep(3);
        }

        if (updatedMessages.some(msg => msg.includes("USB successfully removed."))) {
          markStepComplete(3);
          setActiveStep(4);
        }

        return updatedMessages;
      });
    };

    // Process summary
    const handleSummary = (data: any) => {
      console.log(data.type);
      console.log(data.games);

      if (data.type === "success") {
        setSuccessGames(data.games);
      } else if (data.type === "duplicate") {
        setDuplicateGames(data.games);
      } else if (data.type === "failed") {
        setFailedGames(data.games);
      }
    };

    // Process errors
    const handleConnectError = (error: Error) => {
      console.error("Connection failed:", error);
      toast.error(
        "Error: Games cannot be uploaded at this time. Please contact the RPI ARCADE team.",
        {
          onClose: () => navigate("/"),
        }
      );
    };

    const handleConnectFailed = () => {
      console.error("Connection to server failed");
      toast.error(
        "Error: Games cannot be uploaded at this time. Please contact the RPI ARCADE team.",
        {
          onClose: () => navigate("/"),
        }
      );
    };

    // Attach socket listeners
    socket.on("status", handleStatus);
    socket.on("summary", handleSummary);
    socket.on("connect_error", handleConnectError);
    socket.on("connect_failed", handleConnectFailed);

    // Cleanup listeners on unmount
    return () => {
      socket.off("status", handleStatus);
      socket.off("summary", handleSummary);
      socket.off("connect_error", handleConnectError);
      socket.off("connect_failed", handleConnectFailed);
    };
  }, []);

  // handle displaying steps ======================================
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false]);
  const [activeStep, setActiveStep] = useState(1);
  const activeStepRef = useRef(activeStep);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);


  const markStepComplete = (step: number) => {
    setCompletedSteps((prevCompletedSteps) => {
      const updatedCompletedSteps = [...prevCompletedSteps];
      updatedCompletedSteps[step - 1] = true;
      return updatedCompletedSteps;
    });
  };

  const stepTitle = [
    "Step 1: Insert your flashdrive",
    "Step 2: Wait for data processing",
    "Step 3: Remove your flashdrive",
    "Processing complete."
  ];

  return (
    <div className="flashdrive">
      <LeftBanner />
      <ToastContainer autoClose={5000} />

      {/* ============================ */}
      <motion.div
        className='buttonsSteps'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        {[1, 2, 3].map((step) => (
          <button
            key={step}
            className={`buttonStep ${activeStep === step ? 'activeStep' : ''} ${completedSteps[step - 1] ? 'completedStep' : ''}`}
          >
            {step}
          </button>
        ))}
      </motion.div>
      {/* ============================ */}

      <div className="body">
        <div className="cancel">
          <button className="buttonCircle" onClick={handleCancel}> button </button>
          cancel &
          <br />
          return to main screen
        </div>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <p style={{ alignSelf: "center" }}>{stepTitle[activeStep - 1]}</p>
        </div>

        {/* ============================ */}
        <div className="logOutput">
          {
            activeStep === 1 && <Step1Instruction />
          }
          {
            activeStep === 2 && (
              <>
                <h3 style={{ margin: 0 }}>Log Messages: </h3>
                <div className='logMsgs' style={{ fontSize: "20px" }}>
                  {logMessages.map((message, index) => (
                    <p style={{ margin: "0" }} key={index}>{`> ${message}`}</p>
                  ))}
                </div>
              </>
            )
          }
          {
            // MOVE TO DIFF FILE
            (activeStep === 3 || activeStep === 4) && (
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <h3 style={{ margin: 0 }}>Log Message: </h3>
                  <div className='logMsgs'>
                    {logMessages.map((message, index) => (
                      <p style={{ margin: "0", lineHeight: "100%" }} key={index}>{`> ${message}`}</p>
                    ))}
                  </div>
                </div>
                <div className='summary'>
                  <h3 style={{ margin: 0 }}>Summary: </h3>
                  <h4>Games successfully added ({successGames.length}):</h4>
                  <ul>
                    {successGames.map((game, index) => (
                      <li key={index}>{game}</li>
                    ))}
                  </ul>

                  <h4>Games already exist ({duplicateGames.length}):</h4>
                  <ul>
                    {duplicateGames.map((game, index) => (
                      <li key={index}>{game}</li>
                    ))}
                  </ul>

                  <h4>Error processing game ({failedGames.length}):</h4>
                  <ul>
                    {failedGames.map((game, index) => (
                      <li key={index}>{game}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          }
        </div>


      </div>
    </div>
  );
};

export default Flashdrive;
