import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./emailcode.css";
import { useNavigate } from "react-router-dom";

const EmailCode = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    const countdown =
      timer > 0 && setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  // Verify handler
  const handleVerify = async () => {
    const enteredCode = code.join("");
    setError("");

    if (enteredCode.length < 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Email verified successfully");
      navigate("/verifyphone");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  // Resend handler
  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(90);
    setError("");

    try {
      console.log("Resent verification code");
    } catch (err) {
      console.error(err);
      setError("Failed to resend code. Try again.");
    }
  };

  return (
    <motion.div
      className="emailcode"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Enter verification code from email
        </motion.h2>
        <p>
          Please enter the code that we emailed to{" "}
          <strong>useremail@gmail.com</strong>
        </p>

        <div className="verifycode">
          {code.map((digit, index) => (
            <motion.input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="number"
              whileFocus={{ scale: 1.15, borderColor: "rgba(247, 148, 29, 1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              style={{
                color: "red",
                fontSize: "11px",
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          className="verify"
          onClick={handleVerify}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: loading
              ? "rgba(247,148,29,0.6)"
              : "rgba(247,148,29,1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {loading ? "Verifying..." : "Verify"}
        </motion.button>

        <p id="p">
          {timer > 0 ? (
            <>
              Resend code in {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </>
          ) : (
            <motion.span
              onClick={handleResend}
              style={{
                color: "rgba(247, 148, 29, 1)",
                cursor: "pointer",
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              Resend code
            </motion.span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default EmailCode;
