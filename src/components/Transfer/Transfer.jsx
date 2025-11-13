import React, { useState } from "react";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./transfer.css";
import { motion } from "framer-motion";

const Transfer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simulated backend account verification
  const verifyAccount = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Account verification simulated.");
      return true;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to verify account.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setError("");

    if (!accountNumber || !bank) {
      setError("Please fill in all fields.");
      return;
    }

    const isVerified = await verifyAccount();
    if (!isVerified) return;

    navigate("/confirmtransfer", {
      state: { accountNumber, bank },
    });
  };

  return (
    <motion.div
      className="transfer-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="transfer-header"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="back-icon" />
        </motion.div>
        <h2 className="transfer-title">Send</h2>
      </motion.div>

      {/* Form */}
      <motion.form
        className="transfer-form"
        onSubmit={handleNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.label
          className="transfer-label"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Account Number
        </motion.label>
        <motion.input
          type="number"
          placeholder="0123456789"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="transfer-input"
          required
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        <motion.label
          className="transfer-label"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Bank
        </motion.label>
        <motion.div
          className="bank-input-wrapper"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="      Recipient Bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="transfer-input bank-input"
            required
          />
          <Building2 size={20} className="bank-icon" />
        </motion.div>

        {error && (
          <motion.p
            className="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          className="next-button"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {loading ? "Verifying..." : "Next"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Transfer;
