import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import logo from "./LOGO.png";

// Wrapper component for navigation
class NavigationWrapper {
  constructor(navigate) {
    this.navigate = navigate;
  }

  navigateTo(route) {
    this.navigate(route);
  }
}

// Service class for API calls
// Service class for API calls
class ApiService {
  static axiosConfig = {
    withCredentials: true, // Include credentials (cookies, etc.)
    headers: {
      'Content-Type': 'application/json', // Set default content type
    },
  };

  static async fetchAppointments(doctorName) {
    try {
      const response = await axios.get(
        `http://localhost:3001/getTodaysAppointment/${doctorName}`, // Correct endpoint
        ApiService.axiosConfig
      );
      console.log("Fetched appointments response:", response.data);
      // If the response contains a `message` key, return an empty array
    if (response.data.message) {
      console.warn(response.data.message);
      return []; // No appointments
    }
      return response.data.map((appointment) => ({
        time: appointment.appointmentTime,
        patientName: appointment.patientName,
        reason: appointment.reason,
        date: appointment.appointmentDate,
      }));
    } catch (err) {
      console.error('Error fetching appointments:', err);
      throw new Error('Failed to load appointments');
    }
  }


  static async fetchPatientHistoriesByName(patientName) {
    try {
      const response = await axios.get(
        `http://localhost:3001/reportsByDoctor/${encodeURIComponent(patientName)}`,
        ApiService.axiosConfig // Include credentials and headers
      );
      return response.data;
    } catch (err) {
      console.error('Error fetching patient histories by name:', err);
      throw new Error('Failed to load patient histories');
    }
  }

  static async savePatientReport(report) {
    try {
      await axios.post(
        'http://localhost:3001/submitReport',
        report,
        ApiService.axiosConfig
      );
    } catch (err) {
      console.error('Error saving patient report:', err);
      throw new Error('Failed to save patient report');
    }
  }
}


// Base component class
class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null
    };
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  setError(error) {
    this.setState({ error });
  }
}

// Main Home2 component
class Home2 extends BaseComponent {
  constructor(props) {
    super(props);
    this.navigationWrapper = new NavigationWrapper(props.navigate);
    this.state = {
      ...this.state,
      appointments: [],
      appointmentsError: null,
      patientHistories: [],
      filteredHistories: [],
      searchQuery: "",
      openDialog: false,
      selectedHistory: null,
      patientReport: this.initializePatientReport(),
    };
  }

  componentDidMount() {
    // Load appointments independently
    this.loadAppointments();
  
    // Load patient histories only when searchQuery exists
    if (this.state.searchQuery.trim()) {
      this.loadPatientHistories();
    }
  }
  
  initializePatientReport() {
    return {
      patientName: '',
      visitDate: '',
      reasonForVisit: '',
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      symptomsDescription: '',
      symptomsStartDate: '',
      severityLevel: '',
      diagnosis: '',
      diagnosisNotes: '',
      prescribedMedications: '',
      dosageInstructions: '',
      treatmentPlan: '',
      testsOrdered: '',
      labResults: '',
      followUpDate: '',
      followUpInstructions: '',
      doctorNotes: '',
      recommendations: '',
      treatingDoctor: '',
      department: ''
    };
  }

  async loadAppointments() {
    try {
      this.setState({ appointmentsLoading: true, error: null }); // Clear previous error and set loading
      const doctorName = localStorage.getItem("doctorName") || "defaultDoctorName";
      console.log("Retrieved doctorName:", doctorName);
  
      if (!doctorName || doctorName === "defaultDoctorName") {
        this.setState({ error: "Doctor name not found. Please log in again.", appointments: [] });
        return;
      }
  
      const appointments = await ApiService.fetchAppointments(doctorName);
      this.setState({ appointments, error: null }); // Clear error on success
    } catch (error) {
      console.error("Error loading appointments:", error.message);
      this.setState({ error: "Error loading appointments.", appointments: [] });
    } finally {
      this.setState({ appointmentsLoading: false }); // Stop loading
    }
  }
  
  

