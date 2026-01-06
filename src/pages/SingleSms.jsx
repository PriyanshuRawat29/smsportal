import Layout from "../components/Layout";
import "../styles/single-sms.css";
import { useState } from "react";
function SingleSms() {
   const [message, setMessage] = useState("");
  return (
    <Layout>
      <h2 className="dashboard-title">Send Single SMS</h2>

      <div className="chart-card">
{/* Mobile Number */}

<div className="form-group">
  <label className="form-label">Mobile Number *</label>

  <div className="mobile-field">
    
   <span className="mobile-prefix mobile-code">+677</span>

    <input
      type="text"
      className="mobile-number-input"
      placeholder="Enter mobile number"
      maxLength={7}
      inputMode="numeric"
      onInput={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }}
    />
  </div>
</div>


{/* Sender ID */}
<div className="form-group">
  <label className="form-label">Sender ID</label>
  <input
    type="text"
    placeholder="Enter Sender ID"
    className="form-input"
  />
</div>



        {/* Message */}
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea
  rows="4"
  placeholder="Type your message here"
  className="form-textarea"
  maxLength={160}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
<div className="char-count">
  {message.length} / 160
</div>

        </div>

        {/* Actions */}
        <div className="sms-action">
  <button className="apply-btn">Send Now</button>
</div>
    <p className="sms-info">
  ℹ Balance deduction and filtering happens automatically.
</p>


      </div>
    </Layout>
  );
}

export default SingleSms;
