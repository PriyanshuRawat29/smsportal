import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";


import SingleSms from "./pages/SingleSms";
import BulkSms from "./pages/BulkSms";

import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Campaigns from "./pages/Campaigns";
import ScheduledCampaigns from "./pages/ScheduledCampaigns";
import Balance from "./pages/Balance";
import Settings from "./pages/Settings";
import DndManagement from "./pages/DndManagement";
import BlacklistUser from "./pages/BlacklistUser";
import BlockUserManagement from "./pages/BlockUserManagement";
import SenderId from "./pages/SenderId";
import SystemStatus from "./pages/SystemStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/sender-ids" element={<SenderId />} />

        <Route path="/send-sms/single" element={<SingleSms />} />
        <Route path="/send-sms/bulk" element={<BulkSms />} />

        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/scheduled" element={<ScheduledCampaigns />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dnd-management" element={<DndManagement />} />
        <Route path="/blacklist-user" element={<BlacklistUser />} />
        <Route path="/block-user-management" element={<BlockUserManagement />} />
        <Route path="/system-status" element={<SystemStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
