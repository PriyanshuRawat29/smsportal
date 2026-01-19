import { useState } from "react";

function ProfileModal({ isOpen, onClose }) {
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("user_profile");
        return saved ? JSON.parse(saved) : {
            name: "User Name",
            email: "user@example.com",
            mobile: "+677 1234567",
            address: "Honiara, Solomon Islands",
            photo: null
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem("user_profile", JSON.stringify(profile));
        window.dispatchEvent(new Event("profileUpdated")); // Notify other components
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1100
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: 30,
                    borderRadius: 12,
                    width: 400,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    color: "#333",
                    position: "relative"
                }}
            >
                <h3 style={{ marginTop: 0, marginBottom: 20, textAlign: "center" }}>Edit Profile</h3>

                {/* Profile Photo Area */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 25, position: "relative" }}>
                    <div
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            backgroundColor: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            border: "3px solid #fff",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            position: "relative"
                        }}
                    >
                        {profile.photo ? (
                            <img src={profile.photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            <span style={{ fontSize: "40px", color: "#9ca3af" }}>👤</span>
                        )}
                    </div>

                    {/* Camera Upload Icon */}
                    <label
                        htmlFor="photo-upload"
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: "36%", /* Adjust to sit on the edge of the circle */
                            backgroundColor: "#008069", /* WhatsApp Green */
                            color: "white",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            border: "2px solid #fff"
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    </label>
                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                    />
                </div>

                {/* Fields */}
                <div style={{ marginBottom: 15 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Mobile No.</label>
                    <input
                        type="text"
                        name="mobile"
                        value={profile.mobile}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: 25 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px", borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
                    />
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 20px",
                            borderRadius: 8,
                            border: "none",
                            background: "#E60000", /* Red */
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 500
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: "10px 20px",
                            borderRadius: 8,
                            border: "none",
                            background: "#4CAF50", /* Green */
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 500
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
