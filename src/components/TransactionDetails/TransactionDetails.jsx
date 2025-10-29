import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 underline">
        ← Back
      </button>
      <h1 className="text-2xl font-bold">Transaction Details</h1>
      <p>Transaction ID: {id}</p>
      {/* Later, you can fetch transaction details from backend using this id */}
    </div>
  );
};

export default TransactionDetails;