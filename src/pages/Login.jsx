import { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logos/logo-primary.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("email"); // email | mobile

  const navigate = useNavigate();

  // ✅ Validators
  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidSolomonNumber = (value) =>
    /^\d{7}$/.test(value); // Solomon Islands = 677

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);

if (loginType === "email") {
  if (!password) {
    setError("Password is required");
    return;
  }

  if (isValidEmail(username)) {
    navigate("/dashboard");
    return;
  }

  setError("Enter a valid email address");
  return;
}

        if (loginType === "mobile") {
  if (!password) {
    setError("Password is required");
    return;
  }

  if (isValidSolomonNumber(username)) {
    navigate("/dashboard");
    return;
  }

  setError("Enter a valid Solomon Islands mobile number (677xxxxxx)");
}

      
      
    }, 600);
  };

  return (
    <div className="login-wrapper">
      <div className="login-right">
        <div className="login-card">
          <div className="login-logo">
            <img src={logo} alt="Company Logo" />
          </div>

          <div className="login-title">SMS Gateway Login</div>

          {/* 🔹 Login Type Selector */}
          <div className="login-type">
            <label>
              <input
                type="radio"
                name="loginType"
                checked={loginType === "email"}
                onChange={() => {
                  setLoginType("email");
                  setUsername("");
                  setError("");
                }}
              />
              Email
            </label>

            <label>
              <input
                type="radio"
                name="loginType"
                checked={loginType === "mobile"}
                onChange={() => {
                  setLoginType("mobile");
                  setUsername("");
                  setError("");
                }}
              />
              Mobile Number
            </label>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* 🔹 Username */}
            <label className="login-label">
              {loginType === "email"
                ? "Email Address *"
                : "Mobile Number *"}
            </label>
{loginType === "mobile" ? (
  <div className="mobile-inline">
    <span className="mobile-prefix">677</span>

    <input
      type="text"
      className="mobile-inline-input"
      placeholder="Enter mobile number"
      value={username}
      onChange={(e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        if (value.length > 7) return;
        setUsername(value);
      }}
    />
  </div>
) : (



  <input
    type="text"
    placeholder="Enter your email"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
)}


            {/* 🔹 Password */}
            <label className="login-label">Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="forgot-password">
  <span
    className="link-button"
    onClick={() => navigate("/forgot-password")}
  >
    Forgot Password?
  </span>
</div>


<div style={{ textAlign: "center", marginTop: 12 }}>
  <span style={{ fontSize: 13 }}>
    Don’t have an account?{" "}
    <span
      className="link-button"
      onClick={() => navigate("/signup")}
    >
      Sign up
    </span>
  </span>
</div>


          {error && <div className="login-error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
