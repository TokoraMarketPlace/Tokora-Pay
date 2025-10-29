import React, { useEffect, useState } from "react";
import "./notification.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-mdi/close";

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching from backend API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Example API endpoint (replace with your real backend)
        const response = await fetch("https://your-backend.com/api/notifications");
        const data = await response.json();
        setNotifications(data); // Expected: [{ id, name, time, amountUSDC, amountNGN, icon }]
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="notification">
      {/* Header */}
      <div className="notification__header">
        <h2>Notifications</h2>
        <button onClick={handleClose}><Icon icon={closeIcon} width="24" height="24" /></button>
      </div>

      {/* Loading state */}
      {loading && <p>Loading notifications...</p>}

      {/* Empty state */}
      {!loading && notifications.length === 0 && (
        <p>No new notifications available.</p>
      )}

      {/* Notifications list */}
      {!loading &&
        notifications.map((item) => (
          <div key={item.id} className="notification__card">
            <div className="card__name">
              <div className="card__icon">
                <img
                  src={item.icon || "/default-icon.png"}
                  alt="Notification icon"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </div>
              <div className="card__text">
                <h4>{item.name}</h4>
                <p>{item.time}</p>
              </div>
            </div>
            <div className="card__amount">
              <h4>{item.amountUSDC}</h4>
              <p>{item.amountNGN}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notification;