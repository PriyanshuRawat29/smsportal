import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/block-user-management.css';

const BlockUserManagement = () => {
    // Modal States
    const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
    const [isRemoveBlockModalOpen, setIsRemoveBlockModalOpen] = useState(false);

    // Form Data
    const [blockFormData, setBlockFormData] = useState({ userName: '', mobile: '' });
    const [removeFormData, setRemoveFormData] = useState({ userName: '', mobile: '' });

    const [showBlockConfirm, setShowBlockConfirm] = useState(false);
    const [blockSuccessMsg, setBlockSuccessMsg] = useState('');
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [removeSuccessMsg, setRemoveSuccessMsg] = useState('');

    // Handlers
    const handleBlockSubmit = (e) => {
        e.preventDefault();

        if (!showBlockConfirm) {
            setShowBlockConfirm(true);
            return;
        }

        // Logic to block user (e.g., API call)
        setBlockSuccessMsg(`User ${blockFormData.userName} (+677${blockFormData.mobile}) blocked successfully`);

        setTimeout(() => {
            setBlockFormData({ userName: '', mobile: '' });
            setShowBlockConfirm(false);
            setBlockSuccessMsg('');
            setIsBlockUserModalOpen(false);
        }, 2000);
    };

    const handleRemoveSubmit = (e) => {
        e.preventDefault();

        if (!showRemoveConfirm) {
            setShowRemoveConfirm(true);
            return;
        }

        // Logic to remove block (e.g., API call)
        setRemoveSuccessMsg(`Block removed for ${removeFormData.userName}`);

        setTimeout(() => {
            setRemoveFormData({ userName: '', mobile: '' });
            setShowRemoveConfirm(false);
            setRemoveSuccessMsg('');
            setIsRemoveBlockModalOpen(false);
        }, 2000);
    };

    const closeBlockModal = () => {
        setIsBlockUserModalOpen(false);
        setShowBlockConfirm(false);
        setBlockSuccessMsg('');
        setBlockFormData({ userName: '', mobile: '' });
    };

    const closeRemoveModal = () => {
        setIsRemoveBlockModalOpen(false);
        setShowRemoveConfirm(false);
        setRemoveSuccessMsg('');
        setRemoveFormData({ userName: '', mobile: '' });
    };

    return (
        <Layout>
            <div className="block-user-container">
                <div className="block-user-header">
                    <h2>Block User Management</h2>
                    <p className="block-user-subtitle">Select an action to manage blocked users</p>
                </div>

                <div className="block-user-action-grid">
                    {/* Card 1: Block User */}
                    <div className="action-card danger" onClick={() => setIsBlockUserModalOpen(true)}>
                        <div className="card-icon">🚫</div>
                        <h3 className="card-title">Block User</h3>
                        <p className="card-desc">Block a user by Name and Mobile Number.</p>
                    </div>

                    {/* Card 2: Remove Block User */}
                    <div className="action-card" onClick={() => setIsRemoveBlockModalOpen(true)}>
                        <div className="card-icon">🔓</div>
                        <h3 className="card-title">Remove Block User</h3>
                        <p className="card-desc">Unblock a previously blocked user.</p>
                    </div>
                </div>

                {/* --- MODALS --- */}

                {/* 1. Block User Modal */}
                {isBlockUserModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Block User</h3>
                                <button className="close-btn" onClick={closeBlockModal}>&times;</button>
                            </div>
                            <form onSubmit={handleBlockSubmit}>
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter User Name"
                                        value={blockFormData.userName}
                                        onChange={(e) => setBlockFormData({ ...blockFormData, userName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <div className="input-prefix-wrapper">
                                        <span className="input-prefix-text">+677</span>
                                        <input
                                            type="text"
                                            className="form-control input-prefix-field"
                                            placeholder="Enter 7 digits"
                                            value={blockFormData.mobile}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 7); // numbers only, max 7
                                                setBlockFormData({ ...blockFormData, mobile: val });
                                            }}
                                            required
                                            minLength={7}
                                            maxLength={7}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {blockSuccessMsg ? (
                                        <div style={{ width: '100%', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
                                            {blockSuccessMsg}
                                        </div>
                                    ) : (
                                        <>
                                            <button type="button" className="btn-secondary" onClick={closeBlockModal}>Cancel</button>
                                            <button
                                                type="submit"
                                                className="btn-danger"
                                            >
                                                {showBlockConfirm ? "Confirm Block" : "Block User"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* 2. Remove Block User Modal */}
                {isRemoveBlockModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Remove Block User</h3>
                                <button className="close-btn" onClick={closeRemoveModal}>&times;</button>
                            </div>
                            <form onSubmit={handleRemoveSubmit}>
                                {/* For removing, we probably just need one identifier, or search. 
                                    Assuming we search by name or enter details to unblock. 
                                    The prompt says "Remove block user remove block user", implying a similar flow ?
                                    I will keep it consistent with inputting details to identify the block to remove,
                                    or ideally a list would be better but I'll follow the "Block User" form pattern for now.
                                */}
                                <div className="form-group">
                                    <label>User Name to Unblock</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter User Name"
                                        value={removeFormData.userName}
                                        onChange={(e) => setRemoveFormData({ ...removeFormData, userName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number (Optional)</label>
                                    <div className="input-prefix-wrapper">
                                        <span className="input-prefix-text">+677</span>
                                        <input
                                            type="text"
                                            className="form-control input-prefix-field"
                                            placeholder="Enter 7 digits"
                                            value={removeFormData.mobile}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 7);
                                                setRemoveFormData({ ...removeFormData, mobile: val });
                                            }}
                                            minLength={7}
                                            maxLength={7}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {removeSuccessMsg ? (
                                        <div style={{ width: '100%', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
                                            {removeSuccessMsg}
                                        </div>
                                    ) : (
                                        <>
                                            <button type="button" className="btn-secondary" onClick={closeRemoveModal}>Cancel</button>
                                            <button
                                                type="submit"
                                                className="btn-primary"
                                            >
                                                {showRemoveConfirm ? "Confirm Remove" : "Remove Block"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
};

export default BlockUserManagement;
