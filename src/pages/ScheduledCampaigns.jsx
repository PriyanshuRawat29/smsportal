import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/scheduled-campaigns.css'; // Ensure you update CSS for wider modal if needed

function ScheduledCampaigns() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const storedCampaigns = JSON.parse(localStorage.getItem("scheduled_campaigns") || "[]");
        setCampaigns(storedCampaigns);
    }, []);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [saveConfirm, setSaveConfirm] = useState(false); // For "Confirm Save"

    const updateLocalStorage = (updatedCampaigns) => {
        localStorage.setItem("scheduled_campaigns", JSON.stringify(updatedCampaigns));
        setCampaigns(updatedCampaigns);
    };

    const handleEditClick = (campaign) => {
        setEditingCampaign({ ...campaign });
        setIsEditModalOpen(true);
        setDeleteConfirmId(null);
        setSaveConfirm(false);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setEditingCampaign(null);
        setSaveConfirm(false);
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setEditingCampaign((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        setSaveConfirm(true);
    };

    const handleFinalSave = () => {
        // Reconstruct the scheduledTime string if date/time changed individually
        // For simplicity in this demo, we are editing the full string or individual parts if they exist
        // If we added date/time pickers, we would combine them here.
        // For now, assuming 'scheduledTime' field is being edited directly or we rely on the input.

        const updatedCampaigns = campaigns.map((c) =>
            c.id === editingCampaign.id ? editingCampaign : c
        );
        updateLocalStorage(updatedCampaigns);
        handleModalClose();
    };

    const handleDeleteClick = (id) => {
        setDeleteConfirmId(id);
    };

    const handleConfirmDelete = (id) => {
        const updatedCampaigns = campaigns.filter(c => c.id !== id);
        updateLocalStorage(updatedCampaigns);
        setDeleteConfirmId(null);
    };

    return (
        <Layout>
            <div className="scheduled-wrapper">
                <h2 className="scheduled-title">Scheduled Campaigns</h2>

                <div className="scheduled-card">
                    <div className="scheduled-table-container">
                        {campaigns.length === 0 ? (
                            <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
                                No scheduled campaigns found.
                            </div>
                        ) : (
                            <table className="scheduled-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                                Campaign Name
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                                Sender ID
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                SMS Type
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                Scheduled Time
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                                Source
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                                Actions
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigns.map((campaign) => (
                                        <tr key={campaign.id}>
                                            <td>{campaign.name}</td>
                                            <td>{campaign.senderId}</td>
                                            <td>
                                                <span className={`type-badge ${campaign.type}`}>
                                                    {campaign.type === 'normal' ? 'Normal SMS' : 'Flash SMS'}
                                                </span>
                                            </td>
                                            <td>{campaign.scheduledTime}</td> {/* Or combine date/time if stored separately */}
                                            <td style={{ fontSize: "12px", color: "#6b7280" }}>{campaign.source || "Unknown"}</td>
                                            <td>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEditClick(campaign)}
                                                    >
                                                        Edit
                                                    </button>

                                                    {deleteConfirmId === campaign.id ? (
                                                        <button
                                                            className="btn-edit"
                                                            style={{ borderColor: "#E60000", backgroundColor: "#E60000", color: "white" }}
                                                            onClick={() => handleConfirmDelete(campaign.id)}
                                                        >
                                                            Confirm
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn-edit"
                                                            style={{ borderColor: "#E60000", color: "#E60000" }}
                                                            onClick={() => handleDeleteClick(campaign.id)}
                                                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E60000"; e.currentTarget.style.color = "white"; }}
                                                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#E60000"; }}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Edit Modal */}
            {isEditModalOpen && editingCampaign && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ width: "800px", maxWidth: "95%" }}> {/* Wider modal */}
                        <div className="modal-header">
                            <h3 className="modal-title">Edit Campaign Details</h3>
                            <button className="modal-close" onClick={handleModalClose}>&times;</button>
                        </div>

                        <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                            {/* Left Column */}
                            <div>
                                <div className="modal-form-group">
                                    <label className="modal-label">Campaign Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="modal-input"
                                        value={editingCampaign.name}
                                        onChange={handleModalChange}
                                    />
                                </div>

                                <div className="modal-form-group">
                                    <label className="modal-label">Sender ID</label>
                                    <select
                                        name="senderId"
                                        className="modal-select"
                                        value={editingCampaign.senderId}
                                        onChange={handleModalChange}
                                    >
                                        <option value="B-MOBILE">B-MOBILE</option>
                                        <option value="TEST-SMS">TEST-SMS</option>
                                        <option value="ALERT">ALERT</option>
                                    </select>
                                </div>

                                <div className="modal-form-group">
                                    <label className="modal-label">SMS Type</label>
                                    <select
                                        name="type"
                                        className="modal-select"
                                        value={editingCampaign.type}
                                        onChange={handleModalChange}
                                    >
                                        <option value="normal">Normal SMS</option>
                                        <option value="flash">Flash SMS</option>
                                    </select>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div>
                                <div className="modal-form-group">
                                    <label className="modal-label">Scheduled Time (YYYY-MM-DD HH:MM AM/PM)</label>
                                    <input
                                        type="text"
                                        name="scheduledTime" // Editing the string directly for now
                                        className="modal-input"
                                        value={editingCampaign.scheduledTime || ""}
                                        onChange={handleModalChange}
                                    />
                                </div>

                                {/* Display Source Info (ReadOnly) */}
                                <div className="modal-form-group">
                                    <label className="modal-label" style={{ color: "#6b7280" }}>Source</label>
                                    <div style={{ padding: "10px", backgroundColor: "#f3f4f6", borderRadius: "6px", fontSize: "14px" }}>
                                        {editingCampaign.source}
                                        {editingCampaign.source === "Bulk SMS" && editingCampaign.fileName && (
                                            <span style={{ display: "block", fontSize: "12px", marginTop: "4px" }}>File: {editingCampaign.fileName}</span>
                                        )}
                                        {editingCampaign.source === "Single SMS" && editingCampaign.recipients && (
                                            <span style={{ display: "block", fontSize: "12px", marginTop: "4px" }}>Recipients: {editingCampaign.recipients.join(", ")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Full Width Message Area */}
                            <div style={{ gridColumn: "1 / -1" }}>
                                <div className="modal-form-group">
                                    <label className="modal-label">Message Content</label>
                                    <textarea
                                        name="message"
                                        className="modal-input"
                                        rows="4"
                                        value={editingCampaign.message || ""}
                                        onChange={handleModalChange}
                                        style={{ fontFamily: "inherit" }}
                                    />
                                    <div style={{ textAlign: "right", fontSize: "12px", color: "#6b7280" }}>
                                        {(editingCampaign.message || "").length} characters
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="modal-actions" style={{ borderTop: "1px solid #e5e7eb", paddingTop: "20px" }}>
                            <button className="btn-modal-cancel" onClick={handleModalClose}>
                                Cancel
                            </button>

                            {saveConfirm ? (
                                <button
                                    className="btn-modal-save"
                                    onClick={handleFinalSave}
                                    style={{ backgroundColor: "#15803d" }} // Darker green
                                >
                                    Confirm Save Changes?
                                </button>
                            ) : (
                                <button className="btn-modal-save" onClick={handleSaveClick}>
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ScheduledCampaigns;
