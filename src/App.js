import './App.css';
import { useMemo, useState } from 'react';
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleUserRound,
  Clock3,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Users,
  UserRound,
  UserRoundCheck,
  UserRoundX,
  WandSparkles,
} from 'lucide-react';

const projects = ['Green Valley Residency', 'Sunrise Towers', 'Oakline Villas'];
const teams = ['Mason Team', 'Painter Team', 'Tiles Team'];
const dates = ['03-06-2025', '04-06-2025', '05-06-2025'];

const attendanceGroups = [
  {
    id: 'mason-team',
    title: 'Sakthivel Team',
    role: 'Mason',
    members: [
      { id: 'm1', name: 'Labour 1', status: 'Pending' },
      { id: 'm2', name: 'Labour 2', status: 'At Work' },
      { id: 'm3', name: 'Labour 3', status: 'Present' },
      { id: 'm4', name: 'Labour 4', status: 'Absent' },
    ],
  },
  {
    id: 'painter-team',
    title: 'Gokul Team',
    role: 'Painter',
    members: [
      { id: 'p1', name: 'Labour 1', status: 'Present' },
      { id: 'p2', name: 'Labour 2', status: 'Absent' },
      { id: 'p3', name: 'Labour 3', status: 'Pending' },
      { id: 'p4', name: 'Labour 4', status: 'At Work' },
    ],
  },
  {
    id: 'tiles-team',
    title: 'Krish Team',
    role: 'Tiles',
    members: [
      { id: 't1', name: 'Labour 1', status: 'Present' },
      { id: 't2', name: 'Labour 2', status: 'Pending' },
      { id: 't3', name: 'Labour 3', status: 'Absent' },
    ],
  },
];

const statusTabs = [
  { id: 'Pending', label: 'Pending' },
  { id: 'At Work', label: 'At Work' },
  { id: 'Marked', label: 'Marked' },
];

const sidebarMenu = [
  { id: 'staff', label: 'Staff Attendance', icon: Clock3 },
  { id: 'my', label: 'My Attendance', icon: CalendarDays },
];

