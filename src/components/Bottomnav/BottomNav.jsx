import React from "react";
import { NavLink } from "react-router-dom";
import "./bottomnav.css"; // import your CSS file
import { Icon } from "@iconify/react"; // Iconify for icons

export default function BottomNav({ showNav = true }) {
  return (
    <div
      className={`bottom-nav ${showNav ? "slide-up" : "slide-down"}`}
    >
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""}`
        }
      >
        <Icon icon="mdi:home" className="nav-icon" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/transfer"
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""}`
        }
      >
        <Icon icon="mdi:send" className="nav-icon" />
        <span>Transfer</span>
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""}`
        }
      >
        <Icon icon="mdi:history" className="nav-icon" />
        <span>History</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""}`
        }
      >
        <Icon icon="mdi:cog-outline" className="nav-icon" />
        <span>Settings</span>
      </NavLink>
    </div>
  );
}
