import { useState } from "react";
import Layout from "../components/Layout";
import CreateUserForm from "../components/CreateUserForm";
import "../styles/users.css";

function Users() {
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState(null);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("app_users");
    if (saved) return JSON.parse(saved);
    return [
      {
        username: "user01",
        role: "Admin",
        mobile: "+6771234567",
        email: "user01@example.com",
        status: true,
        balance: "10,000",
        password: "abcdefgh12@"
      }
    ];
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Save to localStorage whenever users change
  const updateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem("app_users", JSON.stringify(newUsers));
  };

  const handleSaveUser = (newUser) => {
    // Add new user to state
    updateUsers([...users, newUser]);
  };

  const confirmDelete = (indexToRemove) => {
    updateUsers(users.filter((_, index) => index !== indexToRemove));
    setDeleteConfirmIndex(null);
  };

  const handleToggleStatus = (indexToToggle) => {
    const updatedUsers = users.map((user, index) => {
      if (index === indexToToggle) {
        return { ...user, status: !user.status };
      }
      return user;
    });
    updateUsers(updatedUsers);
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Header */}
      <div className="users-top">
        <h2>{isCreating ? "Create User" : "User Management"}</h2>
        {!isCreating && (
          <button
            className="btn-primary"
            onClick={() => setIsCreating(true)}
          >
            + Create User
          </button>
        )}
      </div>

      {isCreating ? (
        <CreateUserForm
          existingUsers={users}
          onCancel={() => setIsCreating(false)}
          onSave={handleSaveUser}
        />
      ) : (
        <>
          {/* Search */}
          <div className="users-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search user..."
              className="search-input-small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* User Table */}
          <div className="users-card">
            <table className="users-table">
              <thead>
                <tr>
                  <th>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      UserName
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      Mobile No
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      Email
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                      Role
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, index) => (
                  <tr key={index}>
                    <td>{u.username}</td>
                    <td>{u.mobile || "-"}</td>
                    <td>{u.email || "-"}</td>
                    <td>{u.role}</td>
                    <td>
                      <div
                        className={`status-toggle ${u.status ? "active" : "inactive"}`}
                        onClick={() => handleToggleStatus(index)}
                      >
                        {u.status ? (
                          <>
                            <span className="toggle-text">Active</span>
                            <div className="toggle-slider"></div>
                          </>
                        ) : (
                          <>
                            <div className="toggle-slider"></div>
                            <span className="toggle-text">InActive</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="menu">
                      {deleteConfirmIndex === index ? (
                        <button
                          onClick={() => confirmDelete(index)}
                          style={{
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            fontSize: "12px",
                            cursor: "pointer"
                          }}
                        >
                          Confirm
                        </button>
                      ) : (
                        <span
                          style={{ cursor: "pointer", fontSize: "16px", color: "red" }}
                          onClick={() => setDeleteConfirmIndex(index)}
                          title="Remove User"
                        >
                          🗑️
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Users;
