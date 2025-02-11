import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Flashdrive.css";
import LeftBanner from '../Banners/LeftBanner'
import Step1Instruction from './Step1Instruction';

import { useController } from "../ControllerContext";

const Flashdrive: React.FC = () => {
  // Establish socket with usb_monitor server ======================================
  const socketRef = useRef<Socket | null>(null); // Ref so that socket doesn't trigger re-renders
   
   const [successGames, setSuccessGames] = useState<string[]>([]);
   const [duplicateGames, setDuplicateGames] = useState<string[]>([]);
   const [failedGames, setFailedGames] = useState<string[]>([]);
 
   const [logMessages, setLogMessages] = useState<string[]>([]);
   const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Establish socket connection only when the page is mounted
    socketRef.current = io("http://127.0.0.1:5001", {
      reconnection: false, // Disable automatic reconnections
      timeout: 5000,
    });

    console.log("Connected to flashdrive socket");

    // Prompts monitoring for flashdrives
    if (!hasStarted) {
      socketRef.current.emit('START');
      setHasStarted(true);
    }

    /* Continuously listens for messages from backend. Does multiple tasks including
      updating steps, sorts games into summary, and processes errors.
      Process log messages */
    const handleStatus = (data: {message: string}) => {
      setLogMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data.message];
        console.log(data.message)

        // Updates step based on key phrases.
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

    // Process summary. Store in lists to be displayed at the last step.
    const handleSummary = (data: {message: string, type: string, games: string[]}) => {
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

    /* Process errors. Display popup and return to carousel screen
      The two similar functions handle different situations 
          (ex. handleConnectError if request fails with error msg
            handleConnectFailed if connection fails to be established) */
    const handleConnectError = (error: Error) => {
      console.error("Connection failed:", error);
      toast.error(
        "Error: Games cannot be uploaded at this time. Please contact the RPI ARCADE team.",
        {
          onClose: () => navigate("/emulators"),
        }
      );
    };

    const handleConnectFailed = () => {
      console.error("Connection to server failed");
      toast.error(
        "Error: Games cannot be uploaded at this time. Please contact the RPI ARCADE team.",
        {
          onClose: () => navigate("/emulators"),
        }
      );
    };
    console.log("attach listeners")

    // Attach socket listeners
    socketRef.current.on("status", handleStatus);
    socketRef.current.on("summary", handleSummary);
    socketRef.current.on("connect_error", handleConnectError);
    socketRef.current.on("connect_failed", handleConnectFailed);

    // Cleanup listeners on unmount & disconnect the socket
    return () => {
      if (socketRef.current) {
        socketRef.current.off("status", handleStatus);
        socketRef.current.off("summary", handleSummary);
        socketRef.current.off("connect_error", handleConnectError);
        socketRef.current.off("connect_failed", handleConnectFailed);

        socketRef.current.disconnect();
        console.log("Disconnected from flashdrive socket");
      }
    };

  }, []); // Runs only when the component mounts/unmounts


  // Button actions ======================================
  const navigate = useNavigate();
  const { registerButtonHandler } = useController();

  // If button to cancel/go back is pressed
  const handleCancel = () => {
    if (socketRef.current) {
      socketRef.current.emit('STOP');
      setHasStarted(false);
    }
    navigate('/emulators');
  };

  useEffect(() => {
    registerButtonHandler("x", handleCancel);
  }, [registerButtonHandler]);

 
  // Handle displaying steps ======================================
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false]);
  const [activeStep, setActiveStep] = useState(1);

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

        {[1, 2, 3].map((stepNum) => (
          <button
            key={stepNum}
            className={`buttonStep ${activeStep === stepNum ? 'activeStep' : ''} ${completedSteps[stepNum - 1] ? 'completedStep' : ''}`}
            onClick={() => setActiveStep(stepNum)} // FOR TESTING PURPOSES
          >
            {stepNum}
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
        <div style={{ display: "flex", justifyContent: "center", width: "100%", position: "absolute", top: "5%" }}>
          <p style={{ alignSelf: "center", fontSize: "50px" }}>{stepTitle[activeStep - 1]}</p>
        </div>

        {/* ============================ */}
        <div className="logOutput">
          {
            activeStep === 1 && <Step1Instruction />
          }
          {
            activeStep === 2 && (
              <>
                <h3>Log Messages: </h3>
                <div className='logMsgs' style={{ fontSize: "20px" }}>
                  {logMessages.map((message, index) => (
                    <p key={index}>{`> ${message}`}</p>
                  ))}
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed ligula sit amet est vulputate efficitur ut sit amet augue. Donec pulvinar dictum nulla nec vestibulum. Mauris finibus mollis sem quis feugiat. Donec nec placerat dui, vel volutpat est. Etiam vehicula faucibus nunc, at sagittis mauris facilisis in. Proin non aliquet lorem. Aliquam quis congue nisl, vitae malesuada nulla. Vestibulum sed nibh id neque pretium mollis vitae pretium orci. Etiam non purus eu diam euismod sagittis sit amet in justo. Vivamus aliquet lobortis lacinia. Vestibulum fermentum eu ante in consequat. Pellentesque enim dolor, varius nec malesuada eu, tincidunt sed lectus. Proin pulvinar urna sit amet elit egestas, vitae convallis risus volutpat. Aliquam turpis lectus, lacinia congue malesuada quis, feugiat vel arcu.

Sed arcu nisl, finibus mollis sollicitudin ut, viverra consequat sem. Quisque commodo leo in lorem convallis, a ultrices est fringilla. Fusce nec malesuada neque. In laoreet posuere ligula in auctor. Donec condimentum risus vitae mi porta mollis. Fusce ullamcorper, leo id venenatis venenatis, mi massa venenatis lacus, vel semper nulla neque quis magna. Sed et lacinia enim, quis efficitur metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac rhoncus arcu, ac tempus sapien. Suspendisse a nisl diam. Aenean sed accumsan urna, mollis venenatis tortor. Phasellus laoreet ante non vulputate ultricies. Vestibulum ultrices velit in nisi convallis luctus. Vestibulum facilisis, leo at molestie egestas, arcu felis mollis lacus, quis auctor magna turpis ac quam.

Proin vel quam sed libero egestas fringilla ut in augue. Nam eu augue ut nisl mollis tincidunt. Ut hendrerit ante a libero tristique varius. Vestibulum dui diam, interdum vitae dui non, volutpat elementum mauris. Fusce sit amet sollicitudin orci. Mauris sed ante bibendum, sagittis sapien vel, maximus urna. Integer tincidunt libero eu accumsan scelerisque. Aenean at turpis non velit venenatis vehicula quis ut dui. Ut vehicula cursus ligula quis aliquam. Etiam congue, neque vitae sagittis aliquam, risus risus auctor quam, ut feugiat quam felis quis lectus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed ligula sit amet est vulputate efficitur ut sit amet augue. Donec pulvinar dictum nulla nec vestibulum. Mauris finibus mollis sem quis feugiat. Donec nec placerat dui, vel volutpat est. Etiam vehicula faucibus nunc, at sagittis mauris facilisis in. Proin non aliquet lorem. Aliquam quis congue nisl, vitae malesuada nulla. Vestibulum sed nibh id neque pretium mollis vitae pretium orci. Etiam non purus eu diam euismod sagittis sit amet in justo. Vivamus aliquet lobortis lacinia. Vestibulum fermentum eu ante in consequat. Pellentesque enim dolor, varius nec malesuada eu, tincidunt sed lectus. Proin pulvinar urna sit amet elit egestas, vitae convallis risus volutpat. Aliquam turpis lectus, lacinia congue malesuada quis, feugiat vel arcu.

Sed arcu nisl, finibus mollis sollicitudin ut, viverra consequat sem. Quisque commodo leo in lorem convallis, a ultrices est fringilla. Fusce nec malesuada neque. In laoreet posuere ligula in auctor. Donec condimentum risus vitae mi porta mollis. Fusce ullamcorper, leo id venenatis venenatis, mi massa venenatis lacus, vel semper nulla neque quis magna. Sed et lacinia enim, quis efficitur metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac rhoncus arcu, ac tempus sapien. Suspendisse a nisl diam. Aenean sed accumsan urna, mollis venenatis tortor. Phasellus laoreet ante non vulputate ultricies. Vestibulum ultrices velit in nisi convallis luctus. Vestibulum facilisis, leo at molestie egestas, arcu felis mollis lacus, quis auctor magna turpis ac quam.

Proin vel quam sed libero egestas fringilla ut in augue. Nam eu augue ut nisl mollis tincidunt. Ut hendrerit ante a libero tristique varius. Vestibulum dui diam, interdum vitae dui non, volutpat elementum mauris. Fusce sit amet sollicitudin orci. Mauris sed ante bibendum, sagittis sapien vel, maximus urna. Integer tincidunt libero eu accumsan scelerisque. Aenean at turpis non velit venenatis vehicula quis ut dui. Ut vehicula cursus ligula quis aliquam. Etiam congue, neque vitae sagittis aliquam, risus risus auctor quam, ut feugiat quam felis quis lectus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed ligula sit amet est vulputate efficitur ut sit amet augue. Donec pulvinar dictum nulla nec vestibulum. Mauris finibus mollis sem quis feugiat. Donec nec placerat dui, vel volutpat est. Etiam vehicula faucibus nunc, at sagittis mauris facilisis in. Proin non aliquet lorem. Aliquam quis congue nisl, vitae malesuada nulla. Vestibulum sed nibh id neque pretium mollis vitae pretium orci. Etiam non purus eu diam euismod sagittis sit amet in justo. Vivamus aliquet lobortis lacinia. Vestibulum fermentum eu ante in consequat. Pellentesque enim dolor, varius nec malesuada eu, tincidunt sed lectus. Proin pulvinar urna sit amet elit egestas, vitae convallis risus volutpat. Aliquam turpis lectus, lacinia congue malesuada quis, feugiat vel arcu.

Sed arcu nisl, finibus mollis sollicitudin ut, viverra consequat sem. Quisque commodo leo in lorem convallis, a ultrices est fringilla. Fusce nec malesuada neque. In laoreet posuere ligula in auctor. Donec condimentum risus vitae mi porta mollis. Fusce ullamcorper, leo id venenatis venenatis, mi massa venenatis lacus, vel semper nulla neque quis magna. Sed et lacinia enim, quis efficitur metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac rhoncus arcu, ac tempus sapien. Suspendisse a nisl diam. Aenean sed accumsan urna, mollis venenatis tortor. Phasellus laoreet ante non vulputate ultricies. Vestibulum ultrices velit in nisi convallis luctus. Vestibulum facilisis, leo at molestie egestas, arcu felis mollis lacus, quis auctor magna turpis ac quam.

Proin vel quam sed libero egestas fringilla ut in augue. Nam eu augue ut nisl mollis tincidunt. Ut hendrerit ante a libero tristique varius. Vestibulum dui diam, interdum vitae dui non, volutpat elementum mauris. Fusce sit amet sollicitudin orci. Mauris sed ante bibendum, sagittis sapien vel, maximus urna. Integer tincidunt libero eu accumsan scelerisque. Aenean at turpis non velit venenatis vehicula quis ut dui. Ut vehicula cursus ligula quis aliquam. Etiam congue, neque vitae sagittis aliquam, risus risus auctor quam, ut feugiat quam felis quis lectus. */}
                </div>
              </>
            )
          }
          {
            // MOVE TO DIFF FILE
            (activeStep === 3 || activeStep === 4) && (
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", height: "68vh" }}>
                  <h3>Log Messages: </h3>
                  <div className='logMsgs'>
                    {logMessages.map((message, index) => (
                      <p style={{ lineHeight: "100%" }} key={index}>{`> ${message}`}</p>
                    ))}
                  </div>
                </div>
                <div className='summary'>
                  <h3>Summary: </h3>
                  <h4>Games successfully added ({successGames.length}):</h4>
                  <ul>
                    {successGames.map((game, index) => (
                      <li key={index}>{game}</li>
                    ))}
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed ligula sit amet est vulputate efficitur ut sit amet augue. Donec pulvinar dictum nulla nec vestibulum. Mauris finibus mollis sem quis feugiat. Donec nec placerat dui, vel volutpat est. Etiam vehicula faucibus nunc, at sagittis mauris facilisis in. Proin non aliquet lorem. Aliquam quis congue nisl, vitae malesuada nulla. Vestibulum sed nibh id neque pretium mollis vitae pretium orci. Etiam non purus eu diam euismod sagittis sit amet in justo. Vivamus aliquet lobortis lacinia. Vestibulum fermentum eu ante in consequat. Pellentesque enim dolor, varius nec malesuada eu, tincidunt sed lectus. Proin pulvinar urna sit amet elit egestas, vitae convallis risus volutpat. Aliquam turpis lectus, lacinia congue malesuada quis, feugiat vel arcu.

Sed arcu nisl, finibus mollis sollicitudin ut, viverra consequat sem. Quisque commodo leo in lorem convallis, a ultrices est fringilla. Fusce nec malesuada neque. In laoreet posuere ligula in auctor. Donec condimentum risus vitae mi porta mollis. Fusce ullamcorper, leo id venenatis venenatis, mi massa venenatis lacus, vel semper nulla neque quis magna. Sed et lacinia enim, quis efficitur metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac rhoncus arcu, ac tempus sapien. Suspendisse a nisl diam. Aenean sed accumsan urna, mollis venenatis tortor. Phasellus laoreet ante non vulputate ultricies. Vestibulum ultrices velit in nisi convallis luctus. Vestibulum facilisis, leo at molestie egestas, arcu felis mollis lacus, quis auctor magna turpis ac quam.

Proin vel quam sed libero egestas fringilla ut in augue. Nam eu augue ut nisl mollis tincidunt. Ut hendrerit ante a libero tristique varius. Vestibulum dui diam, interdum vitae dui non, volutpat elementum mauris. Fusce sit amet sollicitudin orci. Mauris sed ante bibendum, sagittis sapien vel, maximus urna. Integer tincidunt libero eu accumsan scelerisque. Aenean at turpis non velit venenatis vehicula quis ut dui. Ut vehicula cursus ligula quis aliquam. Etiam congue, neque vitae sagittis aliquam, risus risus auctor quam, ut feugiat quam felis quis lectus. */}
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
