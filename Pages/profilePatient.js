import React, { Component } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  TextField,
  Grid,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Represents the Patient Profile page component.
 * It encapsulates all the functionalities related to viewing and editing the patient's profile.
 */
class ProfilePatient extends Component {
  constructor(props) {
    super(props);

    // State encapsulates the data and behavior of the component.
    this.state = {
      patientData: null, // Holds the patient's profile data.
      isEditing: false, // Tracks whether the profile is in editing mode.
      profilePhoto: null // Stores the uploaded profile photo.
    };
  }

  /**
   * Lifecycle method to fetch patient data when the component mounts.
   */
  componentDidMount() {
    this.fetchPatientData();
  }

  /**
   * Fetches the patient profile data from the API.
   */
  fetchPatientData = async () => {
    try {
      const email = localStorage.getItem("email"); // Fetch email from localStorage
    if (!email) {
      throw new Error("User email not found in localStorage");
    }
      const response = await axios.get(`http://localhost:3001/getPatientProfile/${email}`, {
        withCredentials: true,
      });
      this.setState({ patientData: response.data });
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("You are not logged in. Redirecting to login...");
      this.props.navigate("/login"); // Redirect to login if email is missing
    }
  };

  /**
   * Handles navigation back to the patient home page.
   */
  handleBack = () => {
    this.props.navigate('/patient-home');
  };

  /**
   * Handles logout and redirects to the login page.
   */
  handleLogout = () => {
    this.props.navigate('/login');
  };

  /**
   * Enables editing mode.
   */
  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  /**
   * Saves the edited profile data to the server.
   */
  handleSave = async () => {
    try {
      const { patientData } = this.state;
      const email = localStorage.getItem("email");
      if (!email) {
        throw new Error("User email not found in localStorage");
      }
      await axios.patch(`http://localhost:3001/updatePatientProfile/${email}`, patientData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      alert("Profile saved successfully!");
      this.setState({ isEditing: false });
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile.');
    }
  };

  /**
   * Handles input field changes and updates the patient data state.
   * @param {Object} e - Event object for input change.
   */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      patientData: {
        ...prevState.patientData,
        [name]: value
      }
    }));
  };

  /**
   * Handles uploading a profile photo and sets it in the state.
   * @param {Object} event - Event object for file upload.
   */
  handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.setState({ profilePhoto: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  /**
   * Renders the component.
   */
  render() {
    const { patientData, isEditing, profilePhoto } = this.state;
    const { navigate } = this.props;

    if (!patientData) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography>Loading your profile...</Typography>
        </Box>
      );
    }

    return (
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6">Patient Profile</Typography>
            <Button color="inherit" onClick={() => navigate('/login')} sx={{ marginLeft: 'auto' }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: 4, marginTop: 10 }}>
          <Typography variant="h4" gutterBottom align="center">
            Patient Profile
          </Typography>
          <Card sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
                <Box textAlign="center">
                  <Avatar
                    src={profilePhoto || '/default-avatar.png'}
                    alt="Profile Photo"
                    sx={{ width: 120, height: 120, marginBottom: 2 }}
                  />
                  {isEditing && (
                    <Button variant="contained" component="label">
                      Upload Photo
                      <input type="file" hidden accept="image/*" onChange={this.handlePhotoUpload} />
                    </Button>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <CardContent>
                  <Typography variant="h6">Personal Information</Typography>
                  {Object.entries(patientData).map(([key, value]) => (
                    <Box key={key} sx={{ mb: 1 }}>
                      <Typography sx={{ textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          name={key}
                          value={value}
                          onChange={this.handleInputChange}
                          size="small"
                        />
                      ) : (
                        <Typography>{value}</Typography>
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              {isEditing ? (
                <>
                  <Button variant="contained" color="success" onClick={this.handleSave}>
                    Save
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => this.setState({ isEditing: false })}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={this.handleEdit}>
                  Edit Profile
                </Button>
              )}
            </Box>
          </Card>
        </Box>
      </Box>
    );
  }
}

/**
 * Wrapper component to use navigation in the class-based component.
 */
const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigation(ProfilePatient);



