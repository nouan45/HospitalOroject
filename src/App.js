import './App.css';
import React from 'react';
import LoginForm from './Components/LoginForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/register';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Route to Login Form */}
          <Route path="/" element={<LoginForm />} />

          {/* Route to Home Page */}
          <Route path="/home" element={<Home />} />

          {/* Route to Register Page */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