  async loadPatientHistories() {
    try {
      this.setState({ historiesLoading: true, error: null }); // Clear previous error and set loading
      const { searchQuery } = this.state; // Use searchQuery from state
  
      if (!searchQuery.trim()) {
        this.setState({ error: "Patient name is required to fetch histories.", patientHistories: [] });
        return;
      }
  
      const patientHistories = await ApiService.fetchPatientHistoriesByName(searchQuery);
      this.setState({
        patientHistories,
        filteredHistories: patientHistories,
        error: null, // Clear error on success
      });
    } catch (error) {
      console.error("Error loading patient histories:", error.message);
      this.setState({ error: "Error loading patient histories.", patientHistories: [] });
    } finally {
      this.setState({ historiesLoading: false }); // Stop loading
    }
  }
  

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      patientReport: {
        ...prevState.patientReport,
        [name]: value
      }
    }));
  };

  handleSaveReport = async () => {
    try {
      const { patientReport } = this.state;
  
      // Map the fields to match the backend API requirements
      const reportPayload = {
        patientName: patientReport.patientName,
        visitDate: patientReport.visitDate,
        reasonForVisit: patientReport.reasonForVisit,
        bloodPressure: patientReport.bloodPressure,
        heartRate: patientReport.heartRate,
        temperature: patientReport.temperature,
        respiratoryRate: patientReport.respiratoryRate,
        currentSymptoms: patientReport.symptomsDescription,
        startDateOfSymptoms: patientReport.symptomsStartDate,
        severityLevel: patientReport.severityLevel,
        diagnosis: patientReport.diagnosis,
        detailedDiagnosisNotes: patientReport.diagnosisNotes,
        prescribedMedications: patientReport.prescribedMedications,
        dosageInstructions: patientReport.dosageInstructions,
        treatmentPlan: patientReport.treatmentPlan,
        testsOrdered: patientReport.testsOrdered,
        labResults: patientReport.labResults,
        followUpRequired: false,
        followUpDate: patientReport.followUpDate,
        followUpInstructions: patientReport.followUpInstructions,
        doctorsNotes: patientReport.doctorNotes,
        recommendations: patientReport.recommendations,
      };
      
  
      // Make the API call with the corrected payload
      await ApiService.savePatientReport(reportPayload);
      this.setState({ patientReport: this.initializePatientReport() });

      this.loadPatientHistories();
      alert('Patient report saved successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  handleAccountClick = () => {
    this.navigationWrapper.navigateTo('/doctor-profile');
  };
  handleSearchButtonClick = async () => {
    try {
      this.setLoading(true);
      const { searchQuery } = this.state;
  
      if (!searchQuery.trim()) {
        alert("Please enter a patient's name to search.");
        return;
      }
  
      const patientHistories = await ApiService.fetchPatientHistoriesByName(searchQuery);
      this.setState({
        filteredHistories: patientHistories,
      });
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setLoading(false);
    }
  };
  




  handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    this.setState({ searchQuery }, () => {
      const { patientHistories } = this.state;
      const filteredHistories = searchQuery
        ? patientHistories.filter(history =>
            history.patientName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : patientHistories;
      this.setState({ filteredHistories });
    });
  };

  handleViewDetails = (history) => {
    this.setState({
      selectedHistory: history,
      openDialog: true
    });
  };

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }

  render() {
    const {
      appointments,
      patientHistories,
      filteredHistories,
      searchQuery,
      openDialog,
      selectedHistory,
      patientReport,
      loading,
      error
    } = this.state;

    return (
      <Box>
        {/* AppBar */}
        <AppBar position="fixed">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Box component="img" src={logo} alt="Logo" sx={{ height: 40, marginRight: 2 }} />
              <Typography variant="h6">Medical Care</Typography>
            </Box>
            <Button
              color="inherit"
              onClick={this.handleAccountClick}
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              My Account
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ padding: 4, marginTop: 10 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 4 }}>
            Welcome, Doctor
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Appointments Card */}
            <Card>
            <CardContent>
  <Typography variant="h5" gutterBottom>
    Appointments
  </Typography>
  {loading ? (
    <Box display="flex" justifyContent="center" padding={3}>
      <CircularProgress />
    </Box>
  ) : error ? (
    <Typography color="error">{error}</Typography>
  ) : appointments.length ? (
    <List>
      {appointments.map((appointment, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${appointment.time} - ${appointment.patientName}`}
            secondary={
              <>
                <Typography component="span" display="block" color="textSecondary">
                  Date: {this.formatDate(appointment.date)}
                </Typography>
                <Typography component="span" display="block" color="textSecondary">
                  Reason: {appointment.reason}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  ) : (
    <Box textAlign="center" padding={3}>
      <Typography variant="body1" color="textSecondary">
        No appointments scheduled for today. Please check back later or contact support.
      </Typography>
    </Box>
  )}
</CardContent>
            </Card>

            {/* Patient History */}
            <Card>
  <CardContent>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Typography variant="h5" gutterBottom>
        Patient History
      </Typography>
      <Box display="flex" gap={2}>
        <TextField
          label="Search Patient"
          variant="outlined"
          size="small"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange} // Already defined in your code
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSearchButtonClick} // Triggers the API call
        >
          Search
        </Button>
      </Box>
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Visit Date</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Diagnosis</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.filteredHistories.length ? (
            this.state.filteredHistories.map((history, index) => (
              <TableRow key={index}>
                <TableCell>{this.formatDate(history.visitDate)}</TableCell>
                <TableCell>{history.patientName}</TableCell>
                <TableCell>{history.diagnosis}</TableCell>
                <TableCell>{history.doctor}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => this.handleViewDetails(history)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No patient histories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </CardContent>
</Card>

            {/* Patient Report Form */}
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                   Patient's Report
                </Typography>
                
                <Box component="form" display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Patient Name"
                    name="patientName"
                    value={patientReport.patientName}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <Typography variant="h6">Visit Information</Typography>
                  <TextField
                    label="Visit Date"
                    name="visitDate"
                    type="date"
                    value={patientReport.visitDate}
                    onChange={this.handleInputChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Reason for Visit"
                    name="reasonForVisit"
                    value={patientReport.reasonForVisit}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <Typography variant="h6">Vital Signs</Typography>
                  <TextField
                    label="Blood Pressure"
                    name="bloodPressure"
                    value={patientReport.bloodPressure}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Heart Rate"
                    name="heartRate"
                    value={patientReport.heartRate}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Temperature"
                    name="temperature"
                    value={patientReport.temperature}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Respiratory Rate"
                    name="respiratoryRate"
                    value={patientReport.respiratoryRate}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <Typography variant="h6">Current Symptoms</Typography>
                  <TextField
                    label="Symptoms Description"
                    name="symptomsDescription"
                    value={patientReport.symptomsDescription}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Symptoms Start Date"
                    name="symptomsStartDate"
                    type="date"
                    value={patientReport.symptomsStartDate}
                    onChange={this.handleInputChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Severity Level"
                    name="severityLevel"
                    value={patientReport.severityLevel}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <Typography variant="h6">Diagnosis & Treatment</Typography>
                  <TextField
                    label="Diagnosis"
                    name="diagnosis"
                    value={patientReport.diagnosis}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Diagnosis Notes"
                    name="diagnosisNotes"
                    value={patientReport.diagnosisNotes}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Prescribed Medications"
                    name="prescribedMedications"
                    value={patientReport.prescribedMedications}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Dosage Instructions"
                    name="dosageInstructions"
                    value={patientReport.dosageInstructions}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Treatment Plan"
                    name="treatmentPlan"
                    value={patientReport.treatmentPlan}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <Typography variant="h6">Lab Tests</Typography>
                  <TextField
                    label="Tests Ordered"
                    name="testsOrdered"
                    value={patientReport.testsOrdered}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Lab Results"
                    name="labResults"
                    value={patientReport.labResults}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <Typography variant="h6">Follow-up</Typography>
                  <TextField
                    label="Follow-up Date"
                    name="followUpDate"
                    type="date"
                    value={patientReport.followUpDate}
                    onChange={this.handleInputChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Follow-up Instructions"
                    name="followUpInstructions"
                    value={patientReport.followUpInstructions}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <Typography variant="h6">Additional Notes</Typography>
                  <TextField
                    label="Doctor Notes"
                    name="doctorNotes"
                    value={patientReport.doctorNotes}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Recommendations"
                    name="recommendations"
                    value={patientReport.recommendations}
                    onChange={this.handleInputChange}
                    fullWidth
                  />
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSaveReport}
                  >
                    Save Report
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Dialog for Viewing Patient History Details */}
        <Dialog
          open={openDialog}
          onClose={() => this.setState({ openDialog: false })}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Patient History Details</DialogTitle>
          <DialogContent>
            {selectedHistory ? (
              <Box>
                <Typography><strong>Patient Name:</strong> {selectedHistory.patientName}</Typography>
                <Typography><strong>Visit Date:</strong> {this.formatDate(selectedHistory.visitDate)}</Typography>
                <Typography><strong>Diagnosis:</strong> {selectedHistory.diagnosis}</Typography>
                
              </Box>
            ) : (
              <Typography>No details available.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ openDialog: false })} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

// Wrapper Component to use Hooks
const Home2Wrapper = () => {
  const navigate = useNavigate();
  return <Home2 navigate={navigate} />;
};

export default Home2Wrapper;











