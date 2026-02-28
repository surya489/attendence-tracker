import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MyAttendancePage } from './pages/MyAttendancePage';
import { StaffAttendancePage } from './pages/StaffAttendancePage';
import { LabourAttendancePage } from './pages/LabourAttendancePage';
import { ApproveAttendancePage } from './pages/ApproveAttendancePage';
import { ClockInPage } from './pages/ClockInPage';
import { ClockOutPage } from './pages/ClockOutPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { CrmShell } from './components/layout/CrmShell';

function App() {
  return (
    <Routes>
      <Route element={<CrmShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff-attendance" element={<StaffAttendancePage />} />
        <Route path="/my-attendance" element={<MyAttendancePage />} />
        <Route path="/labour-attendance" element={<LabourAttendancePage />} />
        <Route path="/approve-attendance" element={<ApproveAttendancePage />} />
        <Route path="/clock-in" element={<ClockInPage />} />
        <Route path="/clock-out" element={<ClockOutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help-support" element={<HelpSupportPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
