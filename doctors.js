const { db,collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where } = require("../firebase-config");

// Add a new doctor
async function addDoctor(doctorId, doctorData) {
  if (!doctorId || !doctorData) {
    throw new Error("Missing required parameters: doctorId or doctorData");
  }
  await setDoc(doc(db, "doctors", doctorId), doctorData);
  console.log("Doctor added successfully!");
}

// Fetch a doctor by email
async function getDoctorByEmail(email) {
  if (!email) {
    throw new Error("Email is required to fetch a doctor");
  }
  const doctorRef = doc(db, "doctors", email);
  const doctorDoc = await getDoc(doctorRef);
  if (doctorDoc.exists()) {
    return doctorDoc.data();
  } else {
    return null; // No doctor found
  }
}

// Fetch all doctors
async function getAllDoctors() {
  const doctorsSnapshot = await getDocs(collection(db, "doctors"));
  return doctorsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Delete a doctor by ID
async function deleteDoctor(doctorId) {
  if (!doctorId) {
    throw new Error("Doctor ID is required to delete a doctor");
  }
  await deleteDoc(doc(db, "doctors", doctorId));
  console.log("Doctor deleted successfully!");
}

// Fetch all patient reports submitted by a specific doctor
async function getReportsByDoctor(doctorId) {
  if (!doctorId) {
    throw new Error("Doctor ID is required to fetch reports");
  }

  // Use Firestore query for efficient filtering
  const reportsQuery = query(
    collection(db, "patientReports"),
    where("doctorId", "==", doctorId)
  );

  const reportsSnapshot = await getDocs(reportsQuery);

  return reportsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Fetch today's appointments for the logged-in doctor
async function getTodaysAppointments(doctorId) {
  if (!doctorId) {
    throw new Error("Doctor ID is required to fetch today's appointments");
  }

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const appointmentsQuery = query(
    collection(db, "appointments"),
    where("doctorId", "==", doctorId),
    where("appointmentDate", "==", today)
  );

  const appointmentsSnapshot = await getDocs(appointmentsQuery);

  return appointmentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Export the functions
module.exports = {
  addDoctor,
  deleteDoctor,
  getDoctorByEmail,
  getAllDoctors,
  getReportsByDoctor,
  getTodaysAppointments,
};

