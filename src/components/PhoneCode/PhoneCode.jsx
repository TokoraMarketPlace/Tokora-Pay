import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./phonecode.css";

const PhoneCode = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1);
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          newOtp[index - 1] = "";
        }
      } else {
        newOtp[index] = "";
      }
      setOtp(newOtp);
    }
  };

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
      console.log("Verifying OTP:", code);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/connect-wallet");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="emailcode"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Verify mobile number
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Please verify the code that was sent to +234 123 456 7890
        </motion.p>

        <div className="verifycode">
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              className="number"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            />
          ))}
        </div>

        {error && (
          <motion.p
            style={{ color: "red", textAlign: "center" }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          className="verify"
          onClick={handleVerify}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: loading ? 0.7 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Verifying..." : "Verify"}
        </motion.button>

        <motion.p
          id="p"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
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
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PhoneCode;
