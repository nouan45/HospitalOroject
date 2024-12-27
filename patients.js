const { collection,db, doc, setDoc, getDocs, getDoc, deleteDoc } = require("../firebase-config"); // Import Firestore utilities
 // Import Firestore configuration

// Add a new patient
async function addPatient(patientId, patientData) {
  if (!patientId || !patientData) {
    throw new Error("Missing required parameters: patientId or patientData");
  }
  await setDoc(doc(db, "patients", patientId), patientData);
  console.log("Patient added successfully!");
}

// Fetch a patient by email
async function getPatientByEmail(email) {
  if (!email) {
    throw new Error("Email is required to fetch patient");
  }
  const patientRef = doc(db, "patients", email);
  const patientDoc = await getDoc(patientRef);
  if (patientDoc.exists()) {
    return patientDoc.data();
  } else {
    return null; // No patient found
  }
}

// Fetch all patients
async function getAllPatients() {
  const patientsSnapshot = await getDocs(collection(db, "patients"));
  return patientsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Delete a patient by ID
async function deletePatient(patientId) {
  if (!patientId) {
    throw new Error("Patient ID is required to delete a patient");
  }
  await deleteDoc(doc(db, "patients", patientId));
  console.log("Patient deleted successfully!");
}

// Add a new patient report
async function addPatientReport(reportId, reportData) {
  if (!reportId || !reportData) {
    throw new Error("Missing required parameters: reportId or reportData");
  }
  // Validate required fields for the patient report
  const requiredFields = ["visitDate", "reasonForVisit", "bloodPressure"];
  const missingFields = requiredFields.filter((field) => !reportData[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields in the patient report: ${missingFields.join(", ")}`);
  }

  await setDoc(doc(db, "patientReports", reportId), reportData);
  console.log("Patient report added successfully!");
}

// Fetch a specific report by ID
async function getReportById(reportId) {
  if (!reportId) {
    throw new Error("Report ID is required to fetch the report");
  }
  const reportRef = doc(db, "patientReports", reportId);
  const reportDoc = await getDoc(reportRef);
  if (reportDoc.exists()) {
    return reportDoc.data();
  } else {
    return null; // No report found
  }
}

// Export the functions
module.exports = {
  addPatient,
  getAllPatients,
  deletePatient,
  getPatientByEmail,
  addPatientReport,
  getReportById,
};
