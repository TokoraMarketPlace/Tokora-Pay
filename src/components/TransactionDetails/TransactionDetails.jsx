import React from "react";
import "./transactiondetails.css"
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const TransactionDetails = () => {
  const { id, time, amount, name, bank, account_number, reference } = useParams()
  const navigate = useNavigate();

  return (


    <div className="details">
      <div className="details-header">
        <button onClick={() => navigate(-1)}>
        <BiArrowBack />
      </button>
      <h2>Transaction Details</h2>
      </div>
      <div className="transaction-body">
        <div className="amount-sent">
          <h6>Sent</h6>
          <p>{amount}</p>
        </div>
        <div className="amount-recieved">
          <h6>Recieved</h6>
          <p>{amount}</p>
        </div>
        <div className="sender-info">
          <p>{name}</p>
          <p>{time}</p>
        </div>
        
        <p>{id}</p>
      </div>
      
      <div className="transaction-footer">
        <div className="sent-to">
          <p>To</p>
          <p>{bank}</p>
        </div>
        <div className="bank-account">
          <p>Account</p>
          <p>{account_number}</p>
        </div>
        <div className="reference-id">
          <p>Reference</p>
          <p>{reference}</p>
        </div>
      </div>
      {/* Later, you can fetch transaction details from backend using this id */}

    </div>

  )
};

export default TransactionDetails;