import React, { useState } from "react";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./sendtovendor.css";

// Example flag icons (replace with your actual assets)
import USDCFlag from "../../assets/USDC Logo.png";
import NGNFlag from "../../assets/nigeria.png";

const currencies = [
  { code: "USDC", name: "USDC", flag: USDCFlag },
  { code: "NGN", name: "Nigerian Naira", flag: NGNFlag },
];

const Sendtovendor = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(1500); // example static rate

  // Convert currency based on rate
  const convertAmount = async (value) => {
    try {
      setLoading(true);
      setError("");

      let result;
      if (fromCurrency.code === "USDC" && toCurrency.code === "NGN") {
        result = value * rate;
      } else if (fromCurrency.code === "NGN" && toCurrency.code === "USDC") {
        result = value / rate;
      } else {
        result = value;
      }

      setConvertedAmount(result.toFixed(2));
    } catch (err) {
      setError(err.message || "Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value) convertAmount(value);
  };

  const handleSwitchCurrency = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);

    if (amount) convertAmount(amount);
  };

  const handlePrevious = () => navigate("/transfer");

  const handleNext = () => {
    if (!amount || !convertedAmount) {
      setError("Please enter an amount.");
      return;
    }

    console.log({
      sendAmount: amount,
      receiveAmount: convertedAmount,
      currencyFrom: fromCurrency.code,
      currencyTo: toCurrency.code,
    });

    navigate("/confirmation", {
      state: { amount, convertedAmount, fromCurrency, toCurrency },
    });
  };

  return (
    <motion.div
      className="vendor-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="vendor-header"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={handlePrevious}
          className="back-button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <ArrowLeft />
        </motion.button>
        <h2 className="vendor-title">Send</h2>
      </motion.div>

      {/* Send Section */}
      <motion.div
        className="vendor-card"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="label-text">Send</p>
        <div className="input-row">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            className="amount-input"
          />
          <div className="currency-display" onClick={handleSwitchCurrency}>
            <img src={fromCurrency.flag} alt={fromCurrency.code} className="flag" />
            <p className="currency-text">{fromCurrency.code}</p>
          </div>
        </div>
        <p className="subtext">{fromCurrency.name}</p>
      </motion.div>

      {/* Switch Arrow */}
      <motion.div
        className="arrow-center"
        onClick={handleSwitchCurrency}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowDown />
      </motion.div>

      {/* Receive Section */}
      <motion.div
        className="vendor-card"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="label-text">Receive</p>
        <div className="input-row">
          <input
            type="number"
            placeholder="0.00"
            value={convertedAmount}
            readOnly
            className="amount-input read-only"
          />
          <div className="currency-display" onClick={handleSwitchCurrency}>
            <img src={toCurrency.flag} alt={toCurrency.code} className="flag" />
            <p className="currency-text">{toCurrency.code}</p>
          </div>
        </div>
        <p className="subtext">{toCurrency.name}</p>
      </motion.div>

      {error && (
        <motion.p
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      <motion.button
        className="send-button"
        onClick={handleNext}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {loading ? "Processing..." : "Send"}
      </motion.button>
    </motion.div>
  );
};

export default Sendtovendor;
