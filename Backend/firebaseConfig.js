// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB1byHvWHVkYQ7b8ISDttTU2MQSOwLNyyE",
//   authDomain: "act-database-508c1.firebaseapp.com",
//   projectId: "act-database-508c1",
//   storageBucket: "act-database-508c1.appspot.com",
//   messagingSenderId: "812027974595",
//   appId: "1:812027974595:web:40ff0a0b3511e9d2dc2376",
//   measurementId: "G-W3VC69LGZM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

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

// Export the Firestore database instance
export { db };
