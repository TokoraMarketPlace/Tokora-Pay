import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Bell, User } from "lucide-react";
import Logo from "../../assets/TokoraPayLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BGImage from "../../assets/logon.png";
import TransactionRow from "../Transactionrow/TransactionRow";
import { Icon } from "@iconify/react";
import paperImage from "@iconify/icons-mdi/paper-plane";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [user, setUser] = useState({ name: "", balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Fetch user + transactions from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example backend endpoints
        // const res = await fetch("https://api.tokorapay.com/dashboard");
        // const data = await res.json();

        // Mock data for now
        const data = {
          name: "Godknows Ukari",
          balance: 151250.0,
          transactions: [
            { id: 1, type: "sent", name: "Esimvie Izu", amount: "1,500 USDC", ngn: "2,280,000 NGN", time: "5:43 PM" },
            { id: 2, type: "received", name: "Elisha Adewuyi", amount: "15,000 USDC", ngn: "22,800,000 NGN", time: "21 AUG 2025 | 11:32 AM" },
            { id: 3, type: "sent", name: "Oviemeya Adedeji", amount: "800 USDC", ngn: "1,216,000 NGN", time: "18 AUG 2025 | 7:08 AM" },
            { id: 4, type: "sent", name: "Samuel Ekpo", amount: "60 USDC", ngn: "91,200 NGN", time: "15 AUG 2025 | 12:21 PM" },
            { id: 5, type: "received", name: "Tosin Femi", amount: "3,200 USDC", ngn: "4,992,000 NGN", time: "14 AUG 2025 | 2:15 PM" },
            { id: 6, type: "sent", name: "Chinedu Okeke", amount: "900 USDC", ngn: "1,404,000 NGN", time: "12 AUG 2025 | 9:00 AM" },
            { id: 7, type: "received", name: "Aisha Bello", amount: "5,000 USDC", ngn: "7,800,000 NGN", time: "10 AUG 2025 | 11:45 AM" },
            { id: 8, type: "sent", name: "Femi Ade", amount: "120 USDC", ngn: "187,200 NGN", time: "09 AUG 2025 | 4:30 PM" },
          ],
        };

        setUser({ name: data.name, balance: data.balance });
        setTransactions(data.transactions);
      } catch (err) {
        console.error(err);
        alert("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSend = () => navigate("/transfer");
  const handleDeposit = () => navigate("/recieve");
  const handleUser = () => navigate("/settings");
  const handleNotification = () => navigate("/notification")

  const toggleBalance = () => setHideBalance(!hideBalance);

  if (loading) {
    return (
      <div className="home">
        <p className="loading">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Header */}
      <motion.div
        className="home-header"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={Logo} alt="TokoraPay Logo" className="home-logo" />
        <div className="home-icons">
          <button className="notify-btn" onClick={handleNotification}>
            <Bell size={22} />
            <span className="notify-badge">3</span>
          </button>
          <button onClick={handleUser}>
            <User size={22} />
          </button>
        </div>
      </motion.div>

      {/* Greeting */}
      <motion.div
        className="home-greeting"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1>Good Morning</h1>
        <p>{user.name}</p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        className="home-balance-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <img src={BGImage} alt="card background" className="card-bg" />
        <div className="card-overlay"></div>
        <div className="card-content">
          <p>Account Balance</p>
          <div className="balance-display">
            <h2>{hideBalance ? "********" : `$${user.balance.toLocaleString()}`}</h2>
            <button onClick={toggleBalance}>
              {hideBalance ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="card-buttons">
            <button className="send-btn" onClick={handleSend}>
              <Icon icon={paperImage} style={{ transform: "rotate(-45deg)" }} />
              Send
            </button>
            <button className="receive-btn" onClick={handleDeposit}>
              <Icon icon={paperImage} style={{ transform: "rotate(135deg)" }} />
              Receive
            </button>
          </div>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        className="home-transactions"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="trans-header">
          <h3>Transaction History</h3>
          <button onClick={() => setExpandedHistory(true)}>View All</button>
        </div>

        <div className="trans-list">
          {transactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      </motion.div>

      {/* Expanded Transactions Modal */}
      {expandedHistory && (
        <motion.div
          className="trans-modal"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <div className="trans-modal-header">
            <h3>All Transactions</h3>
            <button onClick={() => setExpandedHistory(false)}>Close</button>
          </div>

          <div className="trans-modal-body">
            {transactions.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
