import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Firebase Auth

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            // Register the user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Firebase profile for display name
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            });

            // Save user details to the backend API
            const response = await fetch("https://act-production-5e24.up.railway.app/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    firstName,
                    lastName,
                    role: "user", // Optional: Define roles here
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to save user data in Firestore");
            }

            // Update AuthContext
            dispatch({ type: "LOGIN", payload: user });

            localStorage.setItem("user", JSON.stringify(user));

            setIsLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            return false;
        }
    };

    return { signup, error, isLoading };
};
