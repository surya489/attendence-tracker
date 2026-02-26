import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Attendance } from './pages/Attendance';
import { ApproveAttendance } from './pages/ApproveAttendance';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SquareKanban, Settings, HelpCircle, Contact, Handshake, Blocks, Workflow } from "lucide-react";

const headerLinks = [
  {
    label: "Overview",
    path: "/attendance",
    icon: SquareKanban,
  },
  {
    label: "Contact",
    path: "/approve-attendance",
    icon: Contact
  },
  {
    label: "Deals",
    path: "/deals",
    icon: Handshake
  },
  {
    label: "Integration",
    path: "/integration",
    icon: Blocks
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: Workflow 
  },
];

const footerLinks = [
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    label: "Help & Support",
    path: "/help",
    icon: HelpCircle,
  },
];



function App() {
  return (
    <div className="App">
      <Sidebar
        logo="/logo.png"
        headerLinks={headerLinks}
        footerLinks={footerLinks}
      />
      <div className='contentWrap'>
        <Navbar />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/approve-attendance' element={<ApproveAttendance />} />
        </Routes>
        <Footer />
      </div>

    </div>
  );
}

export default App;