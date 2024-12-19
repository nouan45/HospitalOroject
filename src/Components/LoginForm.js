import React from "react";
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import logo from "./LOGO.png";
import Welcomephoto from "./WelcomePage2.png";

const LoginForm = () => {
  const navigate = useNavigate();  // Initialize navigate

  // Handler for Login Button
  const handleLogin = () => {
    // After successful login logic, navigate to Home page
    navigate("/home");
  };

  // Handler for Create Account Button
  const handleCreateAccount = () => {
    // Navigate to Register page
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        padding: "0", // Remove padding to allow the image to fully fill the container
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5", // Optional background color
      }}
    >
      {/* Left side with image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Prevent image overflow
        }}
      >
        <img
          src={Welcomephoto} // Replace this with your desired image source
          alt="Welcome"
          style={{
            width: "80%", // Make image fill the width of the container
            height: "80%", // Make image fill the height of the container
            objectFit: "cover", // Ensures the image covers the space without distortion
          }}
        />
      </Box>

      {/* Right side with the login form */}
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
          backgroundColor: "#ffffff", // Optional white box
        }}
      >
        {/* Logo */}
        <Avatar
          alt="Logo"
          src={logo}
          sx={{ width: 100, height: 100, marginBottom: "1rem" }} // Adjust size and spacing
        />

        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Welcome Back
        </Typography>

        {/* Email Input Field */}
        <TextField
          label="Email ID"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          required
        />

        {/* Password Input Field */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          required
        />

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={handleLogin}  // Trigger navigate to /home
        >
          Log In
        </Button>

        {/* Create Account Button */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={handleCreateAccount}  // Trigger navigate to /register
        >
          Create an Account
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
