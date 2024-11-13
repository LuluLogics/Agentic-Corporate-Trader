// import { useState } from 'react';
// import { useAuthContext } from './useAuthContext.jsx';

// export const useSignup = () =>{
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(null);
//     const { dispatch } = useAuthContext();

//     const signup = async (firstName, lastName, email, password) =>{
//         setIsLoading(true)
//         setError(null)
        

//         const url = "http://localhost:8080/user/signup/";
//         const response = await fetch (url, {
//             method: 'POST',
//             headers:{'Content-Type':'application/json'},
//             body: JSON.stringify({firstName, lastName, email, password})
//         })
//         const json = await response.json()

//         if(!response.ok){
//             setIsLoading(false)
//             setError(json.error)
//             return false;
//         }
//         if(response.ok){
//             // save the user to local browser storage
//             localStorage.setItem('user',JSON.stringify(json))

//             // Update the auth context
//             dispatch({type:'LOGIN', payload: json});
//             setIsLoading(false);
//             return true;
//         }
//     }
//     return ({ signup,  error, isLoading });
// };



// FIREBASE SETUP 
import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            // Register the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's display name in Firebase
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            });

            // Save user details to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email,
                createdAt: new Date().toISOString(),
            });

            // Save user details in local storage
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
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
