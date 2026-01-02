import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";

function Sidebar() {
  const [smsOpen, setSmsOpen] = useState(false);

  return (
    <div className="sidebar">

      <NavLink to="/dashboard" className="sidebar-link" data-tooltip="Dashboard">
        <span className="icon">📊</span>
        <span className="text">Dashboard</span>
      </NavLink>

      <NavLink to="/users" className="sidebar-link" data-tooltip="Users">
        <span className="icon">👥</span>
        <span className="text">Users</span>
      </NavLink>

      {/* 🔽 SEND SMS DROPDOWN */}
      <div
        className="sidebar-link"
        data-tooltip="Send SMS"
        onClick={() => setSmsOpen(!smsOpen)}
        style={{ cursor: "pointer" }}
      >
        <span className="icon">✉️</span>
        <span className="text">Send SMS</span>
        <span style={{ marginLeft: "auto" }}>
          {smsOpen ? "▴" : "▾"}
        </span>
      </div>

      {smsOpen && (
        <div style={{ paddingLeft: 36 }}>
          <NavLink
            to="/send-sms/single"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            Single SMS
          </NavLink>

          <NavLink
            to="/send-sms/bulk"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            Bulk SMS
          </NavLink>
        </div>
      )}

      <NavLink to="/campaigns" className="sidebar-link" data-tooltip="Campaigns">
        <span className="icon">📢</span>
        <span className="text">Campaigns</span>
      </NavLink>

      <NavLink to="/reports" className="sidebar-link" data-tooltip="Reports">
        <span className="icon">📄</span>
        <span className="text">Reports</span>
      </NavLink>

      <NavLink to="/balance" className="sidebar-link" data-tooltip="Balance">
        <span className="icon">💰</span>
        <span className="text">Balance</span>
      </NavLink>

      <NavLink to="/settings" className="sidebar-link" data-tooltip="Settings">
        <span className="icon">⚙️</span>
        <span className="text">Settings</span>
      </NavLink>

      <NavLink to="/system-status" className="sidebar-link" data-tooltip="System Status">
        <span className="icon">🖥️</span>
        <span className="text">System Status</span>
      </NavLink>

    </div>
  );
}

export default Sidebar;
