import { useMemo, useState } from 'react';
import { Clock3, UserRoundCheck } from 'lucide-react';
import { UiSelect } from '../components/common/UiSelect';
import { AppCheckbox } from '../components/common/AppCheckbox';
import { AppButton } from '../components/common/AppButton';
import { AppBadge } from '../components/common/AppBadge';

const teams = ['All Teams', 'Mason Team', 'Painter Team', 'Tiles Team'];

const workers = [
  { id: 'w1', name: 'Labour 1', team: 'Mason Team', checkedIn: true, time: '08:58 AM' },
  { id: 'w2', name: 'Labour 2', team: 'Mason Team', checkedIn: false, time: '--' },
  { id: 'w3', name: 'Labour 3', team: 'Painter Team', checkedIn: true, time: '09:08 AM' },
  { id: 'w4', name: 'Labour 4', team: 'Tiles Team', checkedIn: false, time: '--' },
  { id: 'w5', name: 'Labour 5', team: 'Painter Team', checkedIn: false, time: '--' },
];

export const ClockInPage = () => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [selected, setSelected] = useState([]);

  const rows = useMemo(() => {
    return workers.filter((worker) => selectedTeam === 'All Teams' || worker.team === selectedTeam);
  }, [selectedTeam]);

  const toggle = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <section className="clockPage">
      <article className="clockSummaryCard elevatedCard">
        <h3>Clock In Operations</h3>
        <p>Select team members and mark check-in in one action.</p>
        <div className="clockSummaryPills">
          <AppBadge variant="success">Checked In {workers.filter((worker) => worker.checkedIn).length}</AppBadge>
          <AppBadge variant="warn">Pending {workers.filter((worker) => !worker.checkedIn).length}</AppBadge>
          <AppBadge variant="neutral">Selected {selected.length}</AppBadge>
        </div>
      </article>

      <article className="clockListCard">
        <div className="clockListHead">
          <label>
            Team
            <UiSelect value={selectedTeam} options={teams} onChange={setSelectedTeam} />
          </label>

          <AppButton variant="primary">Mark Selected Clock In</AppButton>
        </div>

        <div className="clockRows">
          {rows.map((worker) => (
            <label key={worker.id} className="clockRow">
              <AppCheckbox checked={selected.includes(worker.id)} onChange={() => toggle(worker.id)} ariaLabel={`Select ${worker.name}`} />
              <div>
                <h4>{worker.name}</h4>
                <p>{worker.team}</p>
              </div>
              <AppBadge variant={worker.checkedIn ? 'success' : 'warn'}>
                {worker.checkedIn ? <UserRoundCheck size={13} /> : <Clock3 size={13} />} {worker.time}
              </AppBadge>
            </label>
          ))}
        </div>
      </article>
    </section>
  );
};
