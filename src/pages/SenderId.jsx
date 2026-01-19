import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/users.css"; // Reuse card/table styles

function SenderId() {
    const [senderIds, setSenderIds] = useState([
        { id: 1, name: "B-MOBILE", status: "Active" },
        { id: 2, name: "TEST-SMS", status: "Active" },
    ]);
    const [newSenderId, setNewSenderId] = useState("");
    const [removeId, setRemoveId] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);

    const [addError, setAddError] = useState("");
    const [addSuccess, setAddSuccess] = useState("");

    const handleAddSenderId = () => {
        setAddError("");
        setAddSuccess("");

        if (!newSenderId.trim()) {
            setAddError("Please enter a Sender ID");
            setTimeout(() => setAddError(""), 3000);
            return;
        }

        // Check duplication
        if (senderIds.some(s => s.name.toUpperCase() === newSenderId.toUpperCase())) {
            setAddError("Sender ID already exists!");
            setTimeout(() => setAddError(""), 3000);
            return;
        }

        const newItem = {
            id: Date.now(),
            name: newSenderId.toUpperCase(),
            status: "Active"
        };

        setSenderIds([...senderIds, newItem]);
        setNewSenderId("");
        setAddSuccess("Sender ID Added Successfully");
        setTimeout(() => setAddSuccess(""), 3000);
    };

    const handleInitiateDelete = () => {
        if (!removeId) return; // Do nothing if empty, or show toast
        setIsConfirming(true);
    };

    const confirmDelete = () => {
        setSenderIds(senderIds.filter(s => s.id !== parseInt(removeId)));
        setRemoveId("");
        setIsConfirming(false);
    };

    return (
        <Layout>
            <div className="users-top">
                <h2>Sender ID Management</h2>
            </div>

            {/* Add Section */}
            <div className="users-card" style={{ marginBottom: 30 }}>
                <h3>Add New Sender ID</h3>
                {addError && <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{addError}</p>}
                {addSuccess && <p style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>{addSuccess}</p>}
                <div style={{ display: "flex", gap: 14, marginTop: 14, maxWidth: 500 }}>
                    <input
                        type="text"
                        placeholder="Enter Sender ID (e.g. MYBRAND)"
                        value={newSenderId}
                        onChange={(e) => setNewSenderId(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                            fontSize: "14px"
                        }}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleAddSenderId}
                        style={{ padding: "10px 24px" }}
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Remove Section */}
            <div className="users-card" style={{ marginBottom: 30 }}>
                <h3>Remove Sender ID</h3>
                <div style={{ display: "flex", gap: 14, marginTop: 14, maxWidth: 650 }}>
                    <select
                        value={removeId}
                        onChange={(e) => {
                            setRemoveId(e.target.value);
                            setIsConfirming(false); // Reset confirmation if selection changes
                        }}
                        style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                            fontSize: "14px",
                            backgroundColor: "#fff"
                        }}
                    >
                        <option value="">Select Sender ID to Remove</option>
                        {senderIds.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>

                    <button
                        className="btn-primary"
                        onClick={isConfirming ? confirmDelete : handleInitiateDelete}
                        style={{
                            padding: "10px 24px",
                            backgroundColor: isConfirming ? "#dc2626" : "#ef4444", // Darker red on confirm
                            minWidth: "140px",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {isConfirming ? "Confirm Delete" : "Remove"}
                    </button>
                </div>
            </div>

            <div className="users-card">
                <h3>Active Sender IDs</h3>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Sender ID Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {senderIds.map((item) => (
                            <tr key={item.id}>
                                <td style={{ fontWeight: 600 }}>{item.name}</td>
                                <td>
                                    <span className="status-pill active">{item.status}</span>
                                </td>
                            </tr>
                        ))}
                        {senderIds.length === 0 && (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center", color: "#666" }}>No Sender IDs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default SenderId;
