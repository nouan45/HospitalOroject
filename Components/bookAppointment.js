import React, { Component } from "react";
import axios from "axios"; // Import axios for API calls
import { TextField, Button, Typography, Container } from "@mui/material";

// BookAppointment Component - Class-based structure implementing OOP
class BookAppointment extends Component {
  constructor(props) {
    super(props); // Inheritance: Calling the parent class constructor

    // Encapsulation: Private state to hold appointment details
    this.state = {
      appointmentDetails: {
        patientName: "",
        appointmentDate: "",
        appointmentTime: "",
        doctor: "",
        reason: "",
        contactNumber: "",
        notes: "",
      },
      isLoading: false, // Loading state for API call
    };
  }

  // Polymorphism: Handle changes to form input fields
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      appointmentDetails: {
        ...prevState.appointmentDetails,
        [name]: value,
      },
    }));
  };

  // Encapsulation: Submitting the form and handling API request
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true }); // Update state to loading

    try {
      const { appointmentDetails } = this.state;
      const payload = {
        patientName: appointmentDetails.patientName,
        appointmentDate: appointmentDetails.appointmentDate,
        appointmentTime: appointmentDetails.appointmentTime,
        doctorName: appointmentDetails.doctor, 
        reason: appointmentDetails.reason,
        contactNumber: appointmentDetails.contactNumber,
        additionalNotes: appointmentDetails.notes, 
      };



      // API call to store appointment details
      const response = await axios.post(
        "http://localhost:3001/bookAppointment",
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set the content type
          },
          withCredentials: true, // Include credentials for cross-origin requests
        }
      );

      console.log("Appointment successfully booked:", response.data);
      alert("Appointment booked successfully!");

      // Reset form fields after successful submission
      this.setState({
        appointmentDetails: {
          patientName: "",
          appointmentDate: "",
          appointmentTime: "",
          doctor: "",
          reason: "",
          contactNumber: "",
          notes: "",
        },
      });
    } catch (error) {
      console.error(
        "Error booking appointment:",
        error.response?.data || error.message
      );
      alert("Failed to book appointment. Please try again.");
    } finally {
      this.setState({ isLoading: false }); // Reset loading state
    }
  };

  // Render method for UI
  render() {
    const { appointmentDetails, isLoading } = this.state; // Destructure state variables

    return (
      <Container sx={{ paddingTop: 4 }}>
        {/* Page Title */}
        <Typography variant="h4" gutterBottom>
          Book an Appointment
        </Typography>

        {/* Appointment Form */}
        <form onSubmit={this.handleSubmit}>
          {/* Patient Name */}
          <TextField
            label="Patient Name"
            variant="outlined"
            fullWidth
            name="patientName"
            value={appointmentDetails.patientName}
            onChange={this.handleInputChange}
            required
            margin="normal"
          />

          {/* Appointment Date */}
          <TextField
            label="Appointment Date"
            variant="outlined"
            type="date"
            fullWidth
            name="appointmentDate"
            value={appointmentDetails.appointmentDate}
            onChange={this.handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
            margin="normal"
          />

          {/* Appointment Time */}
          <TextField
            label="Appointment Time"
            variant="outlined"
            type="time"
            fullWidth
            name="appointmentTime"
            value={appointmentDetails.appointmentTime}
            onChange={this.handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
            margin="normal"
          />

          {/* Doctor's Name */}
          <TextField
            label="Doctor's Name"
            variant="outlined"
            fullWidth
            name="doctor"
            value={appointmentDetails.doctor}
            onChange={this.handleInputChange}
            required
            margin="normal"
          />

          {/* Reason for Appointment */}
          <TextField
            label="Reason for Appointment"
            variant="outlined"
            fullWidth
            name="reason"
            value={appointmentDetails.reason}
            onChange={this.handleInputChange}
            multiline
            rows={4}
            required
            margin="normal"
          />

          {/* Contact Number */}
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            name="contactNumber"
            value={appointmentDetails.contactNumber}
            onChange={this.handleInputChange}
            type="tel"
            required
            margin="normal"
          />

          {/* Additional Notes */}
          <TextField
            label="Additional Notes"
            variant="outlined"
            fullWidth
            name="notes"
            value={appointmentDetails.notes}
            onChange={this.handleInputChange}
            multiline
            rows={4}
            margin="normal"
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </Container>
    );
  }
}

export default BookAppointment;


