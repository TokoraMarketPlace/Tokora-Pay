import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TransactionRow from "../Transactionrow/TransactionRow.jsx";
import "./history.css";

const dummyTransactions = [
  { id: 1, type: "sent", name: "Esimvie Izu", amount: "1,500 USDC", ngn: "2,280,000 NGN", time: "5:43 PM" },
  { id: 2, type: "received", name: "Elisha Adewuyi", amount: "15,000 USDC", ngn: "22,800,000 NGN", time: "21 AUG 2025 | 11:32 AM" },
  { id: 3, type: "sent", name: "Oviemeya Adedeji", amount: "800 USDC", ngn: "1,216,000 NGN", time: "18 AUG 2025 | 7:08 AM" },
  { id: 4, type: "sent", name: "Samuel Ekpo", amount: "60 USDC", ngn: "91,200 NGN", time: "15 AUG 2025 | 12:21 PM" },
  { id: 5, type: "received", name: "Tosin Femi", amount: "3,200 USDC", ngn: "4,992,000 NGN", time: "14 AUG 2025 | 2:15 PM" },
  { id: 6, type: "sent", name: "Chinedu Okeke", amount: "900 USDC", ngn: "1,404,000 NGN", time: "12 AUG 2025 | 9:00 AM" },
  { id: 7, type: "received", name: "Aisha Bello", amount: "5,000 USDC", ngn: "7,800,000 NGN", time: "10 AUG 2025 | 11:45 AM" },
  { id: 8, type: "sent", name: "Femi Ade", amount: "120 USDC", ngn: "187,200 NGN", time: "09 AUG 2025 | 4:30 PM" },
];

const History = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handlePrevious = () => {
    navigate("/dashboard");
  };

  const filteredTransactions = dummyTransactions.filter((tx) =>
    tx.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="history">
      {/* Header */}
      <div className="history__header">
        <button onClick={handlePrevious} className="history__back-btn">
          <BiArrowBack />
        </button>
        <h3 className="history__title">Transaction</h3>
      </div>

      {/* Search */}
      <div className="history__search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search transfers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scrollable list */}
      <div className="history__list">
        {filteredTransactions.map((tx) => (
          <TransactionRow key={tx.id} tamount={tx.amount} tname={tx.name} ttype={tx.type} ttime={tx.time} tx={tx} />
        ))}
        {filteredTransactions.length === 0 && (
          <p className="history__empty">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
