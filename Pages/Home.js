import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import axios from "axios"; // Import axios for API calls
import logo from "./LOGO.png";

/**
 * OOP Principle: Encapsulation
 * Encapsulates all the behavior and state of the `Home` component within a class.
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generalHealth: 75, // Initial placeholder
      metrics: [
        { title: "Blood Pressure", value: "120", max: 120 },
        { title: "Sleep", value: "7.5", max: 8 },
        { title: "Heart Rate", value: "110", max: 80 },
        { title: "Temperature", value: "36.8", max: 37 },
      ],
      isLoading: false,
      error: "",
      success: "",
    };

    // Bind methods to ensure `this` context
    this.calculateGeneralHealth = this.calculateGeneralHealth.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreHealthData = this.handleStoreHealthData.bind(this);
  }

  /**
   * OOP Principle: Polymorphism
   * This lifecycle method overrides the base `Component`'s `componentDidMount` method.
   */
  componentDidMount() {
    this.calculateGeneralHealth();
  }

  /**
   * Calculate general health percentage based on metrics.
   * Encapsulated logic ensures a single source of truth.
   */
  calculateGeneralHealth() {
    const { metrics } = this.state;
    const totalHealth = metrics.reduce((acc, metric) => {
      const metricValue = parseFloat(metric.value);
      const metricMax = metric.max;

      if (metricMax) {
        return acc + (Math.min(metricValue, metricMax) / metricMax) * 100;
      }
      return acc;
    }, 0);

    const averageHealth = totalHealth / metrics.length;

    this.setState({ generalHealth: averageHealth });
  }

  /**
   * Handles input changes in the metrics array.
   * OOP Principle: Abstraction
   * This abstracts the behavior of updating the state from UI interactions.
   */
  handleInputChange(index, value) {
    const newMetrics = [...this.state.metrics];
    newMetrics[index].value = value;
    this.setState({ metrics: newMetrics }, this.calculateGeneralHealth);
  }

  /**
   * Handles storing health data via API call.
   * Demonstrates encapsulation by keeping API logic within the class.
   */
  async handleStoreHealthData() {
    const { metrics } = this.state;
  
    // Extract individual health metrics
    const bloodPressure = parseFloat(metrics.find((metric) => metric.title === "Blood Pressure").value);
    const sleep = parseFloat(metrics.find((metric) => metric.title === "Sleep").value);
    const heartRate = parseFloat(metrics.find((metric) => metric.title === "Heart Rate").value);
    const temperature = parseFloat(metrics.find((metric) => metric.title === "Temperature").value);
  
    const healthData = {
      bloodPressure,
      sleep,
      temperature,
      heartRate,
    };
  
    this.setState({ isLoading: true, error: "", success: "" });

    try {
      console.log("Sending payload to backend:", healthData);

      const response = await axios.post(
        "http://localhost:3001/storeHealthData",
        healthData,
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set content type
          },
          withCredentials: true, // Include credentials 
        }
      );

      this.setState({ success: "Health data stored successfully!" });
      console.log("API Response:", response.data);
    } catch (err) {
      console.error("Error storing health data:", err.response?.data || err.message);
      this.setState({ error: "Failed to store health data. Please try again." });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { generalHealth, metrics, isLoading, error, success } = this.state;

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Box component="img" src={logo} alt="Logo" sx={{ height: 40, marginRight: 2 }} />
              <Typography variant="h6">Medical Care</Typography>
            </Box>
            <Box display="flex" sx={{ flexGrow: 1, justifyContent: "flex-end" }}>
              <Button color="inherit" onClick={() => this.props.navigate("/profile-patient")}>
                My Account
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Toolbar /> {/* Placeholder for AppBar height */}

        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Good Morning,
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            let's do a quick check up!
          </Typography>

          {/* General Health Section */}
          <Box sx={{ marginBottom: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">General Health</Typography>
                <LinearProgress variant="determinate" value={generalHealth} />
                <Typography variant="body1">
                  {Math.round(generalHealth)}% - Adjusted based on metrics
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Additional Health Metrics Section */}
          <Box display="flex" flexWrap="wrap" gap={3}>
            {metrics.map((metric, index) => (
              <Box key={index} sx={{ width: "calc(50% - 16px)" }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{metric.title}</Typography>
                    <TextField
                      value={metric.value}
                      onChange={(e) => this.handleInputChange(index, e.target.value)}
                      label="Value"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Store Health Data Button */}
          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.handleStoreHealthData}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Health Data"}
            </Button>
            {error && (
              <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success.main" variant="body2" sx={{ marginTop: 1 }}>
                {success}
              </Typography>
            )}
          </Box>

          {/* Appointment Section */}
          <Box sx={{ marginTop: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Appointment Section
                </Typography>
                <Box display="flex" justifyContent="center">
                  <Button variant="contained" onClick={() => this.props.navigate("/book-appointment")}>
                    Book an Appointment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </div>
    );
  }
}

/**
 * HOC to inject `navigate` prop for routing in class component.
 * OOP Principle: Composition
 * Combines the class component with `useNavigate`.
 */
export default function HomeWithNavigate() {
  const navigate = useNavigate();
  return <Home navigate={navigate} />;
}


