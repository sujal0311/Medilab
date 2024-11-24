import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ManageUsers from './components/ManageUsers';
import Feedback from './components/Feedback';
import Appointments from './components/Appointments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this CSS is imported
import LabHome from './components/LabHome';
import StaffHome from './components/StaffHome';
import DoctorHome from './components/DoctorHome';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Admin"); // Store user role

  // Handle login - update the state and show a toast
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);  // Set the user role
    toast.success('Logged in successfully!');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    toast.success('Sign up successfully!');
  };

  // Handle logout - update the state and show a toast
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);  // Clear user role
    toast.success('Logged out successfully!');
  };

  return (
    <Router>
      <header style={{ padding: '1rem', backgroundColor: '#fff', color: 'black' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ textDecoration: 'none', color: 'black', fontSize: '1.2rem' }}>
              MediLab System
            </div>
          </div>
          <div>
            {!isLoggedIn ? (
              <>
                <Link to="/" style={{ textDecoration: 'none', marginRight: '1rem' }}>
                  <Button variant="contained" color="primary">Login</Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none', marginRight: '1rem' }}>
                  <Button variant="contained" color="secondary">Signup</Button>
                </Link>
              </>
            ) : (
              <>
                {userRole === 'Admin' && (
                  <>
                    <Link to="/manage-users" style={{ textDecoration: 'none', marginRight: '1rem' }}>
                      <Button variant="contained" color="default">Manage Users</Button>
                    </Link>
                    <Link to="/appointments" style={{ textDecoration: 'none', marginRight: '1rem' }}>
                      <Button variant="contained" color="default">Appointments</Button>
                    </Link>
                    <Link to="/feedback" style={{ textDecoration: 'none', marginRight: '1rem' }}>
                      <Button variant="contained" color="default">Feedback</Button>
                    </Link>
                  </>
                )}
                <Link to="/" >
                  <Button variant="outlined" color="inherit" onClick={handleLogout}>Logout</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/admin-dashboard" element={<Home />} />
        <Route path="/lab-dashboard" element={<LabHome />} />
        <Route path="/staff-dashboard" element={<StaffHome />} />
        <Route path="/doctor-dashboard" element={<DoctorHome />} />
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage handleSignup={handleSignup} />} />
        {/* Admin-related routes */}
        {userRole === 'Admin' && (
          <>
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/feedback" element={<Feedback />} />
          </>
        )}
      </Routes>

      {/* ToastContainer should be outside Routes but still inside Router */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
