import { useState } from "react";
import "../styles/signup.css";
import logo from "../assets/logos/logo-primary.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Details, 2: OTP & Password

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Step 2 Fields
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Errors
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidSolomonMobile = (v) => /^\d{7}$/.test(v); // 7 digits after +677

  const isValidPassword = (password) => {
    // Alphanumeric + Special Character, min 6 chars
    return (
      password.length >= 6 &&
      /[A-Za-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleSendOtp = () => {
    setError("");

    // --- Validation (Step 1) ---
    if (!firstName.trim()) return setError("First name is required");
    if (!lastName.trim()) return setError("Last name is required");
    // Company Name is optional based on previous context, but strictly speaking user said "check all field leaving company name"
    if (!addressLine.trim()) return setError("Address Line is required");
    if (!city.trim()) return setError("City is required");
    if (!region.trim()) return setError("Region is required");

    if (!email.trim() || !isValidEmail(email)) {
      return setError("Enter a valid email address");
    }

    if (!mobile.trim() || !isValidSolomonMobile(mobile)) {
      return setError("Enter a valid 7-digit mobile number");
    }

    // --- Proceed to Step 2 ---
    setStep(2);
    setSuccess("OTP sent to your mobile number");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleSignup = () => {
    setError("");

    // --- Validation (Step 2) ---
    if (otp.length !== 6) {
      return setError("Please enter a valid 6-digit OTP");
    }

    if (!isValidPassword(password)) {
      return setError("Password must be at least 6 characters, include a number, a letter, and a special character.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    // --- Success ---
    setSuccess("Signup successful! Redirecting...");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-right">
        <div className={`login-card ${step === 2 ? "fade-in-slide" : ""}`}>

          <div className="login-logo">
            <img src={logo} alt="Company Logo" />
          </div>

          <div className="login-title">
            {step === 1 ? "Create Account" : "Verify & Secure"}
          </div>

          {step === 1 && (
            <>
              {/* Name Row */}
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

              {/* Company & Address */}
              <input
                type="text"
                placeholder="Company Name (Optional)"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address Line"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
              />

              {/* City & Region */}
              <div className="signup-row">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>

              {/* Email (First) */}
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Mobile (Second) */}
              <div className="mobile-inline">
                <span className="mobile-prefix mobile-code">+677</span>
                <input
                  type="text"
                  className="mobile-inline-input"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!/^\d*$/.test(v)) return;
                    if (v.length > 7) return;
                    setMobile(v);
                  }}
                />
              </div>

              <button onClick={handleSendOtp}>Send OTP</button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="otp-info">
                Enter the code sent to +677 {mobile}
              </div>

              {/* OTP Input */}
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                style={{ letterSpacing: "4px", textAlign: "center", fontWeight: "bold" }}
                onChange={(e) => {
                  const v = e.target.value;
                  if (!/^\d*$/.test(v)) return;
                  setOtp(v);
                }}
              />

              {/* Password */}
              <label className="login-label">Create Password *</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .88-.03 1.31-.09" /><path d="m2 2 20 20" /></svg>
                  )}
                </span>
              </div>

              {/* Confirm Password */}
              <label className="login-label">Confirm Password *</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .88-.03 1.31-.09" /><path d="m2 2 20 20" /></svg>
                  )}
                </span>
              </div>

              <button onClick={handleSignup}>Sign Up</button>
            </>
          )}

          <div className="forgot-password" style={{ marginTop: '15px' }}>
            <span className="link-button" onClick={handleBackToLogin}>
              Back to Login
            </span>
          </div>

          {error && <div className="login-error">{error}</div>}

          {success && <div className="login-success">{success}</div>}

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
