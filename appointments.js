const { collection, db,doc, setDoc, getDocs, deleteDoc, query, where } = require("firebase/firestore");


async function addAppointment(appointmentId, appointmentData) {
  await setDoc(doc(db, "appointments", appointmentId), appointmentData);
  console.log("Appointment added successfully!");
}

async function getAllAppointments() {
  const appointmentsSnapshot = await getDocs(collection(db, "appointments"));
  return appointmentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function deleteAppointment(appointmentId) {
  await deleteDoc(doc(db, "appointments", appointmentId));
  console.log("Appointment deleted successfully!");
}

// Get today's appointments for a specific doctor
async function getTodaysAppointments(doctorId) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const appointmentsQuery = query(
    collection(db, "appointments"),
    where("doctorId", "==", doctorId),
    where("appointmentDate", "==", today)
  );
  const appointmentsSnapshot = await getDocs(appointmentsQuery);
  return appointmentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Add a report for an appointment
async function addReportForAppointment(appointmentId, reportData) {
  const appointmentRef = doc(db, "appointments", appointmentId);
  await setDoc(doc(db, "patientReports", appointmentId), reportData);
  console.log("Report added successfully for appointment!");
}

module.exports = {
  addAppointment,
  getAllAppointments,
  deleteAppointment,
  getTodaysAppointments, // Added this function
  addReportForAppointment,
};