function Dropdown({ label, value, options, icon: Icon, isOpen, onToggle, onSelect }) {
  return (
    <div className="selectWrap">
      <label className="selectLabel">{label}</label>
      <button className="selectBtn" type="button" onClick={onToggle}>
        <span className="selectValue">{value}</span>
        {Icon && <Icon size={16} className="selectIcon" />}
      </button>
      {isOpen && (
        <div className="selectMenu">
          {options.map((option) => (
            <button
              key={option}
              className={`selectOption ${option === value ? 'isActive' : ''}`}
              type="button"
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLabourMenuOpen, setIsLabourMenuOpen] = useState(true);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const [openDropdown, setOpenDropdown] = useState('');
  const [activeTab, setActiveTab] = useState('Pending');
  const [openAddMenuFor, setOpenAddMenuFor] = useState('mason-team');

  const metrics = useMemo(() => {
    const allMembers = attendanceGroups.flatMap((group) => group.members);
    const markedCount = allMembers.filter((member) => member.status === 'Present' || member.status === 'Absent').length;

    return {
      labours: allMembers.length,
      atWork: allMembers.filter((member) => member.status === 'At Work').length,
      shifts: Math.max(0, markedCount - 1),
      absent: allMembers.filter((member) => member.status === 'Absent').length,
      pending: allMembers.filter((member) => member.status === 'Pending').length,
      marked: markedCount,
    };
  }, []);

  const filteredGroups = useMemo(() => {
    return attendanceGroups
      .map((group) => {
        let filteredMembers = group.members;

        if (activeTab === 'Marked') {
          filteredMembers = group.members.filter((member) =>
            ['Present', 'Absent'].includes(member.status)
          );
        } else {
          filteredMembers = group.members.filter((member) => member.status === activeTab);
        }

        return {
          ...group,
          members: filteredMembers,
        };
      })
      .filter((group) => group.members.length > 0);
  }, [activeTab]);

  return (
    <div className="crmApp">
      <aside className={`crmSidebar ${isSidebarCollapsed ? 'isCollapsed' : ''}`}>
        <div>
          <div className="sidebarTop">
            <button
              className="iconBtn"
              type="button"
              aria-label="Toggle sidebar"
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            >
              <Menu size={18} />
            </button>
            <div className="brandWrap">
              <div className="brandLogo">M</div>
              <div className="brandText">
                <h1>Mortgage CRM</h1>
                <p>Attendance Suite</p>
              </div>
            </div>
          </div>

          <nav className="menuWrap">
            {sidebarMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button className="menuItem" type="button" key={item.id}>
                  <Icon size={17} />
                  <span>{item.label}</span>
                  <ChevronDown size={15} />
                </button>
              );
            })}

            <button className="menuItem isActive" type="button" onClick={() => setIsLabourMenuOpen((prev) => !prev)}>
              <Users size={17} />
              <span>Labour Attendance</span>
              {isLabourMenuOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {isLabourMenuOpen && (
              <div className="subMenuWrap">
                <button className="subMenuItem isSelected" type="button">Attendance</button>
                <button className="subMenuItem" type="button">Approve Attendance</button>
                <button className="subMenuItem" type="button">Clock In (All +s)</button>
                <button className="subMenuItem" type="button">Clock Out</button>
              </div>
            )}
          </nav>
        </div>
      </aside>

      <main className="crmMain">
        <header className="crmHeader">
          <div className="headerTitle">
            <h2>Labour Attendance</h2>
            <p>Project-wise workforce overview</p>
          </div>

          <div className="headerActions">
            <div className="searchBox">
              <Search size={16} />
              <input type="text" placeholder="Search labour, team..." />
            </div>
            <button className="iconBtn" type="button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="profileBtn" type="button">
              <CircleUserRound size={22} />
              <span>HR Manager</span>
            </button>
          </div>
        </header>

        <section className="dashboardCard">
          <div className="filterRow">
            <Dropdown
              label="Project"
              value={selectedProject}
              options={projects}
              icon={ChevronDown}
              isOpen={openDropdown === 'project'}
              onToggle={() => setOpenDropdown((prev) => (prev === 'project' ? '' : 'project'))}
              onSelect={(value) => {
                setSelectedProject(value);
                setOpenDropdown('');
              }}
            />

            <Dropdown
              label="Team"
              value={selectedTeam}
              options={teams}
              icon={ChevronDown}
              isOpen={openDropdown === 'team'}
              onToggle={() => setOpenDropdown((prev) => (prev === 'team' ? '' : 'team'))}
              onSelect={(value) => {
                setSelectedTeam(value);
                setOpenDropdown('');
              }}
            />

            <div className="dateNavWrap">
              <button type="button" className="iconBtn dateNav">
                <ChevronLeft size={16} />
              </button>

              <Dropdown
                label="Date"
                value={selectedDate}
                options={dates}
                icon={CalendarDays}
                isOpen={openDropdown === 'date'}
                onToggle={() => setOpenDropdown((prev) => (prev === 'date' ? '' : 'date'))}
                onSelect={(value) => {
                  setSelectedDate(value);
                  setOpenDropdown('');
                }}
              />

              <button type="button" className="iconBtn dateNav">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="metricGrid">
            <article className="metricCard">
              <BriefcaseBusiness size={17} />
              <span>Labours ({metrics.labours})</span>
            </article>
            <article className="metricCard">
              <UserRoundCheck size={17} />
              <span>At Work ({metrics.atWork})</span>
            </article>
            <article className="metricCard">
              <LayoutDashboard size={17} />
              <span>Shifts ({metrics.shifts})</span>
            </article>
            <article className="metricCard">
              <UserRoundX size={17} />
              <span>Absent ({metrics.absent})</span>
            </article>
          </div>

          <div className="tabsRow" role="tablist" aria-label="Attendance tabs">
            {statusTabs.map((tab) => {
              const count = tab.id === 'Pending' ? metrics.pending : tab.id === 'At Work' ? metrics.atWork : metrics.marked;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`tabBtn ${activeTab === tab.id ? 'isActive' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="teamSection">
            {filteredGroups.length === 0 ? (
              <div className="emptyState">No labour records in this tab.</div>
            ) : (
              filteredGroups.map((group) => (
                <article className="teamCard" key={group.id}>
                  <div className="teamHeader">
                    <h3>
                      {group.title} <span>({group.role})</span>
                    </h3>

                    <div className="addMenuWrap">
                      <button
                        className="addBtn"
                        type="button"
                        onClick={() => setOpenAddMenuFor((prev) => (prev === group.id ? '' : group.id))}
                      >
                        Add <Plus size={14} />
                      </button>

                      {openAddMenuFor === group.id && (
                        <div className="addMenu">
                          <button type="button">
                            <UserRound size={15} /> New Labour
                          </button>
                          <button type="button">
                            <WandSparkles size={15} /> Auto Generate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="memberGrid">
                    {group.members.map((member) => (
                      <div className="memberRow" key={member.id}>
                        <div className="memberName">
                          <UserRound size={15} />
                          <span>{member.name}</span>
                        </div>

                        <span className={`statusPill ${member.status.toLowerCase().replace(' ', '-')}`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
