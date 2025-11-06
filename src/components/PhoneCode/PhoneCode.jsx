import React, { useState } from "react";
import "./phonecode.css";
import { useNavigate } from "react-router-dom";

const PhoneCode = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1); // only last digit
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle OTP submission
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const code = otp.join("");

    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);

      //  Replace this with your backend call
      // Example: POST to your API endpoint
      // const res = await fetch("https://api.yourapp.com/verify-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ otp: code }),
      // });
      // const data = await res.json();

      // if (data.success) {
      //   navigate("/dashboard");
      // } else {
      //   setError(data.message || "Invalid OTP, please try again.");
      // }

      // Temporary dummy success (for now)
      console.log("Verifying OTP:", code);
      setTimeout(() => {
        navigate("/connect-wallet");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emailcode">
      <div className="header">
        <h2>Verify mobile number</h2>
        <p>Please verify the code that was sent to +234 123 456 7890</p>

        <div className="verifycode">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              className="number"
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <button
          className="verify"
          onClick={handleVerify}
          disabled={loading}
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p id="p">
          Didn’t receive?{" "}
          <span
            onClick={() => alert("Resend code triggered!")}
            style={{
              color: "#f7941d",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default PhoneCode;
