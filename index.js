const express = require("express");
const {
  addPatient,
  getAllPatients,
  deletePatient,
  getPatientByEmail,
  addPatientReport,
  getReportById,
} = require("./services/patients"); // Import patient-related functions
const {
  addDoctor,
  getAllDoctors,
  deleteDoctor,
  getDoctorByEmail,
  getReportsByDoctor,
} = require("./services/doctors"); // Import doctor-related functions
const {
  addAppointment,
  getAllAppointments,
  deleteAppointment,
  getTodaysAppointments,
} = require("./services/appointments"); // Import appointment-related functions
const bcrypt = require("bcryptjs");
const { db, setDoc, doc } = require("./firebase-config");

const app = express();
const port = 3001;

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = null;

    // Determine if the user is a patient or doctor
    if (role === "patient") user = await getPatientByEmail(email);
    if (role === "doctor") user = await getDoctorByEmail(email);

    // Validate credentials
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
});

// Patient Signup Endpoint
app.post("/signupPatient", async (req, res) => {
  const { name, email, password, age, gender, bloodType, allergies, diseases, height, weight, lastVisit } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    await addPatient(email, {
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      bloodType,
      allergies,
      diseases,
      height,
      weight,
      lastVisit,
    });

    res.status(201).json({ message: "Patient account created successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error creating patient: ${error.message}` });
  }
});

// Get Patient Profile
app.get("/getPatientProfile/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const patient = await getPatientByEmail(email);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching patient profile: ${error.message}` });
  }
});

// Update Patient Profile
app.patch("/updatePatientProfile/:email", async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;

  try {
    // Ensure patient exists
    const existingPatient = await getPatientByEmail(email);
    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Merge updated data into Firestore
    await setDoc(doc(db, "patients", email), updatedData, { merge: true });
    res.status(200).json({ message: "Patient profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error updating patient profile: ${error.message}` });
  }
});


// Doctor Signup Endpoint
app.post("/signupDoctor", async (req, res) => {
  const {
    name,
    email,
    password,
    age,
    gender,
    specialization,
    yearsExperience,
    licenseNumber,
    qualifications,
    hospitalAffiliation,
    shiftTiming,
    consultationFee,
    phoneNumber,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    await addDoctor(email, {
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      specialization,
      yearsExperience,
      licenseNumber,
      qualifications,
      hospitalAffiliation,
      shiftTiming,
      consultationFee,
      phoneNumber,
    });

    res.status(201).json({ message: "Doctor account created successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error creating doctor: ${error.message}` });
  }
});

// Update Doctor Profile Endpoint
app.patch("/updateDoctorProfile/:email", async (req, res) => {
  const { email } = req.params; // Get doctor's email from URL parameter
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Fetch the existing doctor data
    const existingDoctor = await getDoctorByEmail(email);
    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Merge the updated data into Firestore
    await setDoc(doc(db, "doctors", email), updatedData, { merge: true });

    res.status(200).json({ message: "Doctor profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error updating doctor profile: ${error.message}` });
  }
});


// Get Doctor Profile
app.get("/getDoctorProfile/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const doctor = await getDoctorByEmail(email);
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching doctor profile: ${error.message}` });
  }
});


// Store Health Data Endpoint
app.post("/storeHealthData", async (req, res) => {
  const { email, bloodPressure, sleep, temperature, heartRate } = req.body;

  try {
    // Validate required fields
    if (!email || !bloodPressure || !sleep || !temperature || !heartRate) {
      throw new Error("Missing required fields: email, bloodPressure, sleep, temperature, or heartRate");
    }

    // Calculate health percentage
    const healthPercentage = calculateHealthPercentage(bloodPressure, sleep, temperature, heartRate);

    // Save health data to Firestore
    await setDoc(
      doc(db, "patients", email), // Use `db` instance here
      {
        healthData: {
          bloodPressure,
          sleep,
          temperature,
          heartRate,
          healthPercentage,
        },
      },
      { merge: true }
    );

    res.status(200).json({ message: "Health data stored successfully", healthPercentage });
  } catch (error) {
    res.status(400).json({ message: `Error storing health data: ${error.message}` });
  }
});

// Helper function to calculate health percentage
function calculateHealthPercentage(bloodPressure, sleep, temperature, heartRate) {
  let healthScore = 0;

  if (bloodPressure < 120) healthScore += 25;
  if (sleep >= 7 && sleep <= 9) healthScore += 25;
  if (temperature >= 36.1 && temperature <= 37.2) healthScore += 25;
  if (heartRate >= 60 && heartRate <= 100) healthScore += 25;

  return healthScore;
}



// Book Appointment Endpoint
app.post("/bookAppointment", async (req, res) => {
  const { patientName, appointmentDate, appointmentTime, doctorName, reason, contactNumber, additionalNotes } = req.body;

  try {
    await addAppointment(`${doctorName}-${Date.now()}`, {
      patientName,
      appointmentDate,
      appointmentTime,
      doctorName,
      reason,
      contactNumber,
      additionalNotes,
    });

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error booking appointment: ${error.message}` });
  }
});

// Submit Patient Report Endpoint
app.post("/submitReport", async (req, res) => {
  const {
    doctorId,
    patientName,
    visitDate,
    reasonForVisit,
    bloodPressure,
    heartRate,
    temperature,
    respiratoryRate,
    currentSymptoms,
    startDateOfSymptoms,
    diagnosis,
    detailedNotes,
  } = req.body;

  try {
    const reportId = `${doctorId}-${Date.now()}`;
    await addPatientReport(reportId, {
      doctorId,
      patientName,
      visitDate,
      reasonForVisit,
      bloodPressure,
      heartRate,
      temperature,
      respiratoryRate,
      currentSymptoms,
      startDateOfSymptoms,
      diagnosis,
      detailedNotes,
    });

    res.status(201).json({ message: "Patient report submitted successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error submitting report: ${error.message}` });
  }
});

// Get Reports by Doctor Endpoint
app.get("/reportsByDoctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  try {
    const reports = await getReportsByDoctor(doctorId);
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ message: `Error fetching reports: ${error.message}` });
  }
});

// Get Today's Appointments for Doctor
app.get("/todaysAppointments/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await getTodaysAppointments(doctorId);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: `Error fetching appointments: ${error.message}` });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
