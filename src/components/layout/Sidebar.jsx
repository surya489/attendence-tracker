import { Routes, Route, Link } from 'react-router-dom';

import { ApproveAttendance } from '../../pages/ApproveAttendance';
import { Attendance } from '../../pages/Attendance';

export const Sidebar = () => {

    return (
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/attendance'>Approve</Link>
                <Link to='/approve-attendance'>ApproveAttendance</Link>
            </nav>
        
            <Routes>
                <Route path='/' element={<h1>Home</h1>} />
                <Route path='/attendance' element={Attendance} />
                <Route path='/approve-attendance' element={ApproveAttendance} />
            </Routes>
        </>
    )   

}