import { useMemo, useState } from 'react';
import { Building2, ShieldCheck, UserCog } from 'lucide-react';
import { UiSelect } from '../components/common/UiSelect';
import { DataTable } from '../components/common/DataTable';
import { AppBadge } from '../components/common/AppBadge';

const timezoneOptions = ['Asia/Kolkata', 'UTC'];

const roleRows = [
  { id: 'admin', role: 'Admin', attendance: 'Full', approval: 'Full', settings: 'Full' },
  { id: 'manager', role: 'Manager', attendance: 'View/Edit', approval: 'Approve', settings: 'None' },
  { id: 'employee', role: 'Employee', attendance: 'Self Only', approval: 'None', settings: 'None' },
];

export const SettingsPage = () => {
  const [timeZone, setTimeZone] = useState(timezoneOptions[0]);
  const [settings, setSettings] = useState({
    autoAttendance: true,
    geoFencing: false,
    requireApproval: true,
    dailyDigest: true,
  });

  const columns = useMemo(
    () => [
      { key: 'role', header: 'Role' },
      { key: 'attendance', header: 'Attendance' },
      { key: 'approval', header: 'Approval' },
      {
        key: 'settings',
        header: 'Settings',
        render: (row) => <AppBadge variant={row.settings === 'Full' ? 'success' : 'neutral'}>{row.settings}</AppBadge>,
      },
    ],
    []
  );

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="settingsPage">
      <article className="settingsCard elevatedCard">
        <div className="settingsHead">
          <Building2 size={18} />
          <h3>Company Preferences</h3>
        </div>
        <div className="settingsGrid">
          <label>
            Company Name
            <input type="text" defaultValue="Mortgage CRM Pvt Ltd" />
          </label>
          <label>
            Time Zone
            <UiSelect value={timeZone} options={timezoneOptions} onChange={setTimeZone} />
          </label>
          <label>
            Work Start Time
            <input type="time" defaultValue="09:00" />
          </label>
          <label>
            Work End Time
            <input type="time" defaultValue="18:00" />
          </label>
        </div>
      </article>

      <article className="settingsCard">
        <div className="settingsHead">
          <ShieldCheck size={18} />
          <h3>Attendance Rules</h3>
        </div>
        <div className="settingsToggleList">
          <button type="button" className="settingsToggleRow" onClick={() => toggleSetting('autoAttendance')}>
            Auto mark attendance from biometric
            <span className={`togglePill ${settings.autoAttendance ? 'isOn' : ''}`}>{settings.autoAttendance ? 'On' : 'Off'}</span>
          </button>
          <button type="button" className="settingsToggleRow" onClick={() => toggleSetting('geoFencing')}>
            Enable geo-fencing for mobile check-in
            <span className={`togglePill ${settings.geoFencing ? 'isOn' : ''}`}>{settings.geoFencing ? 'On' : 'Off'}</span>
          </button>
          <button type="button" className="settingsToggleRow" onClick={() => toggleSetting('requireApproval')}>
            Require manual approval for corrections
            <span className={`togglePill ${settings.requireApproval ? 'isOn' : ''}`}>{settings.requireApproval ? 'On' : 'Off'}</span>
          </button>
          <button type="button" className="settingsToggleRow" onClick={() => toggleSetting('dailyDigest')}>
            Send daily attendance digest to managers
            <span className={`togglePill ${settings.dailyDigest ? 'isOn' : ''}`}>{settings.dailyDigest ? 'On' : 'Off'}</span>
          </button>
        </div>
      </article>

      <article className="settingsCard">
        <div className="settingsHead">
          <UserCog size={18} />
          <h3>Roles & Access</h3>
        </div>
        <DataTable columns={columns} rows={roleRows} />
      </article>
    </section>
  );
};
