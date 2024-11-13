import { createContext, useReducer, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    console.log('AuthContext state: ', state);

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            }
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error.message);
            localStorage.removeItem('user'); // Optionally clear corrupted data
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};
