import { useMemo, useState } from 'react';
import { Check, ClipboardCheck, Filter, X } from 'lucide-react';
import { UiSelect } from '../components/common/UiSelect';
import { UiTabs } from '../components/common/UiTabs';
import { AppBadge } from '../components/common/AppBadge';
import { AppButton } from '../components/common/AppButton';

const requestTypes = ['All Requests', 'Clock In', 'Clock Out', 'Attendance Correction', 'Leave'];
const statusTabs = ['Pending', 'Approved', 'Rejected'];

const requestData = [
  { id: 'r1001', employee: 'Anita Sharma', team: 'Sales', type: 'Clock In', date: '2026-02-28', reason: 'Biometric delay', status: 'Pending' },
  { id: 'r1002', employee: 'Rahul Nair', team: 'Operations', type: 'Attendance Correction', date: '2026-02-28', reason: 'Forgot check-out', status: 'Pending' },
  { id: 'r1003', employee: 'Divya M', team: 'Support', type: 'Leave', date: '2026-02-27', reason: 'Medical leave', status: 'Approved' },
  { id: 'r1004', employee: 'Vijay Kumar', team: 'Sales', type: 'Clock Out', date: '2026-02-27', reason: 'Mobile app failure', status: 'Rejected' },
];

const statusToVariant = {
  Pending: 'warn',
  Approved: 'success',
  Rejected: 'danger',
};

export const ApproveAttendancePage = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedType, setSelectedType] = useState(requestTypes[0]);

  const counts = useMemo(() => {
    return {
      pending: requestData.filter((item) => item.status === 'Pending').length,
      approved: requestData.filter((item) => item.status === 'Approved').length,
      rejected: requestData.filter((item) => item.status === 'Rejected').length,
    };
  }, []);

  const rows = useMemo(() => {
    return requestData.filter((item) => {
      const matchTab = item.status === activeTab;
      const matchType = selectedType === 'All Requests' || item.type === selectedType;
      return matchTab && matchType;
    });
  }, [activeTab, selectedType]);

  return (
    <section className="approvePage">
      <article className="approveSummaryCard elevatedCard">
        <div className="approveSummaryHead">
          <h3>Request Queue</h3>
          <UiSelect value={selectedType} options={requestTypes} onChange={setSelectedType} startIcon={Filter} />
        </div>

        <div className="approveMetricPills">
          <AppBadge variant="warn">Pending {counts.pending}</AppBadge>
          <AppBadge variant="success">Approved {counts.approved}</AppBadge>
          <AppBadge variant="danger">Rejected {counts.rejected}</AppBadge>
        </div>

        <UiTabs tabs={statusTabs} activeTab={activeTab} onChange={setActiveTab} className="approveTabs" />
      </article>

      <article className="approveListCard elevatedCard">
        <div className="approveListHead">
          <ClipboardCheck size={18} />
          <h3>{activeTab} Requests</h3>
        </div>

        <div className="approveRows">
          {rows.length === 0 ? (
            <p className="approveEmpty">No requests found for this filter.</p>
          ) : (
            rows.map((row) => (
              <div key={row.id} className="approveRow">
                <div>
                  <h4>{row.employee}</h4>
                  <p>{row.team} • {row.type} • {row.date}</p>
                  <p className="approveReason">{row.reason}</p>
                  <AppBadge variant={statusToVariant[row.status] || 'neutral'}>{row.status}</AppBadge>
                </div>

                <div className="approveActions">
                  <AppButton variant="success" size="sm" icon={<Check size={14} />}>Approve</AppButton>
                  <AppButton variant="danger" size="sm" icon={<X size={14} />}>Reject</AppButton>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </section>
  );
};
