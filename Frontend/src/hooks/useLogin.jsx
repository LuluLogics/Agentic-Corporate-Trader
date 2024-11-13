import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Firebase Auth instance

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            // Step 1: Authenticate user with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Step 2: Call backend API to fetch additional user details
            const response = await fetch('https://act-production-5e24.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data from backend.');
            }

            const data = await response.json();

            // Step 3: Store user and token in local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            // Step 4: Update Auth Context
            dispatch({ type: 'LOGIN', payload: data.user });

            setIsLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            return false;
        }
    };

    return { login, error, isLoading };
};
