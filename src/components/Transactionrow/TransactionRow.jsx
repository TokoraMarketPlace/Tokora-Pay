import React from "react";
import { useNavigate } from "react-router-dom";
import "./transactionrow.css";

const TransactionRow = ({ tx }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/transaction/${tx.id}`); // 👈 dynamic route
  };

  return (
    <div
      className="transaction-row"
      onClick={handleClick}
    >
      <div className="transaction-avatar">
        {tx.name.charAt(0)}
      </div>

      <div className="transaction-info">
        <p className="transaction-name">
          {tx.type === "sent" ? "Sent to" : "Received from"} {tx.name}
        </p>
        <span className="transaction-time">{tx.time}</span>
      </div>

      <div className="transaction-amount">
        <p className={tx.type === "sent" ? "sent" : "received"}>
          {tx.amount}
        </p>
        <span className="transaction-ngn">{tx.ngn}</span>
      </div>
    </div>
  );
};

export default TransactionRow;
