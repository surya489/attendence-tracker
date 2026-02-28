import { useMemo, useState } from 'react';
import { CalendarDays, CheckCheck, Clock3, TimerReset, XCircle } from 'lucide-react';
import { UiSelect } from '../components/common/UiSelect';
import { UiTabs } from '../components/common/UiTabs';
import { AppButton } from '../components/common/AppButton';
import { DataTable } from '../components/common/DataTable';
import { AppBadge } from '../components/common/AppBadge';

const monthOptions = ['March 2026', 'February 2026', 'January 2026'];
const statusOptions = ['All', 'Present', 'Late', 'Half Day', 'Absent'];

const myAttendanceLogs = [
  { id: 'a1', date: '2026-03-01', day: 'Monday', shift: 'General', checkIn: '09:04 AM', checkOut: '06:12 PM', totalHours: '09h 08m', status: 'Present' },
  { id: 'a2', date: '2026-03-02', day: 'Tuesday', shift: 'General', checkIn: '09:26 AM', checkOut: '06:07 PM', totalHours: '08h 41m', status: 'Late' },
  { id: 'a3', date: '2026-03-03', day: 'Wednesday', shift: 'General', checkIn: '09:08 AM', checkOut: '01:16 PM', totalHours: '04h 08m', status: 'Half Day' },
  { id: 'a4', date: '2026-03-04', day: 'Thursday', shift: 'General', checkIn: '--', checkOut: '--', totalHours: '00h 00m', status: 'Absent' },
  { id: 'a5', date: '2026-03-05', day: 'Friday', shift: 'General', checkIn: '08:58 AM', checkOut: '06:10 PM', totalHours: '09h 12m', status: 'Present' },
  { id: 'a6', date: '2026-03-06', day: 'Saturday', shift: 'General', checkIn: '09:02 AM', checkOut: '05:44 PM', totalHours: '08h 42m', status: 'Present' },
];

const statusToVariant = {
  Present: 'success',
  Late: 'warn',
  'Half Day': 'info',
  Absent: 'danger',
};

export const MyAttendancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const [statusFilter, setStatusFilter] = useState(statusOptions[0]);

  const totals = useMemo(() => {
    return {
      present: myAttendanceLogs.filter((log) => log.status === 'Present').length,
      late: myAttendanceLogs.filter((log) => log.status === 'Late').length,
      halfDay: myAttendanceLogs.filter((log) => log.status === 'Half Day').length,
      absent: myAttendanceLogs.filter((log) => log.status === 'Absent').length,
    };
  }, []);

  const filteredLogs = useMemo(() => {
    if (statusFilter === 'All') {
      return myAttendanceLogs;
    }

    return myAttendanceLogs.filter((log) => log.status === statusFilter);
  }, [statusFilter]);

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'day', header: 'Day' },
    { key: 'shift', header: 'Shift' },
    { key: 'checkIn', header: 'Check In' },
    { key: 'checkOut', header: 'Check Out' },
    { key: 'totalHours', header: 'Total Hours' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <AppBadge variant={statusToVariant[row.status] || 'neutral'}>{row.status}</AppBadge>,
    },
  ];

  return (
    <section className="myAttendancePage">
      <article className="myStatusCard elevatedCard">
        <div>
          <p>Today Status</p>
          <h3>Checked Out</h3>
          <span className="myDateBadge">
            <CalendarDays size={14} /> {selectedMonth}
          </span>
        </div>
        <div className="myStatusActions">
          <AppButton variant="primary">Clock In</AppButton>
          <AppButton variant="secondary">Clock Out</AppButton>
        </div>
      </article>

      <div className="myStatsGrid">
        <article className="myStatCard elevatedCard">
          <p>Present Days</p>
          <h4>{totals.present}</h4>
          <CheckCheck size={17} />
        </article>
        <article className="myStatCard elevatedCard">
          <p>Late Days</p>
          <h4>{totals.late}</h4>
          <Clock3 size={17} />
        </article>
        <article className="myStatCard elevatedCard">
          <p>Half Days</p>
          <h4>{totals.halfDay}</h4>
          <TimerReset size={17} />
        </article>
        <article className="myStatCard elevatedCard">
          <p>Absent Days</p>
          <h4>{totals.absent}</h4>
          <XCircle size={17} />
        </article>
      </div>

      <article className="myLogsPanel">
        <div className="myLogsHead">
          <h3>Attendance History</h3>
          <div className="myFilters">
            <UiSelect value={selectedMonth} options={monthOptions} onChange={setSelectedMonth} />
            <UiTabs tabs={statusOptions} activeTab={statusFilter} onChange={setStatusFilter} className="myTabList" />
          </div>
        </div>

        <DataTable columns={columns} rows={filteredLogs} emptyText="No records for selected status." />
      </article>
    </section>
  );
};
