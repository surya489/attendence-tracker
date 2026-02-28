import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Clock3,
  Home,
  Menu,
  Search,
  Settings,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

const primaryMenu = [
  { label: 'Home', path: '/', icon: Home, end: true },
  { label: 'Staff Attendance', path: '/staff-attendance', icon: Clock3 },
  { label: 'My Attendance', path: '/my-attendance', icon: CalendarDays },
];

const attendanceMenu = [
  { label: 'Labour Attendance', path: '/labour-attendance' },
  { label: 'Approve Attendance', path: '/approve-attendance' },
  { label: 'Clock In (All +s)', path: '/clock-in' },
  { label: 'Clock Out', path: '/clock-out' },
];

const footerMenu = [
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Help & Support', path: '/help-support', icon: UserCheck },
];

export const CrmShell = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(true);

  const pageMeta = {
    '/': { title: 'Home Dashboard', subtitle: 'Mortgage CRM snapshot and team pulse' },
    '/staff-attendance': { title: 'Staff Attendance', subtitle: 'Track attendance across departments and shifts' },
    '/my-attendance': { title: 'My Attendance', subtitle: 'Personal check-in, check-out, and leave logs' },
    '/labour-attendance': { title: 'Labour Attendance', subtitle: 'Daily labour tracking with team level controls' },
    '/approve-attendance': { title: 'Approve Attendance', subtitle: 'Review and approve pending attendance requests' },
    '/clock-in': { title: 'Clock In', subtitle: 'Mass or individual clock-in operations' },
    '/clock-out': { title: 'Clock Out', subtitle: 'Mass or individual clock-out operations' },
    '/settings': { title: 'Settings', subtitle: 'Configure modules, users, and company preferences' },
    '/help-support': { title: 'Help & Support', subtitle: 'Support channels, guides, and release notes' },
  };

  const currentMeta = pageMeta[location.pathname] || pageMeta['/'];
  const isMobileViewport = () => window.matchMedia('(max-width: 860px)').matches;

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const onSidebarToggle = () => {
    if (isMobileViewport()) {
      setIsMobileSidebarOpen((prev) => !prev);
      return;
    }

    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="crmApp">
      <aside
        className={`crmSidebar ${isSidebarCollapsed ? 'isCollapsed' : ''} ${isMobileSidebarOpen ? 'isMobileOpen' : ''}`}
      >
        <div>
          <div className="sidebarTop">
            <button
              className="iconBtn"
              type="button"
              aria-label="Toggle sidebar"
              onClick={onSidebarToggle}
            >
              {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
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
            {primaryMenu.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `menuItem ${isActive ? 'isActive' : ''}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            <button className="menuItem" type="button" onClick={() => setIsAttendanceOpen((prev) => !prev)}>
              <Users size={17} />
              <span>Labour Modules</span>
              {isAttendanceOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {isAttendanceOpen && (
              <div className="subMenuWrap">
                {attendanceMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `subMenuItem ${isActive ? 'isSelected' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </nav>
        </div>

        <div className="menuWrap menuFooter">
          {footerMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `menuItem ${isActive ? 'isActive' : ''}`}>
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>

      <main className="crmMain">
        <header className="crmHeader">
          <div className="headerTitle">
            <h2>{currentMeta.title}</h2>
            <p>{currentMeta.subtitle}</p>
          </div>

          <div className="headerActions">
            <button
              className="iconBtn mobileMenuBtn"
              type="button"
              aria-label="Toggle mobile sidebar"
              onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
            >
              {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="searchBox">
              <Search size={16} />
              <input type="text" placeholder="Search lead, client, property..." />
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

        <Outlet />
      </main>

      {isMobileSidebarOpen ? <button type="button" className="sidebarBackdrop" onClick={() => setIsMobileSidebarOpen(false)} /> : null}
    </div>
  );
};
