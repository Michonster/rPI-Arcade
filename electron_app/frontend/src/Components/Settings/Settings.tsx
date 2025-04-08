
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>

      <div className="settings-options">
        <button>Audio Settings</button>
        <button>Video Settings</button>
        <button>Controller Mapping</button>
        <button>Reset to Defaults</button>
      </div>
    </div>
  );
};

export default Settings;