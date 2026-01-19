import React, { useState } from 'react';
import '../styles/balance.css';
import Layout from '../components/Layout';

const Balance = () => {
    // State for balance data
    const [currentBalance, setCurrentBalance] = useState(10000);
    const [usedToday, setUsedToday] = useState(250);

    // State for admin modal
    const [showAdminModal, setShowAdminModal] = useState(false);
    // State for available users and dropdown
    const [availableUsers, setAvailableUsers] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = React.useRef(null);

    // Load mock users
    React.useEffect(() => {
        // Mock users data
        setAvailableUsers([
            { username: "user01" },
            { username: "john_doe" },
            { username: "demo_user" },
            { username: "alice_client" },
            { username: "bob_reseller" }
        ]);
    }, []);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [adjustData, setAdjustData] = useState({
        amount: '',
        action: 'add',
        reason: '',
        username: '' // Add username to state
    });

    // Mock User Role - In a real app, this would come from a context or prop
    const userRole = 'admin'; // Change to 'user' to hide admin controls

    const remainingBalance = currentBalance - usedToday;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdjustData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!adjustData.amount || !adjustData.username) return; // Validate username

        const amount = parseInt(adjustData.amount, 10);

        if (adjustData.action === 'add') {
            setCurrentBalance(prev => prev + amount);
        } else {
            setCurrentBalance(prev => prev - amount);
        }

        // Reset and close
        setAdjustData({ amount: '', action: 'add', reason: '', username: '' });
        setShowAdminModal(false);
    };

    return (
        <Layout>
            <div className="balance-container">
                <div className="balance-header">
                    <h2>Balance Dashboard</h2>
                    <p>Overview of your SMS credits and usage</p>
                </div>

                {/* Balance Overview Cards */}
                <div className="balance-grid">
                    {/* Current Balance */}
                    <div className="balance-card card-current">
                        <div className="card-content">
                            <h3>Current Balance</h3>
                            <p className="card-value">{currentBalance.toLocaleString()}</p>
                        </div>
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                        </div>
                    </div>

                    {/* SMS Used Today */}
                    <div className="balance-card card-used">
                        <div className="card-content">
                            <h3>SMS Used Today</h3>
                            <p className="card-value">{usedToday.toLocaleString()}</p>
                        </div>
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </div>
                    </div>

                    {/* Remaining Balance */}
                    <div className="balance-card card-remaining">
                        <div className="card-content">
                            <h3>Remaining Balance</h3>
                            <p className="card-value">{remainingBalance.toLocaleString()}</p>
                        </div>
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Admin Section */}
                {userRole === 'admin' && (
                    <div className="admin-section">
                        <div className="admin-header">
                            <div className="admin-title">
                                <span className="admin-badge">Admin</span>
                                <span>Available Controls</span>
                            </div>
                            <button
                                className="btn-admin-action"
                                onClick={() => setShowAdminModal(true)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                Adjust Balance
                            </button>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            As an administrator, you can manually add or deduct SMS credits from this account for testing or adjustment purposes.
                        </p>
                    </div>
                )}

                {/* Admin Modal */}
                {showAdminModal && (
                    <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Adjust Balance</h3>
                                <button className="close-btn" onClick={() => setShowAdminModal(false)}>&times;</button>
                            </div>

                            <div className="modal-body">

                                {/* Username Dropdown Field */}
                                <div className="form-group">
                                    <label>Username</label>
                                    <div className="dropdown-wrapper" ref={dropdownRef}>
                                        <div
                                            className={`dropdown-trigger form-control ${isDropdownOpen ? 'active' : ''}`}
                                            onClick={() => {
                                                setIsDropdownOpen(!isDropdownOpen);
                                                if (!isDropdownOpen) setSearchTerm('');
                                            }}
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <span style={{ color: adjustData.username ? '#1f2937' : '#9ca3af' }}>
                                                {adjustData.username || "Select a user"}
                                            </span>
                                            <span className="dropdown-arrow">▼</span>
                                        </div>

                                        {isDropdownOpen && (
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
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        style={{ paddingLeft: '32px' }}
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="dropdown-list">
                                                    {availableUsers
                                                        .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                                                        .length > 0 ? (
                                                        availableUsers
                                                            .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                                                            .map((u, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`dropdown-item ${adjustData.username === u.username ? 'selected' : ''}`}
                                                                    onClick={() => {
                                                                        setAdjustData(prev => ({ ...prev, username: u.username }));
                                                                        setIsDropdownOpen(false);
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
                                </div>

                                <div className="form-group">
                                    <label>Target Balance (Number)</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        className="form-control"
                                        placeholder="e.g. 5000"
                                        value={adjustData.amount}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Action Type</label>
                                    <select
                                        name="action"
                                        className="form-control"
                                        value={adjustData.action}
                                        onChange={handleInputChange}
                                    >
                                        <option value="add">Add Credits (+)</option>
                                        <option value="deduct">Deduct Credits (-)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Reason (Optional)</label>
                                    <textarea
                                        name="reason"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter reason for adjustment..."
                                        value={adjustData.reason}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="modal-actions">
                                    <button className="btn-cancel" onClick={() => setShowAdminModal(false)}>Cancel</button>
                                    <button className="btn-save" onClick={handleSave}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Balance;
