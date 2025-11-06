import React, { useEffect, useRef, useState } from "react";
import "./reciept.css";
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-mdi/close";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import Success from "../../assets/Check icon.png";
import Usdc from "../../assets/USDC Logo.png";
import Nigeria from "../../assets/nigeria.png";

const Reciept = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // for fetching specific transaction by ID later
  const receiptRef = useRef(null);

  const [transaction, setTransaction] = useState({
    status: "Completed",
    sentAmount: "60 USDC",
    receivedAmount: "92,275 NGN",
    fee: "0 NGN",
    recipientBank: "Opay - 0123456789",
    recipientName: "Samuel Ekpo",
    dateTime: "15 AUG 2025 | 12:21 PM",
    reference: "BCD_d8adf434mbsdfh",
  });

  // 🔹 Simulated backend fetch — replace with your API later
  useEffect(() => {
    // Example fetch when backend is ready:
    // fetch(`/api/transactions/${id}`)
    //   .then(res => res.json())
    //   .then(data => setTransaction(data))
    //   .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const handleClose = () => navigate("/dashboard");

  const handleShare = async () => {
    try {
      // Capture the receipt as an image
      const canvas = await html2canvas(receiptRef.current);
      const image = canvas.toDataURL("image/png");

      // Download the image automatically
      const link = document.createElement("a");
      link.href = image;
      link.download = `receipt-${transaction.reference}.png`;
      link.click();

      // Trigger share options (if supported)
      if (navigator.share) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], "receipt.png", { type: "image/png" });

        await navigator.share({
          title: "Transaction Receipt",
          text: "Here’s your transaction receipt.",
          files: [file],
        });
      } else {
        alert("Receipt downloaded. Share manually if your device doesn’t support direct sharing.");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Error generating receipt. Try again.");
    }
  };

  return (
    <div className="reciept" ref={receiptRef}>
      <div className="reciept-header">
        <button onClick={handleClose}>
          <Icon icon={closeIcon} width="30" height="30" />
        </button>
      </div>

      <div className="reciept-body">
        <div className="reciept-title">
          <h6>
            <img src={Success} alt="" /> Transaction Successful
          </h6>
        </div>

        <div className="reciept-def">
          <div className="reciept-words">
            <h5>Sent</h5>
            <h6>
              <img src={Usdc} alt="" /> {transaction.sentAmount}
            </h6>
          </div>
          <div className="reciept-words">
            <h5>Received</h5>
            <h6>
              <img src={Nigeria} alt="" /> {transaction.receivedAmount}
            </h6>
          </div>
          <div className="reciept-words">
            <h5>Fee</h5>
            <h6>{transaction.fee}</h6>
          </div>
          <div className="reciept-words">
            <h5>Recipient bank</h5>
            <h6>{transaction.recipientBank}</h6>
          </div>
          <div className="reciept-words">
            <h5>Recipient name</h5>
            <h6>{transaction.recipientName}</h6>
          </div>
          <div className="reciept-words">
            <h5>Date & Time</h5>
            <h6>{transaction.dateTime}</h6>
          </div>
          <div className="reciept-words">
            <h5>Reference</h5>
            <h6>{transaction.reference}</h6>
          </div>
          <div className="reciept-words">
            <h5>Status</h5>
            <h6>{transaction.status}</h6>
          </div>
        </div>
      </div>

      <div className="reciept-footer">
        <button className="verify" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Reciept;
