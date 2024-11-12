// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1byHvWHVkYQ7b8ISDttTU2MQSOwLNyyE",
  authDomain: "act-database-508c1.firebaseapp.com",
  projectId: "act-database-508c1",
  storageBucket: "act-database-508c1.appspot.com",
  messagingSenderId: "812027974595",
  appId: "1:812027974595:web:40ff0a0b3511e9d2dc2376",
  measurementId: "G-W3VC69LGZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

// Export Firestore and Auth instances
export { db, auth };
