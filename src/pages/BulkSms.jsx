import { useState, useRef } from "react";
import Layout from "../components/Layout";
import "../styles/bulksms.css";

function BulkSms() {
  const [file, setFile] = useState(null);
  const [totalNumbers, setTotalNumbers] = useState(0);
  const [validNumbers, setValidNumbers] = useState(0);
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [smsType, setSmsType] = useState("normal");
  const [scheduledDate, setScheduledDate] = useState("");
  const [schedHour, setSchedHour] = useState("");
  const [schedMinute, setSchedMinute] = useState("");
  const [schedPeriod, setSchedPeriod] = useState("PM");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmAction, setConfirmAction] = useState(null); // 'send' | 'schedule' | null
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setError("");
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const isCsv = selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv");
      const isExcel = selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls");

      if (!isCsv && !isExcel) {
        setError("Please upload a valid CSV or Excel file.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setFile(selectedFile);
      if (isCsv) {
        parseCSV(selectedFile);
      } else {
        // Mock stats for Excel since we don't have a parser library
        setTotalNumbers(0);
        setValidNumbers(0);
      }
    }
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      // Split by newline
      const lines = text.split(/\r?\n/);
      // Simple logic: regex for digits, ensure length is reasonable (e.g. 7-15 digits)
      let count = 0;
      const numbers = [];

      lines.forEach((line) => {
        // Extract all numbers from line (assuming one per line or comma separated)
        const matches = line.match(/\d+/g);
        if (matches) {
          matches.forEach(num => {
            if (num.length >= 7 && num.length <= 15) {
              numbers.push(num);
              count++;
            }
          });
        }
      });

      setTotalNumbers(numbers.length);
      setValidNumbers(count); // For now assuming all extracted are "valid"
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setError("");
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const isCsv = droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv");
      const isExcel = droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls");

      if (!isCsv && !isExcel) {
        setError("Please upload a valid CSV or Excel file.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setFile(droppedFile);
      if (isCsv) {
        parseCSV(droppedFile);
      } else {
        setTotalNumbers(0);
        setValidNumbers(0);
      }
    }
  };

  return (
    <Layout>
      <div className="bulk-wrapper">
        <h2 className="dashboard-title">Send SMS – Bulk</h2>

        <div className="bulk-card">
          {/* Upload Area */}
          <div
            className="upload-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept=".csv, .xlsx, .xls"
              onChange={handleFileChange}
            />

            {file ? (
              <div className="file-info" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                <span>{file.name}</span>
                <div
                  className="remove-file"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setTotalNumbers(0);
                    setValidNumbers(0);
                    fileInputRef.current.value = null; // Clear input value to allow re-selecting same file
                  }}
                >
                  &times;
                </div>
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



          {/* Stats */}
          {validNumbers > 0 && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Recipients</div>
                <div className="stat-value">{validNumbers}</div>
              </div>
              <div className="stat-card" style={{ borderLeftColor: '#10B981' }}>
                <div className="stat-label">Estimated Cost</div>
                <div className="stat-value">${(validNumbers * 0.05).toFixed(2)}</div>
              </div>
            </div>
          )}

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

          {/* Message Input */}
          <div className="message-area">
            <label className="message-label">Message Content</label>
            <textarea
              className="message-input"
              placeholder="Type your message here..."
              value={message}
              maxLength={160}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div style={{ textAlign: "right", fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
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

          <div className="sms-action" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {confirmAction === "schedule" ? (
              <button
                className="send-btn schedule-btn"
                onClick={() => {
                  const scheduledTime = `${schedHour}:${schedMinute} ${schedPeriod}`;
                  const typeText = smsType === "flash" ? "Flash Campaign" : "Campaign";

                  // Save to localStorage
                  const newCampaign = {
                    id: Date.now(),
                    name: campaignName,
                    senderId: senderId,
                    type: smsType,
                    source: "Bulk SMS",
                    // Extended Fields
                    message: message,
                    fileName: file ? file.name : "",
                    scheduledDate: scheduledDate,
                    scheduledTime: `${scheduledDate} ${scheduledTime}`,
                  };

                  const existingCampaigns = JSON.parse(localStorage.getItem("scheduled_campaigns") || "[]");
                  localStorage.setItem("scheduled_campaigns", JSON.stringify([...existingCampaigns, newCampaign]));

                  setStatusMessage(`${typeText} Scheduled for ${scheduledDate} at ${scheduledTime}`);
                  setTimeout(() => setStatusMessage(""), 3000);
                  setConfirmAction(null);
                }}
                style={{
                  minWidth: "160px",
                  padding: "12px 24px",
                  backgroundColor: "#008ca1",
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
                className="send-btn schedule-btn"
                onClick={() => {
                  if (!file) { setError("Please upload a valid file first."); setTimeout(() => setError(""), 3000); return; }
                  if (!senderId) { setError("Please select a Sender ID."); setTimeout(() => setError(""), 3000); return; }
                  if (!campaignName) { setError("Please enter a Campaign Name."); setTimeout(() => setError(""), 3000); return; }
                  if (!message) { setError("Please enter a message."); setTimeout(() => setError(""), 3000); return; }
                  if (!scheduledDate || !schedHour || !schedMinute) { setError("Please select date and time to schedule."); setTimeout(() => setError(""), 3000); return; }

                  setConfirmAction("schedule");
                }}
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
                {smsType === "flash" ? "Schedule Flash Campaign" : "Schedule Campaign"}
              </button>
            )}

            {confirmAction === "send" ? (
              <button
                className="send-btn"
                onClick={() => {
                  const typeText = smsType === "flash" ? "Flash Campaign" : "Campaign";
                  setStatusMessage(`${typeText} Sent Now!`);
                  setTimeout(() => setStatusMessage(""), 3000);
                  setConfirmAction(null);
                }}
                style={{
                  minWidth: "160px",
                  padding: "12px 24px",
                  backgroundColor: "#b91c1c",
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
                className="send-btn"
                onClick={() => {
                  if (!file) { setError("Please upload a valid file first."); setTimeout(() => setError(""), 3000); return; }
                  if (!senderId) { setError("Please select a Sender ID."); setTimeout(() => setError(""), 3000); return; }
                  if (!campaignName) { setError("Please enter a Campaign Name."); setTimeout(() => setError(""), 3000); return; }
                  if (!message) { setError("Please enter a message."); setTimeout(() => setError(""), 3000); return; }

                  setConfirmAction("send");
                }}
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
                {smsType === "flash" ? "Send Flash Campaign" : "Send Campaign"}
              </button>
            )}
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px", textAlign: "center", fontWeight: "bold" }}>
              {error}
            </div>
          )}

          {statusMessage && (
            <div className="status-message">
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default BulkSms;
