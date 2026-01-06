import Layout from "../components/Layout";
import "../styles/users.css";

function Users() {
  return (
    <Layout>
      {/* Header */}
      <div className="users-top">
        <h2>User Management</h2>
        <button className="btn-primary">+ Create User</button>
      </div>

      {/* Search */}
<div className="users-search">
  <span className="search-icon">🔍</span>
  <input
    type="text"
    placeholder="Search user..."
    className="search-input-small"
  />
</div>


      {/* User Table */}
      <div className="users-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>user01</td>
              <td>Aggregator</td>
              <td>
                <span className="status-pill active">Active</span>
              </td>
              <td>₹ 10,000</td>
              <td className="menu">⋯</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Create / Edit User */}
      <div className="users-card form-card">
        <h3>Create / Edit User</h3>

        <div className="form-grid">
          <div>
            <label>Username</label>
            <input type="text"  />
          </div>

          <div>
            <label>Role</label>
            <select>
              <option>Aggregator</option>
              <option>Admin</option>
              <option>Enterprise User</option>
            </select>
          </div>

          <div>
  <label>Password</label>
  <input type="password" placeholder="Enter password" />
</div>

          <div>
  <label>Assign SMS Balance</label>
  <input type="number" className="input-small" />
</div>




          <div className="toggle-wrap">
            <span>Status</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-outline">Cancel</button>
          <button className="btn-primary">Save</button>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
