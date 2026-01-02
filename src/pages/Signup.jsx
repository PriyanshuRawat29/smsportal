import { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logos/logo-primary.png";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("email");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [address, setAddress] = useState("");

  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const isValidSolomonMobile = (v) =>
    /^\d{5,7}$/.test(v);

  const isValidPassword = (password) => {
  return (
    password.length >= 6 &&
    /[A-Za-z]/.test(password) && // at least one letter
    /\d/.test(password)          // at least one number
  );
};

  const handleSignup = () => {
    setError("");
    // 🔴 Required fields validation
if (!firstName.trim()) {
  setError("First name is required");
  return;
}

if (!lastName.trim()) {
  setError("Last name is required");
  return;
}

if (!address.trim()) {
  setError("Address is required");
  return;
}


    if (loginType === "email" && !isValidEmail(value)) {
      setError("Enter a valid email address");
      return;
    }

    if (loginType === "mobile" && !isValidSolomonMobile(value)) {
      setError("Enter valid mobile number");
      return;
    }

    if (!isValidPassword(password)) {
  setError(
    "Password must be at least 6 characters and contain letters and numbers"
  );
  return;
}

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // 🔐 API call will be added later
    alert("Signup successful");
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-right">
        <div className="login-card">

          <div className="login-logo">
            <img src={logo} alt="Company Logo" />
          </div>

          <div className="login-title">Create Account</div>
    {/* First & Last Name */}
<div className="signup-row">
  <input
    type="text"
    placeholder="First Name"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Last Name"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />
</div>

{/* Address */}
<input
  type="text"
  placeholder="Address"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>

          {/* Signup Type */}
          <div className="login-type">
            <label>
              <input
                type="radio"
                checked={loginType === "email"}
                onChange={() => {
                  setLoginType("email");
                  setValue("");
                  setError("");
                }}
              />
              Email
            </label>

            <label>
              <input
                type="radio"
                checked={loginType === "mobile"}
                onChange={() => {
                  setLoginType("mobile");
                  setValue("");
                  setError("");
                }}
              />
              Mobile
            </label>
          </div>

          {/* Email / Mobile */}
                {loginType === "mobile" ? (
  <div className="mobile-inline">
    <span className="mobile-prefix">677</span>

    <input
      type="text"
      className="mobile-inline-input"
      placeholder="Enter mobile number"
      value={value}
      onChange={(e) => {
        const v = e.target.value;
        if (!/^\d*$/.test(v)) return;
        if (v.length > 7) return;
        setValue(v);
      }}
    />
  </div>
) : (
  <input
    type="text"
    placeholder="Enter your email"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
)}


          {/* Password */}
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={handleSignup}>
            Sign Up
          </button>

          <div className="forgot-password">
            <span
              className="link-button"
              onClick={() => navigate("/")}
            >
              Back to Login
            </span>
          </div>

          {error && <div className="login-error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
