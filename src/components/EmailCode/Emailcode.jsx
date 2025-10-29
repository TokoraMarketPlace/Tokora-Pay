import React, { useState, useEffect, useRef } from "react";
import "./emailcode.css";
import { useNavigate } from "react-router-dom";

const EmailCode = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);
  const inputRefs = useRef([]);

  //  Countdown timer for "Resend code"
  useEffect(() => {
    const countdown =
      timer > 0 && setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // Handle code input movement
  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to next input automatically
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle "Verify" button click
  const handleVerify = async () => {
    const enteredCode = code.join("");
    setError("");

    if (enteredCode.length < 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setLoading(true);

    try {

      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Email verified successfully");
      navigate("/verifyphone"); // Navigate after success

    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  // Handle resend
  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(90);
    setError("");

    try {
      // Backend resend placeholder
      /*
      await fetch("https://your-api.com/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      */

      console.log("Resent verification code");
    } catch (err) {
      console.error(err);
      setError("Failed to resend code. Try again.");
    }
  };

  return (
    <div className="emailcode">
      <div className="header">
        <h2>Enter verification code from email</h2>
        <p>Please enter the code that we emailed to <strong>useremail@gmail.com</strong></p>

        <div className="verifycode">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="number"
            />
          ))}
        </div>

        {error && (
          <p style={{ color: "red", fontSize: "11px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          className="verify"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p id="p">
          {timer > 0 ? (
            <>Resend code in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</>
          ) : (
            <span
              onClick={handleResend}
              style={{ color: "rgba(247, 148, 29, 1)", cursor: "pointer", fontWeight: 600 }}
            >
              Resend code
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default EmailCode;
