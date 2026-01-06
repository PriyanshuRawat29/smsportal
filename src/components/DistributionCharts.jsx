import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* BRAND COLORS */
const BRAND_COLORS = {
  blue: "rgb(0,176,202)",
  red: "rgb(230,0,0)",
  grey: "rgb(84,77,78)",
  orange: "rgb(235,151,0)"
};

/* SMS Delivered Today */
const deliveredData = [
  { name: "Delivered", value: 4236, fill: BRAND_COLORS.blue },
  { name: "Failed", value: 428, fill: BRAND_COLORS.red },
  { name: "Pending", value: 332, fill: BRAND_COLORS.orange }
];

/* Campaign Status */
const campaignData = [
  { name: "Active", value: 1295, fill: BRAND_COLORS.blue },
  { name: "Inactive", value: 19, fill: BRAND_COLORS.grey }
];

/* ✅ CUSTOM PIE LABEL (REQUIRED) */
const renderPieLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 12;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#374151"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${name}: ${value}`}
    </text>
  );
};

/* ✅ CHART CARD */
function ChartBox({ title, data }) {
  return (
    <div className="chart-card">
      <h4 className="chart-title">{title}</h4>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={75}
            paddingAngle={2}
            label={renderPieLabel}
            labelLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              fontSize: "13px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ✅ EXPORT */
export default function DistributionCharts() {
  return (
    <div className="charts-grid">
      <ChartBox title="SMS DELIVERED TODAY" data={deliveredData} />
      <ChartBox title="CAMPAIGN" data={campaignData} />
    </div>
  );
}
