import React, { useState } from "react";
import "../styles/create-user.css";

function CreateUserForm({ onCancel, onSave, existingUsers = [] }) {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobile: "",
        addressLine: "",
        city: "",
        region: "",
        role: "User",
        password: "",
        status: true
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Mobile validation (numbers only, max 7 digits)
        if (name === "mobile") {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 7) return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        // Clear error when user starts typing password
        if (name === "password") setError("");
    };

    const isValidPassword = (password) => {
        // Alphanumeric + Special Character, min 8 chars
        // Using a broader regex for special characters (anything not letter or number)
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        return password.length >= 8 && hasLetter && hasNumber && hasSpecial;
    };

    const handleSubmit = () => {
        // Clear previous error
        setError("");

        if (!formData.firstName) {
            setError("First Name is required");
            return;
        }
        if (!formData.email) {
            setError("Email ID is required");
            return;
        }
        if (!formData.mobile) {
            setError("Mobile Number is required");
            return;
        }
        if (!formData.addressLine) {
            setError("Address is required");
            return;
        }
        if (!formData.city) {
            setError("City is required");
            return;
        }
        if (!formData.region) {
            setError("Province is required");
            return;
        }

        // Password Validation
        if (!isValidPassword(formData.password)) {
            setError("Password length must be 8 and should contain a letter , number and a special character");
            return;
        }

        // Prepare data for save (prepend +677 to mobile if present)
        // Construct username from names
        const fullName = [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(" ");

        const userToSave = {
            ...formData,
            username: fullName, // Use fullName as username for backward compatibility
            mobile: formData.mobile ? `+677${formData.mobile}` : ""
        };

        // NEW: Check for duplicate mobile number
        if (userToSave.mobile) {
            const isDuplicate = existingUsers.some(u => u.mobile === userToSave.mobile);
            if (isDuplicate) {
                setError("Mobile number is already in use by another user.");
                return;
            }
        }

        onSave(userToSave);
        onCancel();
    };

    return (
        <div className="users-card form-card" style={{ maxWidth: 800, margin: "0 auto" }}>
            <h3>Create New User</h3>

            <div className="form-grid">
                {/* Row 1 */}
                {/* Row 1 */}
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                </div>

                <div>
                    <label>Middle Name</label>
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder="Middle Name"
                    />
                </div>

                {/* Row 2 */}
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
                </div>



                <div>
                    <label>Email ID</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                    />
                </div>

                {/* Row 2 */}
                <div>
                    <label>Mobile Number</label>
                    <div className="mobile-group">
                        <div className="mobile-prefix-box">+677</div>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            style={{ flex: 1, height: "46px" }}
                        />
                    </div>
                </div>

                <div>
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option>User</option>
                        <option>Admin</option>
                        <option>SuperAdmin</option>
                    </select>
                </div>

                {/* Row 3: Address Line (Full Width) */}
                <div style={{ gridColumn: "1 / -1" }}>
                    <label>Address</label>
                    <input
                        type="text"
                        name="addressLine"
                        value={formData.addressLine}
                        onChange={handleChange}
                        placeholder="Address Line"
                    />
                </div>

                {/* Row 4: City & Region */}
                <div style={{ gridColumn: "1 / -1" }}>
                    <div className="split-row">
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <select
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Province</option>
                                <option value="Central Province">Central Province</option>
                                <option value="Choiseul Province">Choiseul Province</option>
                                <option value="Guadalcanal Province">Guadalcanal Province</option>
                                <option value="Isabel Province">Isabel Province</option>
                                <option value="Makira-Ulawa Province">Makira-Ulawa Province</option>
                                <option value="Malaita Province">Malaita Province</option>
                                <option value="Rennell and Bellona Province">Rennell and Bellona Province</option>
                                <option value="Temotu Province">Temotu Province</option>
                                <option value="Western Province">Western Province</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Row 5 */}
                <div>
                    <label>Password</label>
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            style={{ paddingRight: "40px" }}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#6b7280"
                            }}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .88-.03 1.31-.09" /><path d="m2 2 20 20" /></svg>
                            )}
                        </span>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </div>

                <div></div>
            </div>

            <div className="form-actions" style={{ marginTop: 30 }}>
                <button
                    className="btn-outline btn-cancel"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="btn-primary btn-save"
                    onClick={handleSubmit}
                >
                    Save User
                </button>
            </div>
        </div>
    );
}

export default CreateUserForm;
