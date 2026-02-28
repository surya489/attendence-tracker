import { useMemo, useState } from 'react';
import { BriefcaseBusiness, CircleCheckBig, Clock3, Filter, UserRoundX } from 'lucide-react';
import { UiSelect } from '../components/common/UiSelect';
import { UiTabs } from '../components/common/UiTabs';
import { DataTable } from '../components/common/DataTable';
import { AppBadge } from '../components/common/AppBadge';

const departments = ['All Departments', 'Sales', 'Operations', 'Finance', 'Support'];
const shifts = ['All Shifts', 'Morning', 'General', 'Evening'];

const staffData = [
  { id: 'e101', name: 'Anita Sharma', department: 'Sales', shift: 'Morning', inTime: '09:06 AM', outTime: '--', status: 'Present' },
  { id: 'e102', name: 'Rahul Nair', department: 'Operations', shift: 'General', inTime: '09:28 AM', outTime: '--', status: 'Late' },
  { id: 'e103', name: 'Karthik V', department: 'Finance', shift: 'General', inTime: '--', outTime: '--', status: 'On Leave' },
  { id: 'e104', name: 'Divya M', department: 'Support', shift: 'Evening', inTime: '01:56 PM', outTime: '--', status: 'Present' },
  { id: 'e105', name: 'Vijay Kumar', department: 'Sales', shift: 'Morning', inTime: '09:01 AM', outTime: '--', status: 'Present' },
  { id: 'e106', name: 'Sangeetha R', department: 'Operations', shift: 'General', inTime: '--', outTime: '--', status: 'Absent' },
];

const tabs = ['All', 'Present', 'Late', 'On Leave', 'Absent'];

const statusToVariant = {
  Present: 'success',
  Late: 'warn',
  'On Leave': 'info',
  Absent: 'danger',
};

export const StaffAttendancePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedShift, setSelectedShift] = useState(shifts[0]);
  const [activeTab, setActiveTab] = useState('All');

  const stats = useMemo(() => {
    return {
      total: staffData.length,
      present: staffData.filter((row) => row.status === 'Present').length,
      late: staffData.filter((row) => row.status === 'Late').length,
      leave: staffData.filter((row) => row.status === 'On Leave').length,
      absent: staffData.filter((row) => row.status === 'Absent').length,
    };
  }, []);

  const rows = useMemo(() => {
    return staffData.filter((row) => {
      const matchDepartment = selectedDepartment === 'All Departments' || row.department === selectedDepartment;
      const matchShift = selectedShift === 'All Shifts' || row.shift === selectedShift;
      const matchTab = activeTab === 'All' || row.status === activeTab;
      return matchDepartment && matchShift && matchTab;
    });
  }, [activeTab, selectedDepartment, selectedShift]);

  const columns = [
    { key: 'name', header: 'Employee' },
    { key: 'department', header: 'Department' },
    { key: 'shift', header: 'Shift' },
    { key: 'inTime', header: 'In Time' },
    { key: 'outTime', header: 'Out Time' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <AppBadge variant={statusToVariant[row.status] || 'neutral'}>{row.status}</AppBadge>,
    },
  ];

  return (
    <section className="staffPage">
      <div className="staffStatsGrid">
        <article className="staffStatCard elevatedCard">
          <div>
            <p>Total Staff</p>
            <h3>{stats.total}</h3>
          </div>
          <BriefcaseBusiness size={18} />
        </article>
        <article className="staffStatCard elevatedCard">
          <div>
            <p>Present</p>
            <h3>{stats.present}</h3>
          </div>
          <CircleCheckBig size={18} />
        </article>
        <article className="staffStatCard elevatedCard">
          <div>
            <p>Late</p>
            <h3>{stats.late}</h3>
          </div>
          <Clock3 size={18} />
        </article>
        <article className="staffStatCard elevatedCard">
          <div>
            <p>On Leave / Absent</p>
            <h3>{stats.leave + stats.absent}</h3>
          </div>
          <UserRoundX size={18} />
        </article>
      </div>

      <article className="staffPanel">
        <div className="staffPanelHead">
          <h3>Daily Staff Attendance</h3>
          <div className="staffFilters">
            <UiSelect value={selectedDepartment} options={departments} onChange={setSelectedDepartment} startIcon={Filter} />
            <UiSelect value={selectedShift} options={shifts} onChange={setSelectedShift} startIcon={Filter} />
          </div>
        </div>

        <UiTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="staffTabs" />

        <DataTable columns={columns} rows={rows} emptyText="No records available for selected filters." />
      </article>
    </section>
  );
};
