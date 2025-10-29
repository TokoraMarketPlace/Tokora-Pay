import React from "react";
import "./moresetting.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Moresettings = () => {
  const navigate = useNavigate();

  const handlePrevious = () => navigate("/settings");

  return (
    <div className="moresetting">
      {/* Header */}
      <div className="moresetting__header">
        <button onClick={handlePrevious} className="moresetting__back-btn">
          <ArrowLeft />
        </button>
        <h2>Setting</h2>
      </div>

      {/* Main Content */}
      <div className="moresetting__body">
        <h3>More Setting</h3>
        <div className="moresetting__card">
          {/* 🔧 You can later load additional options dynamically here */}
          <p className="moresetting__placeholder">
            More options will appear here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Moresettings;