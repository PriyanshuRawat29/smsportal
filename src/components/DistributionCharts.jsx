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

function ChartBox({ title, data }) {
  return (
    <div className="chart-card">
      <h4 className="chart-title">{title}</h4>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function DistributionCharts() {
  return (
    <div className="charts-grid">
      <ChartBox title="SMS DELIVERED TODAY" data={deliveredData} />
      <ChartBox title="CAMPAIGN" data={campaignData} />
    </div>
  );
}
