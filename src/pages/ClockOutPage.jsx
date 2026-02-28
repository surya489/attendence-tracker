import { useMemo, useState } from 'react';
import { Clock3, LogOut, UserRoundCheck } from 'lucide-react';
import { UiSelect } from '../components/common/UiSelect';
import { AppCheckbox } from '../components/common/AppCheckbox';
import { AppButton } from '../components/common/AppButton';
import { AppBadge } from '../components/common/AppBadge';

const teams = ['All Teams', 'Mason Team', 'Painter Team', 'Tiles Team'];

const workers = [
  { id: 'o1', name: 'Labour 1', team: 'Mason Team', checkedOut: false, inTime: '08:58 AM', outTime: '--' },
  { id: 'o2', name: 'Labour 2', team: 'Mason Team', checkedOut: false, inTime: '09:14 AM', outTime: '--' },
  { id: 'o3', name: 'Labour 3', team: 'Painter Team', checkedOut: true, inTime: '09:02 AM', outTime: '05:43 PM' },
  { id: 'o4', name: 'Labour 4', team: 'Tiles Team', checkedOut: true, inTime: '09:19 AM', outTime: '05:52 PM' },
];

export const ClockOutPage = () => {
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
        <h3>Clock Out Operations</h3>
        <p>Close daily shifts and mark attendance completion.</p>
        <div className="clockSummaryPills">
          <AppBadge variant="success">Completed {workers.filter((worker) => worker.checkedOut).length}</AppBadge>
          <AppBadge variant="warn">In Progress {workers.filter((worker) => !worker.checkedOut).length}</AppBadge>
          <AppBadge variant="neutral">Selected {selected.length}</AppBadge>
        </div>
      </article>

      <article className="clockListCard">
        <div className="clockListHead">
          <label>
            Team
            <UiSelect value={selectedTeam} options={teams} onChange={setSelectedTeam} />
          </label>

          <AppButton variant="primary">Mark Selected Clock Out</AppButton>
        </div>

        <div className="clockRows">
          {rows.map((worker) => (
            <label key={worker.id} className="clockRow">
              <AppCheckbox checked={selected.includes(worker.id)} onChange={() => toggle(worker.id)} ariaLabel={`Select ${worker.name}`} />
              <div>
                <h4>{worker.name}</h4>
                <p>{worker.team}</p>
              </div>
              <AppBadge variant={worker.checkedOut ? 'success' : 'warn'}>
                {worker.checkedOut ? <UserRoundCheck size={13} /> : <Clock3 size={13} />} {worker.checkedOut ? worker.outTime : worker.inTime}
              </AppBadge>
            </label>
          ))}
        </div>

        <div className="clockTimeline">
          <h4>
            <LogOut size={15} /> Recent Clock-Out
          </h4>
          <p>Labour 3 (Painter Team) • 05:43 PM</p>
          <p>Labour 4 (Tiles Team) • 05:52 PM</p>
        </div>
      </article>
    </section>
  );
};
