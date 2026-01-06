import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import DistributionCharts from "../components/DistributionCharts";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const chartData = [
    { name: "Sent", value: 12450 },
    { name: "Delivered", value: 11980 },
    { name: "Failed", value: 470 }
  ];

  return (
    <Layout>
      <h2 className="dashboard-title">Dashboard</h2>

{/* Revenue Date Range (UI only) */}
<div className="date-filter">
  <div className="date-filter-title">Revenue Date Range</div>

  <div className="date-filter-controls">
    <div className="date-field">
      <label>Start Date</label>
      <input type="date" />
    </div>

    <div className="date-field">
      <label>End Date</label>
      <input type="date" />
    </div>

    <div className="apply-field">
  <span className="apply-label">&nbsp;</span>
  <button className="apply-btn">APPLY</button>
</div>

  </div>
</div>

      <div className="summary-grid">
        {loading ? (
          <>
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </>
          
        ) : (
          <>
            <SummaryCard className="sent" title="SMS Sent Today" value="12,450" icon="📤" />
<SummaryCard className="delivered" title="Delivered SMS" value="11,980" icon="✅" />
<SummaryCard className="failed" title="Failed SMS" value="470" icon="❌" />
<SummaryCard className="campaigns" title="Active Campaigns" value="6" icon="📢" />
<SummaryCard className="balance" title="Available Balance" value="₹ 24,500" icon="💰" />

          </>
          
        )}
      </div>

      {!loading && (
  <>
    {/* FULL WIDTH BAR CHART */}
    <div className="chart-card full-width">
      <h3 className="chart-title">SMS Delivery Overview</h3>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="var(--brand-red-violet)"
            barSize={48}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* PIE CHARTS ROW */}
    <div className="charts-grid">
      <DistributionCharts />
    </div>
  </>
)}

      {/* Top 10 SMS Users (UI Only) */}
<div className="table-card">
  <h3 className="table-title">Top 10 SMS Users</h3>

  <div className="table-wrapper">
    <table className="data-table">
      <thead>
        <tr>
          <th>MSISDN</th>
          <th>Pack Name</th>
          <th>Activation Date</th>
          <th>Offered SMS</th>
          <th>Consumed SMS</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <>
            <tr><td colSpan="5" className="table-skeleton"></td></tr>
            <tr><td colSpan="5" className="table-skeleton"></td></tr>
            <tr><td colSpan="5" className="table-skeleton"></td></tr>
          </>
        ) : (
          <tr>
            <td colSpan="5" className="no-data">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


    </Layout>
  );
}

export default Dashboard;
