import React, { useState } from "react";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./sendtovendor.css";

const Sendtovendor = () => {
  const navigate = useNavigate();

  const [usdcAmount, setUsdcAmount] = useState("");
  const [ngnAmount, setNgnAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(1500); // example static rate (1 USDC = ₦1600)

  // This is where you’ll connect backend
  const fetchConversionRate = async (amount) => {
    try {
      setLoading(true);
      setError("");
      
      // Remove this once backend is connected
      const calculated = amount * rate;
      setNgnAmount(calculated.toFixed(2));
    } catch (err) {
      setError(err.message || "Failed to fetch conversion rate.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => navigate("/transfer");

  const handleNext = () => {
    if (!usdcAmount || !ngnAmount) {
      setError("Please enter an amount to send.");
      return;
    }

    // 🔗 Example of data you’ll send to backend later
    console.log({
      sendAmount: usdcAmount,
      receiveAmount: ngnAmount,
      currencyFrom: "USDC",
      currencyTo: "NGN",
    });

    navigate("/confirm-wallet", {
      state: { usdcAmount, ngnAmount },
    });
  };

  const handleUsdcChange = (e) => {
    const value = e.target.value;
    setUsdcAmount(value);
    if (value) fetchConversionRate(value);
  };

  return (
    <div className="vendor-container">
      <div>
        {/* Header */}
        <div className="vendor-header">
          <button onClick={handlePrevious} className="back-button">
            <ArrowLeft />
          </button>
          <h2 className="vendor-title">Send</h2>
        </div>

        {/* Send Section */}
        <div className="vendor-card">
          <p className="label-text">Send</p>
          <div className="input-row">
            <input
              type="number"
              placeholder="0.00"
              value={usdcAmount}
              onChange={handleUsdcChange}
              className="amount-input"
            />
            <p className="currency-text">USDC</p>
          </div>
          <p className="subtext">USDC on Solana</p>
        </div>

        <div className="arrow-center">
          <ArrowDown />
        </div>

        {/* Receive Section */}
        <div className="vendor-card">
          <p className="label-text">Receive</p>
          <div className="input-row">
            <input
              type="number"
              placeholder="0.00"
              value={ngnAmount}
              readOnly
              className="amount-input read-only"
            />
            <p className="currency-text">NGN</p>
          </div>
          <p className="subtext">Nigerian Naira</p>
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>

      <button
        className="send-button"
        onClick={handleNext}
        disabled={loading}
      >
        {loading ? "Processing..." : "Send"}
      </button>
    </div>
  );
};

export default Sendtovendor;
