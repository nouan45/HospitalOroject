import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Abstracting the form data as a class
class DoctorFormData {
  constructor() {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.age = '';
    this.gender = '';
    this.specialization = '';
    this.experience = '';
    this.licenseNumber = '';
    this.qualifications = '';
    this.hospitalAffiliation = '';
    this.availability = '';
    this.consultationFee = '';
    this.phoneNumber = '';
  }
}

// Doctor Registration class to handle form submission
class DoctorRegistration {
  constructor(formData, setError, navigate) {
    this.formData = formData;
    this.setError = setError;
    this.navigate = navigate;
  }

  async handleSubmit() {
    try {
      const payload = {
        name: this.formData.fullName,
        email: this.formData.email,
        password: this.formData.password,
        age: this.formData.age,
        gender: this.formData.gender,
        specialization: this.formData.specialization,
        yearsExperience: this.formData.experience, // Map correctly
        licenseNumber: this.formData.licenseNumber,
        qualifications: this.formData.qualifications,
        hospitalAffiliation: this.formData.hospitalAffiliation,
        shiftTiming: this.formData.availability, // Map correctly
        consultationFee: this.formData.consultationFee,
        phoneNumber: this.formData.phoneNumber,
      };
      const response = await axios.post('http://localhost:3001/signupDoctor', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      // Redirect to the doctor-home page after successful registration
      this.navigate('/doctor-home');
    } catch (err) {
      console.error('Error registering doctor:', err.response?.data || err.message);
      this.setError('Failed to register. Please try again.');
    }
  }
}

// Wrapper function to handle hooks and interact with the class
const RegisterDoctorWrapper = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(new DoctorFormData());
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const doctorRegistration = new DoctorRegistration(formData, setError, navigate);
    await doctorRegistration.handleSubmit();
  };

  return <RegisterDoctor formData={formData} error={error} handleChange={handleChange} handleSubmit={handleSubmit} />;
};

// Doctor Registration component to render the UI
const RegisterDoctor = ({ formData, error, handleChange, handleSubmit }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          bgcolor: 'white',
          padding: '2rem',
          borderRadius: 2,
          boxShadow: 3,
          overflowY: 'auto',
          maxHeight: '90vh',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Doctor Registration
        </Typography>

        {error && (
          <Typography color="error" variant="body2" align="center" gutterBottom>
            {error}
          </Typography>
        )}

        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Years of Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="License Number"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Hospital Affiliation (if any)"
          name="hospitalAffiliation"
          value={formData.hospitalAffiliation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Availability/Shift Timing"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Consultation Fee"
          name="consultationFee"
          value={formData.consultationFee}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
          onClick={handleSubmit}
        >
          Sign-up
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterDoctorWrapper;




