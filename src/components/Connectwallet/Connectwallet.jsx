import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    // Trigger the bottom sheet animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // When a wallet option is clicked
  const handleWalletClick = (walletName) => {
    console.log(`🖱️ ${walletName} clicked!`);
    setSelectedWallet(walletName);
  };

  // Handle Connect button click (ready for backend)
  const handleConnect = async () => {
    if (!selectedWallet) {
      alert("Please select a wallet first.");
      return;
    }

    console.log(`✅ Connecting to ${selectedWallet}...`);

    try {
      //  Placeholder: Backend logic will go here
      // Example (to be replaced later):
      // await connectWalletAPI(selectedWallet);
      // Or: await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Temporary success log
      alert(`Connected to ${selectedWallet} successfully!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet. Try again.");
    }
  };

  return (
    <div className="connectwallet-container">
      <div
        className={`wallet-sheet ${isVisible ? "visible" : ""}`}
      >
        <h2>Connect Wallet</h2>
        <p className="wallet-subtext">
          Get started by connecting your preferred wallet below.
        </p>

        <div className="wallet-options">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletClick(wallet.name)}
              className={`wallet-btn ${
                selectedWallet === wallet.name ? "selected" : ""
              }`}
            >
              <img src={wallet.icon} alt={wallet.name} />
              <span>{wallet.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleConnect}
          className="connect-btn"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Connectwallet;
