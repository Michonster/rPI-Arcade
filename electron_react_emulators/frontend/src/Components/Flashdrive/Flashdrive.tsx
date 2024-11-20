import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Flashdrive.css";
import LeftBanner from '../Banners/LeftBanner'

const Flashdrive: React.FC = () => {
  // handle getting messages ======================================
  const navigate = useNavigate();
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null); // Ref for the log output container
  const [isMonitoring, setIsMonitoring] = useState(false);

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
      toast.error("Error: Games cannot be uploaded at this time. Please contact the RPI ARCADE team.", {
        onClose: () => navigate('/'),
      });
    }
  };

  // Function to poll log messages every second
  useEffect(() => {
    if (isMonitoring) {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/get_log_messages");
          const messages: string[] = await response.json();
          handleLogMessages(messages);
        } catch (error) {
          console.error("Error fetching log messages:", error);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isMonitoring]);

  const handleLogMessages = (messages: string[]) => {
    setLogMessages((prevLogMessages) => {
      const updatedLogMessages = [...prevLogMessages, ...messages];

      // Check for keywords to transition steps
      if (activeStep === 1 && messages.some(msg => msg.includes("USB device"))) {
        markStepComplete(1);
        setActiveStep(2);
      } else if (activeStep === 2 && messages.some(msg => msg.includes("Please remove USB"))) {
        markStepComplete(2);
        setActiveStep(3);
      } else if (activeStep == 3 && messages.some(msg => msg.includes("USB successfully removed."))) {
        markStepComplete(3)
      }

      return updatedLogMessages;
    });
  };

  const markStepComplete = (step: number) => {
    const updatedCompletedSteps = [...completedSteps];
    updatedCompletedSteps[step - 1] = true;
    setCompletedSteps(updatedCompletedSteps);
  };

  // handle displaying steps ======================================
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false]);

  // const handleStepClick = (step: number) => {
  //   if (step === activeStep) {
  //     // If already active, mark as complete
  //     const updatedCompletedSteps = [...completedSteps];
  //     updatedCompletedSteps[step - 1] = true;
  //     setCompletedSteps(updatedCompletedSteps);
  //   } else {
  //     // If clicking a non-active step, set as active
  //     setActiveStep(step);
  //   }
  // };

  const stepTitle = [
    "Step 1: Insert your flashdrive",
    "Step 2: Wait for data processing",
    "Step 3: Remove your flashdrive"
  ];

  /* 
  USB device
  Mount Success  - - going to process data now
  Please remove USB  - - safe to remove USB
  USB successfully removed.
  */

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
            // onClick={() => handleStepClick(step)}
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
          <button style={{ alignSelf: "center" }} className="buttonCircle" onClick={startMonitoring} >
            {isMonitoring ? "Monitoring..." : "Start Monitoring"}
          </button>
        </div>

        <div ref={outputRef} className="logOutput">
          {logMessages.map((message, index) => (
            <p style={{ margin: "0" }} key={index}>{message}</p>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Flashdrive;
