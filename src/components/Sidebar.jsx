import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [smsOpen, setSmsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Automatically open dropdowns if current path is inside them
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/send-sms") || path.includes("/campaigns")) {
      setSmsOpen(true);
    }
    if (path.includes("/dnd-management") || path.includes("/blacklist-user") || path.includes("/block-user-management")) {
      setSettingsOpen(true);
    }
  }, [location.pathname]);


  return (
    <div className="sidebar">



      <NavLink to="/users" className="sidebar-link" data-tooltip="Users">
        <span className="icon">👥</span>
        <span className="text">Users</span>
      </NavLink>

      <NavLink to="/sender-ids" className="sidebar-link" data-tooltip="Sender ID">
        <span className="icon">🆔</span>
        <span className="text">Sender ID Management</span>
      </NavLink>

      {/* 🔽 CAMPAIGNS DROPDOWN */}
      <div
        className="sidebar-link"
        data-tooltip="Campaigns"
        onClick={() => setSmsOpen(!smsOpen)}
        style={{ cursor: "pointer" }}
      >
        <span className="icon">📢</span>
        <span className="text">Campaigns</span>
        <span style={{ marginLeft: "auto" }}>
          {smsOpen ? "▴" : "▾"}
        </span>
      </div>

      {smsOpen && (
        <div className="submenu">


          <NavLink
            to="/send-sms/single"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            <span className="text">Single SMS</span>
          </NavLink>

          <NavLink
            to="/send-sms/bulk"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            <span className="text">Bulk SMS</span>
          </NavLink>

          <NavLink
            to="/campaigns/scheduled"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            <span className="text">Scheduled Campaigns</span>
          </NavLink>
        </div>
      )}

      <NavLink to="/reports" className="sidebar-link" data-tooltip="Reports">
        <span className="icon">📄</span>
        <span className="text">Reports</span>
      </NavLink>

      <NavLink to="/balance" className="sidebar-link" data-tooltip="Balance">
        <span className="icon">💰</span>
        <span className="text">Balance</span>
      </NavLink>

      {/* 🔽 SETTINGS DROPDOWN */}
      <div
        className="sidebar-link"
        data-tooltip="Settings"
        onClick={() => setSettingsOpen(!settingsOpen)}
        style={{ cursor: "pointer" }}
      >
        <span className="icon">⚙️</span>
        <span className="text">Settings</span>
        <span style={{ marginLeft: "auto" }}>
          {settingsOpen ? "▴" : "▾"}
        </span>
      </div>

      {settingsOpen && (
        <div className="submenu">
          <NavLink
            to="/dnd-management"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            <span className="text">DND Management</span>
          </NavLink>
          <NavLink
            to="/blacklist-user"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            <span className="text">Blacklist User</span>
          </NavLink>
          <NavLink
            to="/block-user-management"
            className="sidebar-link"
            style={{ fontSize: 13 }}
          >
            <span className="text">Block User Management</span>
          </NavLink>
        </div>
      )}

      <NavLink to="/system-status" className="sidebar-link" data-tooltip="System Status">
        <span className="icon">🖥️</span>
        <span className="text">System Status</span>
      </NavLink>

      <NavLink to="/dashboard" className="sidebar-link" data-tooltip="Dashboard">
        <span className="icon">📊</span>
        <span className="text">Dashboard</span>
      </NavLink>

    </div>
  );
}

export default Sidebar;
