import React, { useEffect, useState } from "react";
import "./confirmation.css";
import { ArrowLeft } from "lucide-react";
import Success from "../../assets/Check icon.png";
import Usdc from "../../assets/USDC Logo.png";
import Nigeria from "../../assets/nigeria.png";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  //  Placeholder transaction data 
  const [transaction, setTransaction] = useState({
    amountSent: 60,
    amountReceived: 92275,
    currency: "USDC",
    fiat: "NGN",
    fee: 0,
    recipientBank: "Opay - 0123456789",
    recipientName: "Samuel Ekpo",
    dateTime: "15 AUG 2025 | 12:21 PM",
    reference: "BCD_d8adf434mbsdfh",
    status: "Completed",
  });

  //  Simulate fetching data from backend
  useEffect(() => {
    /*
    fetch("https://your-api.com/api/transactions/:id")
      .then((res) => res.json())
      .then((data) => setTransaction(data))
      .catch((err) => console.error("Failed to fetch transaction:", err));
    */
  }, []);


  const handleDone = () => navigate("/dashboard");
  const handleNext = () => navigate("/reciept");

  return (
    <div className="confirmation">
      <div className="confirmation-header">
        <ArrowLeft onClick={() => navigate(-1)} />
        <h2>Transaction Completed</h2>
      </div>

      <div className="confirmation-body">
        <img src={Success} alt="Success" />

        <div className="confirmation-details">
          <div className="amount-sent">
            <h5>You sent</h5>
            <h5>
              <img src={Usdc} alt="" />
              {transaction.amountSent} {transaction.currency}
            </h5>
          </div>

          <div className="amount-sent">
            <h5>Vendor received</h5>
            <h5>
              <img src={Nigeria} alt="" />
              {transaction.amountReceived.toLocaleString()} {transaction.fiat}
            </h5>
          </div>

          <div className="amount-sent">
            <h5>Fee</h5>
            <h5>{transaction.fee} NGN</h5>
          </div>

          <div className="amount-sent">
            <h5>Recipient bank</h5>
            <h5>{transaction.recipientBank}</h5>
          </div>

          <div className="amount-sent">
            <h5>Recipient name</h5>
            <h5>{transaction.recipientName}</h5>
          </div>

          <div className="amount-sent">
            <h5>Date & Time</h5>
            <h5>{transaction.dateTime}</h5>
          </div>

          <div className="amount-sent">
            <h5>Reference</h5>
            <h5>{transaction.reference}</h5>
          </div>

          <div className="amount-sent">
            <h5>Status</h5>
            <h5>{transaction.status}</h5>
          </div>
        </div>

        <p>
          Your transaction has been completed. Funds should be in your bank
          account soon.
        </p>
      </div>

      <div className="confirmation-down">
        <button className="reciept-btn verify" onClick={handleNext}>
          Download Receipt
        </button>
        <button className="verify" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
