import React, { useState } from "react";
import "./verifyemail.css";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Placeholder for backend integration
  const handleVerifyEmail = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {

      // Simulated delay (for UI)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // If success
      setSuccess("Verification email sent! Check your inbox.");
      setTimeout(() => navigate("/emailcode"), 1000);

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verifyemail">
      <h2>Verify your email</h2>
      <p>
        Click on <strong>Verify Email</strong> below to verify your email and start using Tokora Pay.
      </p>

      {/*Show feedback */}
      {error && <p style={{ color: "red", fontSize: "11px" }}>{error}</p>}
      {success && <p style={{ color: "green", fontSize: "11px" }}>{success}</p>}

      <button
        className="verify"
        onClick={handleVerifyEmail}
        disabled={loading}
      >
        {loading ? "Sending..." : "Verify Email"}
      </button>
    </div>
  );
};

export default VerifyEmail;
