import React, { useState } from 'react';
import '../styles/change-password.css';
import logo from '../assets/b-mobile-logo.png'; // Assuming logo path, adjusting if needed based on other files

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mpin, setMpin] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation Errors
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Password Validation
        // Length 8, Alphanumeric, Special Character
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

        if (!password) {
            tempErrors.password = "New Password is required";
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            tempErrors.password = "Password must be at least 8 chars, alphanumeric with a special char";
            isValid = false;
        }

        if (password !== confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        // MPIN Validation
        // Exactly 4 digits, numbers only
        const mpinRegex = /^[0-9]{4}$/;
        if (mpin && !mpinRegex.test(mpin)) {
            tempErrors.mpin = "MPIN must be exactly 4 digits (numbers only)";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Submitted", { password, mpin });
            // Redirect logic would go here
            setSuccessMessage("Password and MPIN updated successfully");
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    const handleMpinChange = (e) => {
        // Allow only numbers and max 4 digits
        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
        setMpin(value);
    };

    return (
        <div className="change-password-container">
            <div className="change-password-card">

                {/* Brand Logo Section matching the image style */}
                <div className="brand-section">
                    {/* Placeholder for the logo/banner style seen in image */}
                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>bmobile | 4G LTE</div>
                </div>

                <h2 className="page-title">Change Password</h2>

                <form onSubmit={handleSubmit}>

                    {/* New Password */}
                    <div className="form-group">
                        <label className="form-label">New Password *</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label className="form-label">Confirm Password *</label>
                        <div className="input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-input"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>

                    <div className="section-divider"></div>

                    {/* Set MPIN */}
                    <div className="form-group">
                        <h3 className="section-title">Set MPIN (Optional)</h3>
                        <label className="form-label">4-Digit PIN</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter 4-digit MPIN"
                            value={mpin}
                            onChange={handleMpinChange}
                            maxLength={4}
                            inputMode="numeric"
                        />
                        {errors.mpin && <p className="error-text">{errors.mpin}</p>}
                    </div>

                    <button type="submit" className="btn-submit">
                        Change Password
                    </button>
                    {successMessage && <div style={{ color: "green", marginTop: "10px", textAlign: "center", fontWeight: "bold" }}>{successMessage}</div>}

                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
