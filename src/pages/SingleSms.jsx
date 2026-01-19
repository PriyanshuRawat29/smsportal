import Layout from "../components/Layout";
import "../styles/single-sms.css";
import { useState } from "react";
function SingleSms() {
  const [message, setMessage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [smsType, setSmsType] = useState("normal");
  const [scheduledDate, setScheduledDate] = useState("");
  const [schedHour, setSchedHour] = useState("");
  const [schedMinute, setSchedMinute] = useState("");
  const [schedPeriod, setSchedPeriod] = useState("PM"); // Default to PM as per request
  const [statusMessage, setStatusMessage] = useState("");
  const [senderId, setSenderId] = useState("");
  const [campaignName, setCampaignName] = useState("");

  const [error, setError] = useState("");
  const [confirmAction, setConfirmAction] = useState(null); // 'send' | 'schedule' | null

  const handleAddNumber = () => {
    if (recipients.length >= 5) {
      setError("You can add up to 5 numbers only.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (!/^\d{7}$/.test(mobileNumber)) {
      setError("Please enter a valid 7-digit mobile number.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (recipients.includes(mobileNumber)) {
      setError("Number already added.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setRecipients([...recipients, mobileNumber]);
    setMobileNumber("");
    setError("");
  };

  const handleRemoveNumber = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNumber();
    }
  };

  const validateForm = (actionType) => {
    // 1. Common Validation
    if (recipients.length === 0 && !mobileNumber) {
      setError("Please add at least one recipient.");
      setTimeout(() => setError(""), 3000);
      return false;
    }
    if (!senderId) {
      setError("Please select a Sender ID.");
      setTimeout(() => setError(""), 3000);
      return false;
    }
    if (!campaignName) {
      setError("Please enter a Campaign Name.");
      setTimeout(() => setError(""), 3000);
      return false;
    }
    if (!message) {
      setError("Please enter a message.");
      setTimeout(() => setError(""), 3000);
      return false;
    }

    if (actionType === "schedule") {
      // Validate Schedule inputs
      if (!scheduledDate || !schedHour || !schedMinute) {
        setError("Please select date and time to schedule.");
        setTimeout(() => setError(""), 3000);
        return false;
      }
    }
    return true;
  };

  const handleValidationAndConfirm = (actionType) => {
    if (validateForm(actionType)) {
      setConfirmAction(actionType);
    }
  };

  const handleFinalAction = (actionType) => {
    // 2. Action Specific Logic
    if (actionType === "schedule") {
      const scheduledTime = `${schedHour}:${schedMinute} ${schedPeriod}`;
      const typeText = smsType === "flash" ? "Flash SMS" : "SMS";

      // Save to localStorage
      const newCampaign = {
        id: Date.now(),
        name: campaignName,
        senderId: senderId,
        type: smsType,
        source: "Single SMS",
        // Extended Fields
        message: message,
        recipients: recipients.length > 0 ? recipients : [mobileNumber],
        scheduledDate: scheduledDate,
        scheduledTime: `${scheduledDate} ${scheduledTime}`, // Full string for display
      };

      const existingCampaigns = JSON.parse(localStorage.getItem("scheduled_campaigns") || "[]");
      localStorage.setItem("scheduled_campaigns", JSON.stringify([...existingCampaigns, newCampaign]));

      setStatusMessage(`${typeText} Scheduled for ${scheduledDate} at ${scheduledTime}`);
    } else {
      // Send Now
      const typeText = smsType === "flash" ? "Flash SMS" : "SMS";
      setStatusMessage(`${typeText} Sent Now!`);
    }

    // Clear status after 3 seconds and reset confirmation
    setTimeout(() => setStatusMessage(""), 3000);
    setConfirmAction(null);
  };

  return (
    <Layout>
      <div className="single-wrapper">
        <h2 className="dashboard-title">Send Single SMS</h2>

        <div className="chart-card">

          {/* Recipients List (Chips) */}
          {recipients.length > 0 && (
            <div className="recipients-container">
              <label className="form-label">Recipients ({recipients.length}/5)</label>
              <div className="recipient-chips">
                {recipients.map((number, idx) => (
                  <div key={idx} className="recipient-chip">
                    <span>+677 {number}</span>
                    <button
                      type="button"
                      className="chip-remove"
                      onClick={() => handleRemoveNumber(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Number Input */}
          <div className="form-group">
            <label className="form-label">
              {recipients.length > 0 ? "Add Another Number" : "Mobile Number *"}
            </label>

            <div className="mobile-field-row">
              <div className="mobile-field-input-group">
                <span className="mobile-prefix-box">+677</span>
                <input
                  type="text"
                  className="mobile-number-input"
                  placeholder="Enter mobile number"
                  maxLength={7}
                  inputMode="numeric"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <button
                className="add-number-btn"
                type="button"
                onClick={handleAddNumber}
                disabled={recipients.length >= 5 || mobileNumber.length !== 7}
              >
                + Add
              </button>
            </div>
            {recipients.length >= 5 && (
              <p className="limit-warning">Maximum 5 recipients reached.</p>
            )}
          </div>

          {/* Sender ID */}
          <div className="form-group">
            <label className="form-label">Sender ID</label>
            <select
              className="form-input"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
            >
              <option value="">Select Sender ID</option>
              <option value="B-MOBILE">B-MOBILE</option>
              <option value="TEST-SMS">TEST-SMS</option>
              <option value="ALERT">ALERT</option>
            </select>
          </div>

          {/* Campaign Name */}
          <div className="form-group">
            <label className="form-label">Campaign Name</label>
            <input
              type="text"
              className="form-input"
              style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
              placeholder="Enter Campaign Name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          {/* SMS Type */}
          <div className="form-group">
            <label className="form-label">SMS Type</label>
            <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="smsType"
                  value="normal"
                  checked={smsType === "normal"}
                  onChange={(e) => setSmsType(e.target.value)}
                  style={{ accentColor: "#9a2a00", width: "16px", height: "16px", cursor: "pointer" }}
                />
                <span className="normal-sms-text">Normal SMS</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="smsType"
                  value="flash"
                  checked={smsType === "flash"}
                  onChange={(e) => setSmsType(e.target.value)}
                  style={{ accentColor: "#9a2a00", width: "16px", height: "16px", cursor: "pointer" }}
                />
                <span className="flash-sms-text">Flash SMS</span>
              </label>
            </div>
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

          {/* Scheduler (Optional) */}
          <div className="form-group">
            <label className="form-label">Schedule (Optional)</label>
            <div className="schedule-row">
              <input
                type="date"
                className="form-input"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
              <div className="time-picker-group">
                <select
                  className="form-input time-select"
                  value={schedHour}
                  onChange={(e) => setSchedHour(e.target.value)}
                >
                  <option value="">HH</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>
                  ))}
                </select>
                <span className="time-separator">:</span>
                <select
                  className="form-input time-select"
                  value={schedMinute}
                  onChange={(e) => setSchedMinute(e.target.value)}
                >
                  <option value="">MM</option>
                  {[...Array(60)].map((_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  className="form-input time-period-select"
                  value={schedPeriod}
                  onChange={(e) => setSchedPeriod(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ color: "red", marginBottom: "10px", textAlign: "center", fontWeight: "bold" }}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="sms-action" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {confirmAction === "schedule" ? (
              <button
                className="apply-btn schedule-btn"
                onClick={() => handleFinalAction("schedule")}
                style={{
                  minWidth: "160px",
                  padding: "12px 24px",
                  backgroundColor: "#008ca1", // Darker blue for confirm
                  color: "#ffffff",
                  border: "2px solid #005f6e",
                  borderRadius: "8px",
                  fontWeight: "700"
                }}
              >
                Confirm Schedule?
              </button>
            ) : (
              <button
                className="apply-btn schedule-btn"
                onClick={() => handleValidationAndConfirm("schedule")}
                style={{
                  minWidth: "160px",
                  padding: "12px 24px",
                  backgroundColor: "#00B0CA", // Blue from palette
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600"
                }}
              >
                {smsType === "flash" ? "Schedule Flash SMS" : "Schedule"}
              </button>
            )}

            {confirmAction === "send" ? (
              <button
                className="apply-btn"
                onClick={() => handleFinalAction("send")}
                style={{
                  minWidth: "160px",
                  padding: "12px 24px",
                  backgroundColor: "#b91c1c", // Darker red for confirm
                  color: "#ffffff",
                  border: "2px solid #7f1d1d",
                  borderRadius: "8px",
                  fontWeight: "700"
                }}
              >
                Confirm Send?
              </button>
            ) : (
              <button
                className="apply-btn"
                onClick={() => handleValidationAndConfirm("send")}
                style={{
                  minWidth: "160px",
                  padding: "12px 24px",
                  backgroundColor: "#E60000", // Red from palette
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600"
                }}
              >
                {smsType === "flash" ? "Send Flash SMS" : "Send Now"}
              </button>
            )}
          </div>
          {statusMessage && (
            <div className="status-message" style={{ marginTop: "10px", padding: "10px", borderRadius: "5px", backgroundColor: "#e6fffa", color: "#047857", textAlign: "center" }}>
              {statusMessage}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default SingleSms;
