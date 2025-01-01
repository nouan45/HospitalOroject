import React from "react";  
import {  
  Box,  
  TextField,  
  Button,  
  Typography,  
  Select,  
  MenuItem,  
  InputLabel,  
  FormControl,  
} from "@mui/material";  
import { useNavigate } from "react-router-dom";  
import axios from "axios";  

/**  
 * Encapsulation: A class to manage state and data for patient registration.  
 */  
class Patient {  
  constructor() {  
    this.fullName = "";  
    this.email = "";  
    this.password = "";  
    this.age = "";  
    this.gender = "";  
    this.bloodType = "";  
    this.allergies = "";  
    this.diseases = "";  
    this.height = "";  
    this.weight = "";  
    this.lastVisit = "";  
  }  

  // Method to set field values dynamically (Encapsulation and Polymorphism).  
  setField(fieldName, value) {  
    this[fieldName] = value;  
  }  

  // Method to retrieve patient data as an object (Abstraction).  
  toObject() {  
    return {  
      name: this.fullName,  
      email: this.email,  
      password: this.password,  
      age: this.age,  
      gender: this.gender,  
      bloodType: this.bloodType,  
      allergies: this.allergies,  
      diseases: this.diseases,  
      height: this.height,  
      weight: this.weight,  
      lastVisit: this.lastVisit,  
    };  
  }  
}  

/**  
 * Main component class that handles rendering and interaction.  
 * Inheritance: React.Component is extended to create this class-based component.  
 */  
class Register extends React.Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      patient: new Patient(), // Composition: The Patient class is used here to manage patient-specific state.  
      error: "", // Encapsulation: Tracks form errors.  
    };  
  }  

  /**  
   * Polymorphism: A generic handler to update any field in the patient object.  
   */  
  handleInputChange = (fieldName, value) => {  
    const { patient } = this.state;  
    patient.setField(fieldName, value);  
    this.setState({ patient });  
  };  

  /**  
   * Abstraction: Handles form submission and API calls.  
   */  
  handleSignUp = async () => {  
    const { patient } = this.state;  

    try {
        console.log("Sending payload to backend:", JSON.stringify(patient.toObject(), null, 2)); // Debugging
  
        const response = await axios.post(
          "http://localhost:3001/signupPatient",
          patient.toObject(),
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content type
            },
            withCredentials: true, // Ensure cookies/credentials are included in the request
          }
        );
      console.log("Registration successful:", response.data);  
      this.props.navigate("/patient-home"); // Use navigate prop passed from wrapper  
    } catch (err) {  
      console.error("Error during registration:", err.response?.data || err.message);  
      this.setState({ error: "Failed to register. Please try again." });  
    }  
  };  

  render() {  
    const { patient, error } = this.state;  

    return (  
      <Box  
        sx={{  
          minHeight: "100vh",  
          width: "100vw",  
          display: "flex",  
          justifyContent: "center",  
          alignItems: "center",  
          backgroundImage: "url(/background.jpg)",  
          backgroundSize: "cover",  
          backgroundPosition: "center",  
          backgroundRepeat: "no-repeat",  
          padding: "2rem",  
        }}  
      >  
        <Box  
          sx={{  
            width: "100%",  
            maxWidth: 600,  
            bgcolor: "white",  
            padding: "2rem",  
            borderRadius: 2,  
            boxShadow: 3,  
            overflowY: "auto",  
            maxHeight: "90vh",  
          }}  
        >  
          <Typography variant="h5" align="center" gutterBottom>  
            Patient Registration  
          </Typography>  

          {error && (  
            <Typography color="error" variant="body2" align="center" gutterBottom>  
              {error}  
            </Typography>  
          )}  

          {/* Dynamic rendering of fields using reusable logic */}  
          {["fullName", "email", "password", "age", "allergies", "diseases", "height", "weight"].map(  
            (field) => (  
              <TextField  
                key={field}  
                required={field !== "allergies" && field !== "diseases"}  
                label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}  
                value={patient[field]}  
                onChange={(e) => this.handleInputChange(field, e.target.value)}  
                variant="outlined"  
                type={field === "password" ? "password" : "text"}  
                fullWidth  
                margin="normal"  
              />  
            )  
          )}  

          {/* Gender Select */}  
          <FormControl fullWidth margin="normal">  
            <InputLabel id="gender-label">Gender</InputLabel>  
            <Select  
              labelId="gender-label"  
              value={patient.gender}  
              onChange={(e) => this.handleInputChange("gender", e.target.value)}  
              label="Gender"  
            >  
              <MenuItem value="Male">Male</MenuItem>  
              <MenuItem value="Female">Female</MenuItem>  
            </Select>  
          </FormControl>  

          {/* Blood Type Select */}  
          <FormControl fullWidth margin="normal">  
            <InputLabel id="blood-type-label">Blood Type</InputLabel>  
            <Select  
              labelId="blood-type-label"  
              value={patient.bloodType}  
              onChange={(e) => this.handleInputChange("bloodType", e.target.value)}  
              label="Blood Type"  
            >  
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (  
                <MenuItem key={type} value={type}>  
                  {type}  
                </MenuItem>  
              ))}  
            </Select>  
          </FormControl>  

          {/* Last Visit Input */}  
          <TextField  
            label="Last Visit"  
            value={patient.lastVisit}  
            onChange={(e) => this.handleInputChange("lastVisit", e.target.value)}  
            variant="outlined"  
            type="date"  
            fullWidth  
            margin="normal"  
            InputLabelProps={{  
              shrink: true,  
            }}  
          />  

          {/* Sign Up Button */}  
          <Button  
            variant="contained"  
            color="primary"  
            fullWidth  
            sx={{ marginTop: "1rem" }}  
            onClick={this.handleSignUp}  
          >  
            Sign Up  
          </Button>  
        </Box>  
      </Box>  
    );  
  }  
}  

/**  
 * Wrapper functional component to provide necessary hooks.  
 */  
const RegisterWrapper = () => {  
  const navigate = useNavigate(); // Use the navigate hook here  
  return <Register navigate={navigate} />;  
};  

export default RegisterWrapper;


