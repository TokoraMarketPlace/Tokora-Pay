import React, { useEffect, useState } from "react";
import "./notification.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-mdi/close";
import { motion, AnimatePresence } from "framer-motion";

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching from backend API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Example API endpoint (replace with your real backend)
        // const response = await fetch("https://your-backend.com/api/notifications");
        // const data = await response.json();
        const data = [
          { id: 1, name: "Esimvie Izu", time: "5:43 PM", amountUSDC: "1,500 USDC", amountNGN: "2,280,000 NGN", icon: "" },
          { id: 2, name: "Elisha Adewuyi", time: "21 AUG 2025 | 11:32 AM", amountUSDC: "15,000 USDC", amountNGN: "22,800,000 NGN", icon: "" },
        ];
        setNotifications(data);
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
      <motion.div
        className="notification__header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Notifications</h2>
        <motion.button
          onClick={handleClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={closeIcon} width="24" height="24" />
        </motion.button>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading notifications...
        </motion.p>
      )}

      {/* Empty state */}
      {!loading && notifications.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No new notifications available.
        </motion.p>
      )}

      {/* Notifications list */}
      <AnimatePresence>
        {!loading &&
          notifications.map((item, index) => (
            <motion.div
              key={item.id}
              className="notification__card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="card__name">
                <div className="card__icon">
                  <img
                    src={item.icon || "/default-icon.png"}
                    alt=""
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
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
