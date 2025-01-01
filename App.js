import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import all components
import LoginForm from './Components/LoginForm';
import Home from './Pages/Home';
import RegisterPatient from './Pages/registerPatient';
import RegisterDoctor from './Pages/registerDoctor';
import BookAppointment from './Components/bookAppointment';
import Home2 from './Pages/Home2';
import DoctorProfile from './Pages/profileDoctor';
import ProfilePatient from './Pages/profilePatient';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            zIndex: 1,
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/patient-home" element={<Home />} />
            <Route path="/register-patient" element={<RegisterPatient />} />
            <Route path="/register-doctor" element={<RegisterDoctor />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/doctor-home" element={<Home2 />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/profile-patient" element={<ProfilePatient />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;


