import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/BGImage.png";
import "./splashscreen.css"; // Import your CSS file

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      className="splash-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Black Overlay with fade in */}
      <div className="overlay"></div>

      {/* Text Content */}
      <div className="text-content">
        <h1 className="title">
          Spend <br /> crypto on <br /> the go
        </h1>
        <p className="subtitle">
          Convert crypto to fiat instantly. <br />
          Users spend crypto, vendors receive naira.
        </p>
      </div>

      {/* Buttons */}
      <div className="bottom-section">
        <button
          onClick={() => navigate("/signup")}
          className="get-started-btn"
        >
          Get Started
        </button>
        <p className="login-text">
          Already have an account?{" "}
          <a href="/signup" className="login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
