import logo from "../assets/logos/logo-primary.png";
import { useNavigate } from "react-router-dom";

function Header() {
   const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // go back to login
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "var(--primary-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        color: "white",
        zIndex: 1000
      }}
    >
      {/* Logo + Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Company Logo"
          style={{ height: 36, marginRight: 10 }}
        />
        <span style={{ fontWeight: "bold" }}>SMS Gateway Portal</span>
      </div>

{/* User Info + Logout */}
<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
  <span style={{ fontSize: 14 }}>Admin</span>

  <button
    onClick={handleLogout}
    style={{
      padding: "6px 12px",
      background: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.4)",
      borderRadius: 6,
      color: "#fff",
      cursor: "pointer",
      fontSize: 13
    }}
  >
    Logout
  </button>
</div>

    </div>
  );
}

export default Header;
