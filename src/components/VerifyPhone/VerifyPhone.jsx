import React, { useState } from "react";
import "./verifyphone.css";
import { useNavigate } from "react-router-dom";

const countryCodes = ["+234", "+1", "+44", "+91", "+254"];

const Verifyphone = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  Function to send verification code
  const handleSendCode = async () => {
    if (!phone || phone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Put  backend here
      

      // --- Temporary Simulation for Testing ---
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`📲 Verification code sent to ${countryCode}${phone}`);

      // Save phone info for the next step
      localStorage.setItem("pendingPhone", `${countryCode}${phone}`);

      navigate("/phonecode");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verifyphone">
      <div className="header" style={{ flexDirection: "column", gap: "1rem" }}>
        <h2>Enter your mobile number</h2>
        <p>We will send you a confirmation code</p>

        <div className="phone">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="code"
          >
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="000 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="phone-input"
            required
          />
        </div>

        {error && (
          <p
            style={{
              color: "red",
              fontSize: "11px",
              textAlign: "left",
              paddingTop: "0.5rem",
            }}
          >
            {error}
          </p>
        )}

        <p className="diff">
          You'll receive a 6-digit code to verify next
        </p>
      </div>

      <div className="body" style={{ textAlign: "center" }}>
        <button
          className="verify"
          onClick={handleSendCode}
          disabled={loading}
          style={{
            borderRadius: "18px",
            padding: "1.2rem 1rem",
            border: "1px solid rgba(213, 117, 1, 1)",
            backgroundColor: loading
              ? "rgba(247, 148, 29, 0.6)"
              : "rgba(247, 148, 29, 1)",
            color: "white",
            fontWeight: 400,
            fontSize: "20px",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          {loading ? "Sending..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Verifyphone;
