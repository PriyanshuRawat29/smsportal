import { useState, useEffect } from "react";
import "../styles/login.css";
import logo from "../assets/logos/logo-primary.png";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  const navigate = useNavigate();

  // Steps: 1 = input, 2 = otp, 3 = reset password
  const [step, setStep] = useState(1);
const [timer, setTimer] = useState(30);
const [canResend, setCanResend] = useState(false);

  const [loginType, setLoginType] = useState("email"); // email | mobile
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     VALIDATIONS
  ========================= */

  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const isValidSolomonMobile = (v) =>
    /^\d{7}$/.test(v); // 677 + 5–7 digits

  const isValidOtp = (v) =>
    /^\d{6}$/.test(v);
  const isValidPassword = (password) => {
  return (
    password.length >= 6 &&
    /[A-Za-z]/.test(password) && // at least one letter
    /\d/.test(password)          // at least one number
  );
};


  /* =========================
     HANDLERS
  ========================= */
  useEffect(() => {
  if (step !== 2 || canResend) return;

  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev === 1) {
        clearInterval(interval);
        setCanResend(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [step, canResend]);



  const handleSendOtp = () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (loginType === "email") {
        if (!isValidEmail(value)) {
          setError("Enter a valid email address");
          return;
        }
      }

      if (loginType === "mobile") {
        if (!isValidSolomonMobile(value)) {
          setError("Enter valid mobile number");
          return;
        }
      }

      // 🔐 API CALL TO SEND OTP (EMAIL / SMS)
      setStep(2);
setTimer(30);
setCanResend(false);

    }, 600);
  };

  const handleVerifyOtp = () => {
    setError("");

    if (!isValidOtp(otp)) {
      setError("OTP must be exactly 6 digits");
      return;
    }

    // 🔐 API CALL TO VERIFY OTP
    setStep(3);
  };

const handleResetPassword = () => {
  setError("");

  if (!newPassword || !confirmPassword) {
    setError("Both password fields are required");
    return;
  }

if (!isValidPassword(newPassword)) {
  setError(
    "Password must be at least 6 characters and contain letters and numbers"
  );
  return;
}


  if (newPassword !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  // 🔐 API CALL TO RESET PASSWORD (later)
  alert("Password reset successful");
  navigate("/");
};


  /* =========================
     UI
  ========================= */

  return (
    <div className="login-wrapper">
      <div className="login-right">
        <div className="login-card">

          <div className="login-logo">
            <img src={logo} alt="Company Logo" />
          </div>

          <div className="login-title">Forgot Password</div>

          {/* STEP 1: EMAIL / MOBILE INPUT */}
          {step === 1 && (
            <>
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
                  Mobile Number
                </label>
              </div>

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


              <button onClick={handleSendOtp} disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {/* STEP 2: OTP */}
{step === 2 && (
  <>
    <input
      type="text"
      placeholder="Enter 6-digit OTP"
      value={otp}
      maxLength={6}
      onChange={(e) => setOtp(e.target.value)}
    />

    <button onClick={handleVerifyOtp}>
      Verify OTP
    </button>

    <div style={{ marginTop: 12, textAlign: "center", fontSize: 13 }}>
      {canResend ? (
        <span
          className="link-button"
          onClick={handleSendOtp}
        >
          Resend OTP
        </span>
      ) : (
        <span style={{ color: "#6b7280" }}>
          Resend OTP in {timer}s
        </span>
      )}
    </div>
  </>
)}


          {/* STEP 3: RESET PASSWORD */}
         {step === 3 && (
  <>
    <input
      type="password"
      placeholder="Enter new password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />

    <input
      type="password"
      placeholder="Confirm new password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />

    <button onClick={handleResetPassword}>
      Reset Password
    </button>
  </>
)}


          {error && <div className="login-error">{error}</div>}

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
