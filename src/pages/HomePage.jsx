import { ArrowUpRight, BadgeDollarSign, Building2, CalendarClock, CircleCheckBig, FileClock, TrendingUp, Users } from 'lucide-react';
import { AppButton } from '../components/common/AppButton';
import { AppBadge } from '../components/common/AppBadge';
import { SurfaceCard } from '../components/common/SurfaceCard';

const stats = [
  { title: 'Total Leads', value: '1,248', change: '+8.4%', icon: Users },
  { title: 'Active Loans', value: '386', change: '+3.1%', icon: BadgeDollarSign },
  { title: 'Pending Approval', value: '92', change: '-1.8%', icon: FileClock },
  { title: 'Closings This Month', value: '44', change: '+10.2%', icon: CircleCheckBig },
];

const pipeline = [
  { stage: 'New Enquiry', count: 120, percent: 84 },
  { stage: 'Document Review', count: 74, percent: 62 },
  { stage: 'Credit Check', count: 52, percent: 43 },
  { stage: 'Loan Approved', count: 31, percent: 28 },
];

const activities = [
  { name: 'Rahul', action: 'updated KYC for Client #C-1024', time: '5 mins ago' },
  { name: 'Anita', action: 'moved Lead #L-443 to Credit Check', time: '18 mins ago' },
  { name: 'Vijay', action: 'scheduled site visit for Oakline Villas', time: '35 mins ago' },
  { name: 'Karthik', action: 'closed Loan #LN-882', time: '1 hr ago' },
];

const upcoming = [
  { title: 'Daily standup with sales + ops', time: '10:00 AM' },
  { title: 'Review pending attendance approvals', time: '12:15 PM' },
  { title: 'Client call: Green Valley Residency', time: '3:30 PM' },
];

export const HomePage = () => {
  return (
    <section className="homePage">
      <div className="homeStatsGrid">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <SurfaceCard key={item.title} className="homeStatCard">
              <div className="homeStatTop">
                <p>{item.title}</p>
                <span className="iconOrb"><Icon size={17} /></span>
              </div>
              <h3>{item.value}</h3>
              <AppBadge variant="info" className="trendBadge">
                <TrendingUp size={14} /> {item.change}
              </AppBadge>
            </SurfaceCard>
          );
        })}
      </div>

      <div className="homeBodyGrid">
        <SurfaceCard className="homePanel elevatedCard">
          <div className="panelHead">
            <h3>Loan Pipeline</h3>
            <AppButton variant="ghost" size="sm" icon={<ArrowUpRight size={14} />} iconRight>
              View Report
            </AppButton>
          </div>

          <div className="pipelineList">
            {pipeline.map((item) => (
              <div key={item.stage} className="pipelineRow">
                <div className="pipelineMeta">
                  <span>{item.stage}</span>
                  <strong>{item.count}</strong>
                </div>
                <div className="progressTrack">
                  <div className="progressFill" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="homePanel elevatedCard">
          <div className="panelHead">
            <h3>Today Schedule</h3>
            <span className="iconOrb"><CalendarClock size={17} /></span>
          </div>

          <div className="scheduleList">
            {upcoming.map((item) => (
              <div key={item.title} className="scheduleRow">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.time}</p>
                </div>
                <span className="dotStatus" />
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <SurfaceCard className="homePanel elevatedCard">
        <div className="panelHead">
          <h3>Recent Activity</h3>
          <span className="iconOrb"><Building2 size={17} /></span>
        </div>

        <div className="activityList">
          {activities.map((item) => (
            <div key={`${item.name}-${item.time}`} className="activityRow">
              <h4>{item.name}</h4>
              <p>{item.action}</p>
              <time>{item.time}</time>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </section>
  );
};
