import { useEffect, useState } from "react";

function SummaryCard({ title, value, icon, className }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().replace(/[^0-9]/g, ""));

    if (isNaN(end)) return;

    const duration = 800; // animation duration (ms)
    const increment = Math.ceil(end / (duration / 16));

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayValue(start);
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="summary-card">
      <div className="card-top">
        <span className="card-title">{title}</span>
        <span className="card-icon">{icon}</span>
      </div>

      <div className={`summary-card ${className || ""}`}>

        {value.toString().includes("₹")
          ? `₹ ${displayValue.toLocaleString()}`
          : displayValue.toLocaleString()}
          
      </div>
    </div>
  );
}

export default SummaryCard;
