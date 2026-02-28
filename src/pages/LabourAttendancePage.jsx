import { useMemo, useState } from 'react';
import { Plus, UserRound, UserRoundCheck, UserRoundX, WandSparkles } from 'lucide-react';
import { UiSelect } from '../components/common/UiSelect';
import { UiTabs } from '../components/common/UiTabs';
import { DateField } from '../components/common/DateField';
import { AppBadge } from '../components/common/AppBadge';
import { AppButton } from '../components/common/AppButton';

const projects = ['Green Valley Residency', 'Sunrise Towers', 'Oakline Villas'];
const teams = ['Mason Team', 'Painter Team', 'Tiles Team'];

const labourTeams = [
  {
    id: 'tm1',
    name: 'Sakthivel Team',
    role: 'Mason',
    members: [
      { id: 'l1', name: 'Labour 1', status: 'Pending' },
      { id: 'l2', name: 'Labour 2', status: 'At Work' },
      { id: 'l3', name: 'Labour 3', status: 'Present' },
      { id: 'l4', name: 'Labour 4', status: 'Absent' },
    ],
  },
  {
    id: 'tm2',
    name: 'Gokul Team',
    role: 'Painter',
    members: [
      { id: 'l5', name: 'Labour 5', status: 'Present' },
      { id: 'l6', name: 'Labour 6', status: 'At Work' },
      { id: 'l7', name: 'Labour 7', status: 'Pending' },
    ],
  },
  {
    id: 'tm3',
    name: 'Krish Team',
    role: 'Tiles',
    members: [
      { id: 'l8', name: 'Labour 8', status: 'Absent' },
      { id: 'l9', name: 'Labour 9', status: 'Present' },
    ],
  },
];

const tabs = ['Pending', 'At Work', 'Marked'];

const statusToVariant = {
  Pending: 'warn',
  'At Work': 'info',
  Present: 'success',
  Absent: 'danger',
};

export const LabourAttendancePage = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [selectedDate, setSelectedDate] = useState('2026-02-28');
  const [activeTab, setActiveTab] = useState('Pending');
  const [openMenuFor, setOpenMenuFor] = useState('');

  const metrics = useMemo(() => {
    const all = labourTeams.flatMap((team) => team.members);
    return {
      total: all.length,
      atWork: all.filter((x) => x.status === 'At Work').length,
      present: all.filter((x) => x.status === 'Present').length,
      absent: all.filter((x) => x.status === 'Absent').length,
      pending: all.filter((x) => x.status === 'Pending').length,
    };
  }, []);

  const filteredTeams = useMemo(() => {
    return labourTeams
      .map((team) => {
        const members = team.members.filter((member) => {
          if (activeTab === 'Marked') {
            return member.status === 'Present' || member.status === 'Absent';
          }
          return member.status === activeTab;
        });

        return { ...team, members };
      })
      .filter((team) => team.members.length > 0);
  }, [activeTab]);

  return (
    <section className="labourPage">
      <article className="labourFilterCard">
        <div className="labourFilters">
          <UiSelect label="Project" value={selectedProject} options={projects} onChange={setSelectedProject} />
          <UiSelect label="Team" value={selectedTeam} options={teams} onChange={setSelectedTeam} />
          <DateField label="Date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>

        <div className="labourMetrics">
          <AppBadge variant="neutral">Labours ({metrics.total})</AppBadge>
          <AppBadge variant="info">At Work ({metrics.atWork})</AppBadge>
          <AppBadge variant="success">Marked ({metrics.present})</AppBadge>
          <AppBadge variant="danger">Absent ({metrics.absent})</AppBadge>
        </div>

        <UiTabs
          tabs={tabs.map((tab) => {
            const count = tab === 'Pending' ? metrics.pending : tab === 'At Work' ? metrics.atWork : metrics.present + metrics.absent;
            return { id: tab, label: `${tab} (${count})` };
          })}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="labourTabs"
        />
      </article>

      <div className="labourTeamList">
        {filteredTeams.length === 0 ? (
          <article className="labourTeamCard">
            <p className="labourEmpty">No labour records found for this tab.</p>
          </article>
        ) : (
          filteredTeams.map((team) => (
            <article key={team.id} className="labourTeamCard">
              <div className="labourTeamHead">
                <h3>
                  {team.name} <span>({team.role})</span>
                </h3>
                <div className="labourActionWrap">
                  <AppButton
                    variant="lavender"
                    size="sm"
                    icon={<Plus size={14} />}
                    iconRight
                    onClick={() => setOpenMenuFor((prev) => (prev === team.id ? '' : team.id))}
                  >
                    Add
                  </AppButton>
                  {openMenuFor === team.id && (
                    <div className="labourAddMenu">
                      <button type="button">
                        <UserRound size={14} /> New Labour
                      </button>
                      <button type="button">
                        <WandSparkles size={14} /> Auto Generate
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="labourMembers">
                {team.members.map((member) => (
                  <div key={member.id} className="labourMemberRow">
                    <div className="labourMemberName">
                      <UserRound size={15} />
                      <span>{member.name}</span>
                    </div>
                    <AppBadge variant={statusToVariant[member.status] || 'neutral'}>
                      {member.status === 'Present' && <UserRoundCheck size={12} />}
                      {member.status === 'Absent' && <UserRoundX size={12} />}
                      {member.status}
                    </AppBadge>
                  </div>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};
