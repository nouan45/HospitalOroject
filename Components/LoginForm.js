import React, { Component } from "react";
import { TextField, Button, Box, Typography, Avatar, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./LOGO.png";

/**
 * User class encapsulates the login-related data and behavior.
 */
class User {
  constructor() {
    this.email = "";
    this.password = "";
    this.role = "";
  }

  /**
   * Checks if all fields are valid.
   */
  isValid() {
    return this.email && this.password && this.role;
  }
}

/**
 * LoginFormClass handles the login form logic and interacts with the backend.
 */
class LoginFormClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new User(),
      error: "", // Tracks form errors
    };
  }

  /**
   * Handles input changes dynamically.
   */
  handleInputChange = (field, value) => {
    const { user } = this.state;
    user[field] = value;
    this.setState({ user });
  };

  /**
   * Handles login submission.
   */
  handleLogin = async () => {
    const { user } = this.state;

    if (!user.isValid()) {
      alert("Please fill in all fields and select a role before logging in.");
      return;
    }
    console.log({
      email: user.email,
      password: user.password,
      role: user.role,
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          email: user.email,
          password: user.password,
          role: user.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", // Explicitly set content type
          },
          withCredentials: true, 
        }
      );

      console.log("Login successful response:", response.data);
    localStorage.setItem("email", user.email);  
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    console.log("Login successful response:", response.data);

if (response.data.name) {
  console.log("Storing doctorName:", response.data.name); // Debugging
  localStorage.setItem("doctorName", response.data.name); // Store doctorName
} else {
  console.warn("Name is not provided in the response. Ensure your backend returns it.");
}
      

      // Navigate based on the role
      if (response.data.role === "patient") {
        console.log("Navigating to patient home...");
        this.props.navigate("/patient-home");
      } else if (response.data.role === "doctor") {
        console.log("Navigating to doctor home...");
        this.props.navigate("/doctor-home");
      }
      else {
        throw new Error("Unexpected role received.");
      }
    } catch (error) {
      console.error("Error connecting to the backend:", error.message);
      this.setState({ error: "Login failed. Please try again." });
    }
  };

  /**
   * Redirects to patient registration page.
   */
  handleCreatePatientAccount = () => {
    this.props.navigate("/register-patient");
  };

  /**
   * Redirects to doctor registration page.
   */
  handleCreateDoctorAccount = () => {
    this.props.navigate("/register-doctor");
  };

  render() {
    const { user, error } = this.state;

    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
            padding: "2rem",
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
        >
          {/* Logo Section */}
          <Avatar alt="Logo" src={logo} sx={{ width: 100, height: 100, marginBottom: "1rem" }} />

          {/* Email Input */}
          <TextField
            label="Email ID"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            required
            value={user.email}
            onChange={(e) => this.handleInputChange("email", e.target.value)}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            required
            value={user.password}
            onChange={(e) => this.handleInputChange("password", e.target.value)}
          />

          {/* Role Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              value={user.role}
              onChange={(e) => this.handleInputChange("role", e.target.value)}
              label="Select Role"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>

          {/* Error Message */}
          {error && (
            <Typography color="error" variant="body2" align="center" gutterBottom>
              {error}
            </Typography>
          )}

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "1rem" }}
            onClick={this.handleLogin}
          >
            Log In
          </Button>

          {/* Registration Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1rem" }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: "48%" }}
              onClick={this.handleCreatePatientAccount}
            >
              Create Patient Account
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: "48%" }}
              onClick={this.handleCreateDoctorAccount}
            >
              Create Doctor Account
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

/**
 * Wrapper Component to use the `useNavigate` hook and pass it to LoginFormClass.
 */
const LoginFormWrapper = () => {
  const navigate = useNavigate();
  return <LoginFormClass navigate={navigate} />;
};

export default LoginFormWrapper;





