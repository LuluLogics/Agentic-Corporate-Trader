import { useAuthContext } from './useAuthContext.jsx';
import { auth } from '../firebaseConfig'; // Import the Firebase Auth instance
import { signOut } from 'firebase/auth';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        try {
            await signOut(auth);

            // Remove user from local storage
            localStorage.removeItem('user');

            // Dispatch logout action
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    return { logout };
};
