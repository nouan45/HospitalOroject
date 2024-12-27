const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} = require("firebase/firestore");


const firebaseConfig = {
  apiKey: "AIzaSyCGRK3tHoC5BX2bDxxZwdGMX7CrIMeHCu8",
  authDomain: "hospital-managment-syste-6f09c.firebaseapp.com",
  projectId: "hospital-managment-syste-6f09c",
  storageBucket: "hospital-managment-syste-6f09c.firebasestorage.app",
  messagingSenderId: "361064353514",
  appId: "1:361064353514:web:2233646ee5dfe4fabfd193",
  measurementId: "G-CWR8TWZETS",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Export Firestore functions and db instance
module.exports = {
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query, // Added for Firestore querying
  where, // Added for Firestore filtering
};
