import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/blacklist-user.css';

const BlacklistUser = () => {
    // Modal States
    const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
    const [isRemoveBlacklistModalOpen, setIsRemoveBlacklistModalOpen] = useState(false);

    // Form Data
    const [blacklistIdentifier, setBlacklistIdentifier] = useState('');
    const [showBlacklistConfirm, setShowBlacklistConfirm] = useState(false);

    const [blacklistSuccessMsg, setBlacklistSuccessMsg] = useState('');
    const [blacklistError, setBlacklistError] = useState(''); // NEW Error State
    // NEW: Dropdown states
    const [isBlacklistDropdownOpen, setIsBlacklistDropdownOpen] = useState(false);
    const [blacklistSearchTerm, setBlacklistSearchTerm] = useState('');
    const blacklistDropdownRef = React.useRef(null);

    const [removeIdentifier, setRemoveIdentifier] = useState('');
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [removeSuccessMsg, setRemoveSuccessMsg] = useState('');

    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect(() => {
        const savedUsers = localStorage.getItem("app_users");
        if (savedUsers) {
            setAvailableUsers(JSON.parse(savedUsers));
        } else {
            // Fallback for demo if no users visited Users page yet
            setAvailableUsers([
                { username: "user01" }
            ]);
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (blacklistDropdownRef.current && !blacklistDropdownRef.current.contains(event.target)) {
                setIsBlacklistDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    // 1. Blacklist Single User
    const handleBlacklistSubmit = (e) => {
        e.preventDefault();
        setBlacklistError(''); // Clear previous errors

        if (!blacklistIdentifier) {
            setBlacklistError("Please select a user first.");
            return;
        }

        if (!showBlacklistConfirm) {
            setShowBlacklistConfirm(true);
            return;
        }
        // Update user status
        const updatedUsers = availableUsers.map(u => {
            if (u.username === blacklistIdentifier) {
                return { ...u, isBlacklisted: true };
            }
            return u;
        });
        setAvailableUsers(updatedUsers);
        localStorage.setItem("app_users", JSON.stringify(updatedUsers));

        setBlacklistSuccessMsg(`${blacklistIdentifier} blacklisted successfully`);
        setTimeout(() => {
            setBlacklistIdentifier('');
            setShowBlacklistConfirm(false);
            setBlacklistSuccessMsg('');
            setIsBlacklistModalOpen(false);
        }, 2000);
    };

    const closeBlacklistModal = () => {
        setIsBlacklistModalOpen(false);
        setBlacklistIdentifier('');
        setShowBlacklistConfirm(false);
        setBlacklistSuccessMsg('');
        setBlacklistError('');
    };

    // 3. Remove Single Blacklist
    const handleRemoveSubmit = (e) => {
        e.preventDefault();
        if (!showRemoveConfirm) {
            setShowRemoveConfirm(true);
            return;
        }
        // Update user status
        const updatedUsers = availableUsers.map(u => {
            if (u.username === removeIdentifier) {
                return { ...u, isBlacklisted: false };
            }
            return u;
        });
        setAvailableUsers(updatedUsers);
        localStorage.setItem("app_users", JSON.stringify(updatedUsers));

        setRemoveSuccessMsg(`Removed blacklist for ${removeIdentifier}`);
        setTimeout(() => {
            setRemoveIdentifier('');
            setShowRemoveConfirm(false);
            setRemoveSuccessMsg('');
            setIsRemoveBlacklistModalOpen(false);
        }, 2000);
    };

    const closeRemoveModal = () => {
        setIsRemoveBlacklistModalOpen(false);
        setRemoveIdentifier('');
        setShowRemoveConfirm(false);
        setRemoveSuccessMsg('');
    };



    return (
        <Layout>
            <div className="blacklist-container">
                <div className="blacklist-header">
                    <h2>Blacklist User</h2>
                    <p className="blacklist-subtitle">Select an action to manage blacklisted users</p>
                </div>

                <div className="blacklist-action-grid">
                    {/* Card 1: Blacklist User */}
                    <div className="action-card danger" onClick={() => setIsBlacklistModalOpen(true)}>
                        <div className="card-icon">🚫</div>
                        <h3 className="card-title">Blacklist User</h3>
                        <p className="card-desc">Restrict a user from sending SMS or campaigns.</p>
                    </div>



                    {/* Card 3: Remove Blacklist */}
                    <div className="action-card" onClick={() => setIsRemoveBlacklistModalOpen(true)}>
                        <div className="card-icon">🔓</div>
                        <h3 className="card-title">Remove Blacklist</h3>
                        <p className="card-desc">Remove blacklist restriction from a user.</p>
                    </div>


                </div>

                {/* BLACKLISTED USERS TABLE */}
                <div style={{ marginTop: '3rem' }}>
                    <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Blacklisted Users Log</h3>
                    </div>

                    <div className="table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                            <thead style={{ backgroundColor: '#f9fafb' }}>
                                <tr>
                                    <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</th>
                                    <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User Mobile No</th>
                                    <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User Email ID</th>
                                    <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableUsers.filter(u => u.isBlacklisted).length > 0 ? (
                                    availableUsers.filter(u => u.isBlacklisted).map((u, i) => (
                                        <tr key={i} style={{ borderTop: '1px solid #e5e7eb' }}>
                                            <td style={{ padding: '1rem 1.5rem', color: '#111827', fontSize: '0.875rem' }}>{u.username}</td>
                                            <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>{u.mobile || '-'}</td>
                                            <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>{u.email || '-'}</td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <span style={{
                                                    backgroundColor: u.role === 'Admin' ? '#e0e7ff' : '#f3f4f6',
                                                    color: u.role === 'Admin' ? '#4338ca' : '#374151',
                                                    padding: '2px 8px',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500'
                                                }}>
                                                    {u.role || 'User'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
                                            No users are currently blacklisted.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- MODALS --- */}

                {/* 1. Blacklist User Modal */}
                {isBlacklistModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Blacklist User</h3>
                                <button className="close-btn" onClick={closeBlacklistModal}>&times;</button>
                            </div>
                            <form onSubmit={handleBlacklistSubmit}>
                                <div className="form-group">
                                    <label>Username</label>

                                    {/* Custom Searchable Dropdown */}
                                    <div className="dropdown-wrapper" ref={blacklistDropdownRef}>
                                        <div
                                            className={`dropdown-trigger form-control ${isBlacklistDropdownOpen ? 'active' : ''}`}
                                            onClick={() => {
                                                setIsBlacklistDropdownOpen(!isBlacklistDropdownOpen);
                                                setBlacklistError(''); // Clear error on interaction
                                                // Reset search when opening
                                                if (!isBlacklistDropdownOpen) setBlacklistSearchTerm('');
                                            }}
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <span style={{ color: blacklistIdentifier ? '#1f2937' : '#9ca3af' }}>
                                                {blacklistIdentifier || "Select a user"}
                                            </span>
                                            <span className="dropdown-arrow">▼</span>
                                        </div>

                                        {isBlacklistDropdownOpen && (
                                            <div className="dropdown-menu">
                                                <div className="dropdown-search-container" style={{ position: 'relative' }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#9ca3af"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                                                    >
                                                        <circle cx="11" cy="11" r="8"></circle>
                                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                    </svg>
                                                    <input
                                                        type="text"
                                                        className="dropdown-search-input"
                                                        placeholder="Search user..."
                                                        value={blacklistSearchTerm}
                                                        onChange={(e) => setBlacklistSearchTerm(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        style={{ paddingLeft: '32px' }}
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="dropdown-list">
                                                    {availableUsers
                                                        .filter(u => !u.isBlacklisted)
                                                        .filter(u => u.username.toLowerCase().includes(blacklistSearchTerm.toLowerCase()))
                                                        .length > 0 ? (
                                                        availableUsers
                                                            .filter(u => !u.isBlacklisted)
                                                            .filter(u => u.username.toLowerCase().includes(blacklistSearchTerm.toLowerCase()))
                                                            .map((u, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`dropdown-item ${blacklistIdentifier === u.username ? 'selected' : ''}`}
                                                                    onClick={() => {
                                                                        setBlacklistIdentifier(u.username);
                                                                        setIsBlacklistDropdownOpen(false);
                                                                        setBlacklistError('');
                                                                    }}
                                                                >
                                                                    {u.username}
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <div className="dropdown-item no-results">
                                                            No users found
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <small style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                        This user will be blocked from sending any messages.
                                    </small>
                                </div>
                                <div className="modal-footer">
                                    {blacklistSuccessMsg ? (
                                        <div style={{ width: '100%', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
                                            {blacklistSuccessMsg}
                                        </div>
                                    ) : (
                                        <>
                                            {blacklistError && (
                                                <div style={{ width: '100%', textAlign: 'center', color: '#ef4444', marginBottom: '10px', fontSize: '0.9rem' }}>
                                                    {blacklistError}
                                                </div>
                                            )}
                                            <button type="button" className="btn-secondary" onClick={closeBlacklistModal}>Cancel</button>
                                            <button
                                                type="submit"
                                                className="btn-danger"
                                            >
                                                {showBlacklistConfirm ? "Confirm Blacklist" : "Blacklist"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}



                {/* 3. Remove Blacklist Modal */}
                {isRemoveBlacklistModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Remove Blacklist</h3>
                                <button className="close-btn" onClick={closeRemoveModal}>&times;</button>
                            </div>
                            <form onSubmit={handleRemoveSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <select
                                        className="form-control"
                                        value={removeIdentifier}
                                        onChange={(e) => setRemoveIdentifier(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a user</option>
                                        {availableUsers.filter(u => u.isBlacklisted).map((u, i) => (
                                            <option key={i} value={u.username}>{u.username}</option>
                                        ))}
                                    </select>
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
                                                className="btn-primary" // Not danger since removing restriction is positive
                                            >
                                                {showRemoveConfirm ? "Confirm Remove" : "Remove"}
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

export default BlacklistUser;
