import Layout from "../components/Layout";

function Users() {
  return (
    <Layout>
      <h2 className="dashboard-title">User Management</h2>

      {/* Create User Button */}
      <div style={{ marginBottom: 16 }}>
        <button className="apply-btn">Create User</button>
      </div>

      {/* User List Table */}
      <div className="chart-card">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Dummy row – API later */}
            <tr>
              <td>user01</td>
              <td>Aggregator</td>
              <td>Active</td>
              <td>₹ 10,000</td>
              <td>
                <button className="link-button">Edit</button>{" "}
                |{" "}
                <button className="link-button">Disable</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Create / Edit User Form */}
      <div className="chart-card" style={{ marginTop: 32 }}>
        <h3 className="chart-title">Create / Edit User</h3>

        <div className="form-grid">
          <input type="text" placeholder="Username" />

          <select>
            <option>Admin</option>
            <option>Aggregator</option>
            <option>Enterprise User</option>
          </select>

          <input type="password" placeholder="Password" />

          <input type="number" placeholder="Assign SMS Balance" />

          <label>
            <input type="checkbox" /> Enable User
          </label>

          <div>
            <button className="apply-btn">Save</button>{" "}
            <button className="link-button">Cancel</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
