import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Flashdrive.css";
import LeftBanner from '../Banners/LeftBanner'
import Step1Instruction from './Step1Instruction';

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
      console.log(completedSteps)
      // Check for key phrases to transition steps
      /* 
      USB device
      Mount Success  - - going to process data now
      Please remove USB  - - safe to remove USB
      USB successfully removed.
      */
      if (activeStepRef.current === 1 && updatedLogMessages.some(msg => msg.includes("USB device"))) {
        markStepComplete(1);
        setActiveStep(2);
      }

      if (activeStepRef.current === 2 && updatedLogMessages.some(msg => msg.includes("Please remove"))) {
        markStepComplete(2);
        setActiveStep(3);
      }
      if (activeStepRef.current == 3 && updatedLogMessages.some(msg => msg.includes("USB successfully removed."))) {
        markStepComplete(3)
        setActiveStep(4);
        setIsMonitoring(false)
      }
      return updatedLogMessages;
    });
  };

  const markStepComplete = (step: number) => {
    setCompletedSteps((prevCompletedSteps) => {
      const updatedCompletedSteps = [...prevCompletedSteps];
      updatedCompletedSteps[step - 1] = true;
      return updatedCompletedSteps;
    });
  };

  // handle displaying steps ======================================
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false]);
  const [activeStep, setActiveStep] = useState(1);
  const activeStepRef = useRef(activeStep);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);


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
          <button style={{ alignSelf: "center" }} className="buttonCircle" onClick={startMonitoring} >
            {isMonitoring ? "Monitoring..." : "Start Monitoring"}
          </button>
        </div>

        {/* ============================ */}
        <div ref={outputRef} className="logOutput">
          {
            activeStep === 1 && <Step1Instruction />
          }
          {
            activeStep === 2 && (
              <>
                <h3 style={{ margin: 0 }}>Log Messages: </h3>
                {logMessages.map((message, index) => (
                  <p style={{ margin: "0" }} key={index}>{`> ${message}`}</p>
                ))}
              </>
            )
          }
          {
            // MOVE TO DIFF FILE
            (activeStep === 3 || activeStep === 4) && (
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <h3 style={{ margin: 0 }}>Log Message: </h3>
                  <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
                    {logMessages.map((message, index) => (
                      <p style={{ margin: "0", lineHeight: "100%" }} key={index}>{`> ${message}`}</p>
                    ))}
                  </div>
                </div>
                <div style={{ width: "50%", marginLeft: "3%", paddingLeft: "3%", borderLeft: "2px solid white" }}>
                  <h3 style={{ margin: 0 }}>Summary: </h3>
                  <h4> Games successfully added(0): </h4>
                  <h4> Games already exist(0): </h4>
                  <h4> Error processing game(0): </h4>
                  <h4> File directory cannot be read(0): </h4>
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
