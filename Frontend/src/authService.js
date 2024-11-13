import { auth } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import axios from "axios";

// Register user
export const registerUser = async (email, password, firstName, lastName) => {
    try {
        // Register the user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send user data to the backend for Firestore entry
        await axios.post("https://act-production-5e24.up.railway.app/api/auth/register", {
            uid: user.uid,
            email,
            firstName,
            lastName,
            role: "manager"
        });

        console.log("User successfully registered");
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error;
    }
};

// Login user
export const loginUser = async (email, password) => {
    try {
        // Log in using Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get Firebase ID token and send it to the backend
        const idToken = await user.getIdToken();
        const response = await axios.post("https://your-backend-url.com/auth/login", {
            idToken,
        });

        console.log("Login successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error;
    }
};

// Logout user
export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User successfully logged out");
    } catch (error) {
        console.error("Error during logout:", error.message);
    }
};
