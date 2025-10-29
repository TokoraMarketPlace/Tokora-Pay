import React, { useEffect, useState } from "react";
import "./recieve.css";
import Qrcode from "../../assets/qrcode.png"; // Default QR before backend loads
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Recieve = () => {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [qrCode, setQrCode] = useState(Qrcode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        // Example backend call:
        // const res = await fetch("https://api.yourapp.com/user/wallet");
        // const data = await res.json();

        // Mock example for now:
        const data = {
          accountNumber: "0123 456 7890",
          walletAddress: "CbjusgFS...KyauvBHH",
          qrCodeUrl: Qrcode, // replace with data.qrCodeUrl once backend is live
        };

        setAccountNumber(data.accountNumber);
        setWalletAddress(data.walletAddress);
        setQrCode(data.qrCodeUrl);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch wallet details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletDetails();
  }, []);

  const handlePrevious = () => {
    navigate(-1);
  };

  //  Handle share or copy logic
  const handleShare = async () => {
    const details = `Account Number: ${accountNumber}\nWallet Address: ${walletAddress}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Tokora Pay Details",
          text: details,
        });
      } else {
        await navigator.clipboard.writeText(details);
        alert("Copied to clipboard");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to share wallet details.");
    }
  };

  if (loading) {
    return <div className="recieve"><p>Loading wallet details...</p></div>;
  }

  if (error) {
    return (
      <div className="recieve">
        <p className="error">{error}</p>
        <button className="verify" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="recieve">
      <div className="header">
        <button className="previous" onClick={handlePrevious}>
          <ArrowLeft />
        </button>
        <h2>Receive</h2>
      </div>

      <div className="body">
        <img src={qrCode} alt="QR code" />
        <p>Scan QR code to receive fiat and stablecoins</p>
      </div>

      <div className="bottom">
        <div className="inputs">
          <p>Account number</p>
          <input type="text" value={accountNumber} readOnly />

          <p>Solana wallet address</p>
          <input type="text" value={walletAddress} readOnly />
        </div>

        <button className="verify" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Recieve;
