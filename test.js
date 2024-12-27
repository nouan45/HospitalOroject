// Example: Adding a patient
addPatient("patientId1", {
    name: "John Doe",
    age: 45,
    gender: "Male",
    email:"john@yahoo.com",
    password:"john1999"
  });
  
  // Example: Fetching all patients
  getAllPatients().then(patients => {
    console.log("Patients:", patients);
  });
  
  // Example: Adding a doctor
  addDoctor("doctorId1", {
    name: "Dr. Alice Smith",
    specialty: "Cardiology"
  });
  
  // Example: Fetching all doctors
  getAllDoctors().then(doctors => {
    console.log("Doctors:", doctors);
  });
  
  // Example: Adding an appointment
  addAppointment("appointmentId1", {
    patientId: "patientId1",
    doctorId: "doctorId1",
    date: "2024-12-20",
    time: "10:00 AM"
  });
  
  // Example: Fetching all appointments
  getAllAppointments().then(appointments => {
    console.log("Appointments:", appointments);
  });
  // test.js
console.log("Hello, world!");


const { addPatientReport, getReportsByDoctor, getReportById } = require("./doctors");

// Add a test patient report
addPatientReport("report1", {
  doctorId: "doctorId1",
  patientId: "patientId1",
  visitDate: "2024-12-26",
  reasonForVisit: "General Checkup",
  bloodPressure: "120/80",
  heartRate: 72,
  temperature: 98.6,
  respiratoryRate: 16,
  currentSymptoms: "Cough, Fever",
  startDateSymptoms: "2024-12-20",
  diagnosis: "Flu",
  detailedDiagnosisNote: "Patient has symptoms consistent with the flu."
});

// Fetch all reports for a specific doctor
getReportsByDoctor("doctorId1").then(reports => {
  console.log("Reports for Doctor:", reports);
});

// Fetch a specific report by its ID
getReportById("report1").then(report => {
  console.log("Specific Report:", report);
});
