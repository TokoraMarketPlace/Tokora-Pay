import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./connectwallet.css";
import Metamask from "../../assets/Metamask.png";
import Phantom from "../../assets/Phantom.png";
import Solflare from "../../assets/Solfare.png";
import Coinbase from "../../assets/Coinbase.png";

const wallets = [
  { name: "Metamask", icon: Metamask },
  { name: "Phantom", icon: Phantom },
  { name: "Solflare", icon: Solflare },
  { name: "Coinbase", icon: Coinbase },
];

const Connectwallet = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleWalletClick = (walletName) => {
    setSelectedWallet(walletName);
  };

  const handleConnect = async () => {
    if (!selectedWallet) {
      alert("Please select a wallet first.");
      return;
    }

    console.log(`✅ Connecting to ${selectedWallet}...`);
    try {
      alert(`Connected to ${selectedWallet} successfully!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet. Try again.");
    }
  };

  return (
    <div className="connectwallet-container">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="wallet-sheet"
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Connect Wallet
            </motion.h2>
            <motion.p
              className="wallet-subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get started by connecting your preferred wallet below.
            </motion.p>

            <div className="wallet-options">
              {wallets.map((wallet, idx) => (
                <motion.button
                  key={wallet.name}
                  onClick={() => handleWalletClick(wallet.name)}
                  className={`wallet-btn ${
                    selectedWallet === wallet.name ? "selected" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <img src={wallet.icon} alt={wallet.name} />
                  <span>{wallet.name}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={handleConnect}
              className="connect-btn"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Connect
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Connectwallet;
