import { useState, useEffect } from "react";
import logo from "../assets/logos/logo-primary.png";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function Header() {
  const navigate = useNavigate();
  // Initialize from persisted profile or login session
  const [userName, setUserName] = useState(localStorage.getItem("loggedInUser") || "User");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem("user_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfilePhoto(parsed.photo);
        if (parsed.name) setUserName(parsed.name);
      }
    };

    loadProfile();
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // 👈 clear session
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
        <span style={{ fontSize: 14 }}>
          Welcome {userName}
        </span>

        {/* Profile Icon */}
        <div
          onClick={() => setIsProfileOpen(true)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            marginLeft: 8,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.4)"
          }}
          title="Edit Profile"
        >
          {profilePhoto ? (
            <img src={profilePhoto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          )}
        </div>


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

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}

export default Header;
