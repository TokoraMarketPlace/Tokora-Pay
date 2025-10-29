import React from "react";
import "./logout.css"; // linked CSS file
import { ArrowLeft } from "lucide-react";
import { TbDoorExit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/settings");
  };

  const handleLogout = async () => {
    // 🔧 ready for backend integration
    // Example: await fetch("/api/logout", { method: "POST" });
    navigate("/signup");
  };

  return (
    <div className="logout-page">
      {/* Header */}
      <div className="logout-header">
        <button onClick={handlePrevious} className="logout-back-btn">
          <ArrowLeft />
        </button>
        <h2 className="logout-title">Log Out</h2>
      </div>

      {/* Content Card */}
      <div className="logout-card">
        <TbDoorExit size={60} className="logout-icon" />
        <h2 className="logout-question">
          Are you logging <br /> out?
        </h2>
        <p className="logout-message">
          You can always log back in at any time. If you just want to switch
          accounts, you can{" "}
          <a href="/signup" className="logout-link">
            add another account.
          </a>
        </p>

        <div className="logout-btn-group">
          <button onClick={handlePrevious} className="logout-btn cancel">
            Cancel
          </button>
          <button onClick={handleLogout} className="logout-btn confirm">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
