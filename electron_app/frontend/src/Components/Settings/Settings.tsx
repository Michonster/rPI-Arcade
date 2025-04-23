import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<null | "audio" | "video" | "controller">(null);
  const [audioOn, setAudioOn] = useState(true);
  const [videoQuality, setVideoQuality] = useState("high");
  const [controllerScheme, setControllerScheme] = useState("classic");

  const handleReset = () => {
    setAudioOn(true);
    setVideoQuality("high");
    setControllerScheme("classic");
  };

  const renderMainMenu = () => (
    <div className="settings-options">
      <button onClick={() => setActiveSection("audio")}>Audio Settings</button>
      <button onClick={() => setActiveSection("video")}>Video Settings</button>
      <button onClick={() => setActiveSection("controller")}>Controller Mapping</button>
      <button onClick={handleReset}>Reset to Defaults</button>
    </div>
  );

  const renderAudioSettings = () => (
    <div className="settings-subsection">
      <p>Toggle audio output:</p>
      <button onClick={() => setAudioOn(prev => !prev)}>
        {audioOn ? "Turn Audio Off 🔇" : "Turn Audio On 🔊"}
      </button>
      <button className="back-button" onClick={() => setActiveSection(null)}>← Back</button>
    </div>
  );

  const renderVideoSettings = () => (
    <div className="settings-subsection">
      <p>Choose video quality:</p>
      <select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className="back-button" onClick={() => setActiveSection(null)}>← Back</button>
    </div>
  );

  const renderControllerSettings = () => (
    <div className="settings-subsection">
      <p>Select control scheme:</p>
      <select value={controllerScheme} onChange={(e) => setControllerScheme(e.target.value)}>
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
        <option value="custom">Custom</option>
      </select>
      <button className="back-button" onClick={() => setActiveSection(null)}>← Back</button>
    </div>
  );

  return (
    <div className="settings-page">
      <h1>
        {activeSection === "audio"
          ? "Audio Settings"
          : activeSection === "video"
          ? "Video Settings"
          : activeSection === "controller"
          ? "Controller Mapping"
          : "Settings"}
      </h1>
      {activeSection === null && (
        <button onClick={() => navigate("/emulators")}>Back to Emulators</button>
      )}
      
      {activeSection === null && renderMainMenu()}
      {activeSection === "audio" && renderAudioSettings()}
      {activeSection === "video" && renderVideoSettings()}
      {activeSection === "controller" && renderControllerSettings()}
    </div>
  );
};

export default Settings;