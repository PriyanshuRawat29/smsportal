import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/dnd-management.css';

const DndManagement = () => {
    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [isDeleteNumberModalOpen, setIsDeleteNumberModalOpen] = useState(false);
    const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);

    // Form Data
    const [addFormData, setAddFormData] = useState({ mobile: '', type: 'Full' });
    const [showAddConfirm, setShowAddConfirm] = useState(false);
    const [addSuccessMsg, setAddSuccessMsg] = useState('');

    const [deleteNumber, setDeleteNumber] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState('');

    // Bulk & Delete File States
    const [bulkFile, setBulkFile] = useState(null);
    const [deleteFile, setDeleteFile] = useState(null);
    const [bulkError, setBulkError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [bulkSuccessMsg, setBulkSuccessMsg] = useState('');
    const [deleteBulkSuccessMsg, setDeleteBulkSuccessMsg] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const [showBulkConfirm, setShowBulkConfirm] = useState(false);
    const [showDeleteBulkConfirm, setShowDeleteBulkConfirm] = useState(false);

    // Handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e, type) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0], type);
        }
    };

    const handleFileSelect = (file, type) => {
        if (type === 'upload') {
            setBulkFile(file);
            setBulkError('');
            setShowBulkConfirm(false);
        } else {
            setDeleteFile(file);
            setDeleteError('');
            setShowDeleteBulkConfirm(false);
        }
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();

        if (!showAddConfirm) {
            setShowAddConfirm(true);
            return;
        }

        // Final Confirm
        setAddSuccessMsg(`Number +677${addFormData.mobile} successfully added to DND`);

        // Reset after delay
        setTimeout(() => {
            setAddFormData({ mobile: '', type: 'Full' });
            setShowAddConfirm(false);
            setAddSuccessMsg('');
            setIsAddModalOpen(false);
        }, 2000);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setShowAddConfirm(false);
        setAddSuccessMsg('');
        setAddFormData({ mobile: '', type: 'Full' });
    };

    const closeDeleteModal = () => {
        setIsDeleteNumberModalOpen(false);
        setShowDeleteConfirm(false);
        setDeleteSuccessMsg('');
        setDeleteNumber('');
    };

    const handleDeleteNumberSubmit = (e) => {
        e.preventDefault();

        if (!showDeleteConfirm) {
            setShowDeleteConfirm(true);
            return;
        }

        setDeleteSuccessMsg(`Number +677${deleteNumber} deleted from DND successfully`);

        setTimeout(() => {
            setDeleteNumber('');
            setShowDeleteConfirm(false);
            setDeleteSuccessMsg('');
            setIsDeleteNumberModalOpen(false);
        }, 2000);
    };

    const handleBulkUpload = () => {
        // Redundant with inline click handler but kept for safety if referenced elsewhere, 
        // though strictly the inline logic below replaces it. 
        // We will update the inline logic in the render.
    };



    return (
        <Layout>
            <div className="dnd-container">
                <div className="dnd-header">
                    <h2>DND Management</h2>
                    <p className="dnd-subtitle">Select an action to manage Do Not Disturb numbers</p>
                </div>

                <div className="dnd-action-grid">
                    {/* Card 1: Add Single */}
                    <div className="action-card" onClick={() => setIsAddModalOpen(true)}>
                        <div className="card-icon">➕</div>
                        <h3 className="card-title">Add DND Number</h3>
                        <p className="card-desc">Manually add a single number with +677 prefix.</p>
                    </div>

                    {/* Card 2: Bulk Upload DND */}
                    <div className="action-card" onClick={() => {
                        setIsBulkModalOpen(true);
                        setBulkFile(null);
                        setBulkError('');
                        setBulkSuccessMsg('');
                        setShowBulkConfirm(false);
                    }}>
                        <div className="card-icon">📂</div>
                        <h3 className="card-title">Bulk Upload DND</h3>
                        <p className="card-desc">Upload CSV or Excel file to add numbers.</p>
                    </div>

                    {/* Card 3: Delete Number */}
                    <div className="action-card danger" onClick={() => setIsDeleteNumberModalOpen(true)}>
                        <div className="card-icon">🗑️</div>
                        <h3 className="card-title">Delete Number</h3>
                        <p className="card-desc">Remove a single number from the DND list.</p>
                    </div>

                    {/* Card 4: DND Bulk Delete */}
                    <div className="action-card danger" onClick={() => {
                        setIsDeleteListModalOpen(true);
                        setDeleteFile(null);
                        setDeleteError('');
                        setDeleteBulkSuccessMsg('');
                        setShowDeleteBulkConfirm(false);
                    }}>
                        <div className="card-icon">☢️</div>
                        <h3 className="card-title">DND Bulk Delete</h3>
                        <p className="card-desc">Upload a file to delete multiple numbers.</p>
                    </div>
                </div>

                {/* --- MODALS --- */}

                {/* 1. Add Modal */}
                {isAddModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Add DND Number</h3>
                                <button className="close-btn" onClick={closeAddModal}>&times;</button>
                            </div>
                            <form onSubmit={handleAddSubmit}>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <div className="input-prefix-wrapper">
                                        <span className="input-prefix-text">+677</span>
                                        <input
                                            type="text"
                                            className="form-control input-prefix-field"
                                            placeholder="Enter 7 digits"
                                            value={addFormData.mobile}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 7); // numbers only, max 7
                                                setAddFormData({ ...addFormData, mobile: val });
                                            }}
                                            required
                                            minLength={7}
                                            maxLength={7}
                                        />
                                    </div>
                                    <small style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                        Enter number (exactly 7 digits)
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label>DND Type</label>
                                    <select
                                        className="form-control"
                                        value={addFormData.type}
                                        onChange={(e) => setAddFormData({ ...addFormData, type: e.target.value })}
                                    >
                                        <option value="Full">Full DND</option>
                                        <option value="Partial">Partial DND</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    {addSuccessMsg ? (
                                        <div style={{ width: '100%', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
                                            {addSuccessMsg}
                                        </div>
                                    ) : (
                                        <>
                                            <button type="button" className="btn-secondary" onClick={closeAddModal}>Cancel</button>
                                            <button
                                                type="submit"
                                                className={showAddConfirm ? "btn-danger" : "btn-primary"}
                                            >
                                                {showAddConfirm ? "Confirm Add Number" : "Add Number"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* 2. Bulk Upload DND Modal */}
                {isBulkModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Bulk Upload DND</h3>
                                <button className="close-btn" onClick={() => { setIsBulkModalOpen(false); setBulkFile(null); setBulkError(''); setBulkSuccessMsg(''); setShowBulkConfirm(false); }}>&times;</button>
                            </div>

                            <div
                                className={`file-upload-area ${dragActive ? 'active' : ''}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={(e) => handleDrop(e, 'upload')}
                                onClick={() => document.getElementById('bulkUploadInput').click()}
                            >
                                <input
                                    id="bulkUploadInput"
                                    type="file"
                                    accept=".csv, .xlsx, .xls"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        if (e.target.files[0]) handleFileSelect(e.target.files[0], 'upload');
                                    }}
                                />

                                {bulkFile ? (
                                    <div className="selected-file-badge" onClick={(e) => e.stopPropagation()}>
                                        <span>📄 {bulkFile.name}</span>
                                        <div className="remove-file" onClick={() => { setBulkFile(null); setShowBulkConfirm(false); }}>×</div>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div className="upload-text">Click to upload or drag and drop</div>
                                        <div className="upload-hint">Excel, CSV files (MAX. 5MB)</div>
                                    </>
                                )}
                            </div>

                            {bulkError && <div className="error-message-inline">{bulkError}</div>}

                            <div className="modal-footer">
                                {bulkSuccessMsg ? (
                                    <div style={{ width: '100%', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
                                        {bulkSuccessMsg}
                                    </div>
                                ) : (
                                    <>
                                        <button className="btn-secondary" onClick={() => { setIsBulkModalOpen(false); setBulkFile(null); setBulkError(''); setShowBulkConfirm(false); }}>Cancel</button>
                                        <button
                                            className={showBulkConfirm ? "btn-danger" : "btn-primary"}
                                            onClick={() => {
                                                if (!bulkFile) {
                                                    setBulkError("Please select a file first");
                                                    return;
                                                }
                                                if (!showBulkConfirm) {
                                                    setShowBulkConfirm(true);
                                                    return;
                                                }
                                                setBulkSuccessMsg("File uploaded successfully!");
                                                setTimeout(() => {
                                                    setIsBulkModalOpen(false);
                                                    setBulkFile(null);
                                                    setBulkSuccessMsg('');
                                                    setShowBulkConfirm(false);
                                                }, 2000);
                                            }}
                                        >
                                            {showBulkConfirm ? "Confirm Upload" : "Upload"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Delete Number Modal */}
                {isDeleteNumberModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Delete Single Number</h3>
                                <button className="close-btn" onClick={closeDeleteModal}>&times;</button>
                            </div>
                            <form onSubmit={handleDeleteNumberSubmit}>
                                <div className="form-group">
                                    <label>Mobile Number to Delete</label>
                                    <div className="input-prefix-wrapper">
                                        <span className="input-prefix-text">+677</span>
                                        <input
                                            type="text"
                                            className="form-control input-prefix-field"
                                            placeholder="Enter 7 digits"
                                            value={deleteNumber}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 7);
                                                setDeleteNumber(val);
                                            }}
                                            required
                                            minLength={7}
                                            maxLength={7}
                                        />
                                    </div>
                                </div>
                                <p style={{ fontSize: '13px', color: '#6b7280', margin: '-10px 0 20px' }}>
                                    This action will remove this number from the DND database.
                                </p>
                                <div className="modal-footer">
                                    {deleteSuccessMsg ? (
                                        <div style={{ width: '100%', textAlign: 'center', color: '#dc2626', fontWeight: 'bold' }}>
                                            {deleteSuccessMsg}
                                        </div>
                                    ) : (
                                        <>
                                            <button type="button" className="btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                                            <button
                                                type="submit"
                                                className="btn-danger"
                                            >
                                                {showDeleteConfirm ? "Confirm Delete" : "Delete"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* 4. DND Bulk Delete Modal */}
                {isDeleteListModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>DND Bulk Delete</h3>
                                <button className="close-btn" onClick={() => { setIsDeleteListModalOpen(false); setDeleteFile(null); setDeleteError(''); setDeleteBulkSuccessMsg(''); setShowDeleteBulkConfirm(false); }}>&times;</button>
                            </div>
                            <div className="warning-bg">
                                <strong>⚠️ Action Required</strong><br />
                                Upload a file containing the numbers you want to delete from the DND list.
                            </div>

                            <div
                                className={`file-upload-area ${dragActive ? 'active' : ''}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={(e) => handleDrop(e, 'delete')}
                                onClick={() => document.getElementById('bulkDeleteInput').click()}
                            >
                                <input
                                    id="bulkDeleteInput"
                                    type="file"
                                    accept=".csv, .xlsx, .xls"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        if (e.target.files[0]) handleFileSelect(e.target.files[0], 'delete');
                                    }}
                                />

                                {deleteFile ? (
                                    <div className="selected-file-badge" onClick={(e) => e.stopPropagation()}>
                                        <span>📄 {deleteFile.name}</span>
                                        <div className="remove-file" onClick={() => { setDeleteFile(null); setShowDeleteBulkConfirm(false); }}>×</div>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div className="upload-text">Click to upload or drag and drop</div>
                                        <div className="upload-hint">Excel, CSV files (MAX. 5MB)</div>
                                    </>
                                )}
                            </div>

                            {deleteError && <div className="error-message-inline">{deleteError}</div>}

                            <div className="modal-footer">
                                {deleteBulkSuccessMsg ? (
                                    <div style={{ width: '100%', textAlign: 'center', color: '#dc2626', fontWeight: 'bold' }}>
                                        {deleteBulkSuccessMsg}
                                    </div>
                                ) : (
                                    <>
                                        <button className="btn-secondary" onClick={() => { setIsDeleteListModalOpen(false); setDeleteFile(null); setDeleteError(''); setShowDeleteBulkConfirm(false); }}>Cancel</button>
                                        <button
                                            className="btn-danger"
                                            onClick={() => {
                                                if (!deleteFile) {
                                                    setDeleteError("Please select a file first");
                                                    return;
                                                }
                                                if (!showDeleteBulkConfirm) {
                                                    setShowDeleteBulkConfirm(true);
                                                    return;
                                                }
                                                setDeleteBulkSuccessMsg("Bulk delete processed successfully!");
                                                setTimeout(() => {
                                                    setIsDeleteListModalOpen(false);
                                                    setDeleteFile(null);
                                                    setDeleteBulkSuccessMsg('');
                                                    setShowDeleteBulkConfirm(false);
                                                }, 2000);
                                            }}
                                        >
                                            {showDeleteBulkConfirm ? "Confirm Delete" : "Process Delete"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
};

export default DndManagement;
