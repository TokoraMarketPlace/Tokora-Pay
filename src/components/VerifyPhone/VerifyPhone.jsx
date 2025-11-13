import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./verifyphone.css";
import { useNavigate } from "react-router-dom";

// Country data with flag images
const countryData = [
  { code: "+234", name: "Nigeria", flag: "https://flagcdn.com/w20/ng.png" },
  { code: "+1", name: "USA", flag: "https://flagcdn.com/w20/us.png" },
  { code: "+44", name: "UK", flag: "https://flagcdn.com/w20/gb.png" },
  { code: "+91", name: "India", flag: "https://flagcdn.com/w20/in.png" },
  { code: "+254", name: "Kenya", flag: "https://flagcdn.com/w20/ke.png" },
];

const Verifyphone = () => {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(countryData[0]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSendCode = async () => {
    if (!phone || phone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`📲 Verification code sent to ${selectedCountry.code}${phone}`);
      localStorage.setItem("pendingPhone", `${selectedCountry.code}${phone}`);
      navigate("/phonecode");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="verifyphone"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header" style={{ flexDirection: "column", gap: "1rem" }}>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Enter your mobile number
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          We will send you a confirmation code
        </motion.p>

        {/* Custom Dropdown + Phone Input */}
        <div className="phone">
          <div className="custom-select">
            <motion.div
              className="selected"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                style={{ width: "20px", marginRight: "8px" }}
              />
              {selectedCountry.code}
            </motion.div>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="options"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {countryData.map((c) => (
                    <motion.div
                      key={c.code}
                      className="option"
                      onClick={() => {
                        setSelectedCountry(c);
                        setDropdownOpen(false);
                      }}
                      whileHover={{ backgroundColor: "rgba(247,148,29,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={c.flag}
                        alt={c.name}
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      {c.code} - {c.name}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            type="number"
            placeholder="000 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value.slice(0, 10))} // max 10 digits
            className="phone-input"
            required
          />
        </div>

        {error && (
          <motion.p
            style={{
              color: "red",
              fontSize: "11px",
              textAlign: "left",
              paddingTop: "0.5rem",
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.p>
        )}

        <p className="diff">You'll receive a 6-digit code to verify next</p>
      </div>

      <div className="body" style={{ textAlign: "center" }}>
        <motion.button
          className="verify"
          onClick={handleSendCode}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: loading
              ? "rgba(247, 148, 29, 0.6)"
              : "rgba(247, 148, 29, 1)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: "18px",
            padding: "1.2rem 1rem",
            border: "1px solid rgba(213, 117, 1, 1)",
            color: "white",
            fontWeight: 400,
            fontSize: "20px",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          {loading ? "Sending..." : "Continue"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Verifyphone;
