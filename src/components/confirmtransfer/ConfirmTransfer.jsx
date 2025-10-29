import React, { useState } from "react";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./confirmtransfer.css";

const ConfirmTransfer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [recipientname, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // This is where you’ll connect to backend
  const verifyAccount = async () => {
    try {
      setLoading(true);
      setError("");


      console.log(" Account verification simulated.");
      // return data; // when connected to backend
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

    if (!accountNumber || !bank || !recipientname) {
      setError("Please fill in all fields.");
      return;
    }

    //  Backend integration point
    const isVerified = await verifyAccount();
    if (!isVerified) return;

    // Proceed to confirmation page
    navigate("/send", {
      state: { accountNumber, bank },
    });
  };

  return (
    <div className="transfer-container">
      <div className="transfer-header">
        <ArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h2 className="transfer-title">Send</h2>
      </div>

      <form className="transfer-form" onSubmit={handleNext}>
        <label className="transfer-label">Account Number</label>
        <input
          type="number"
          placeholder="0123456789"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="transfer-input"
          required
        />

        <label className="transfer-label">Bank</label>
        <div className="bank-input-wrapper">
          <input
            type="text"
            placeholder="      Recipient Bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="transfer-input bank-input"
            required
          />
          <Building2 size={20} className="bank-icon" />
        </div>
        <input type="text"
        placeholder="Recipient Name"
        value={recipientname}
        onChange={(e) => setRecipientName(e.target.value)}
        className="transfer-input"
        required/>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="next-button" disabled={loading}>
          {loading ? "Verifying..." : "Next"}
        </button>
      </form>
    </div>
  );
};

export default ConfirmTransfer;
