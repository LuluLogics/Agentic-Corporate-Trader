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

            // Update the user's display name in Firebase
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            });

            // Call the API to save user details in Firestore
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    firstName,
                    lastName,
                    role: "manager", 
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save user data in Firestore");
            }

            // Save user details in local storage
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            }));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: user });
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
