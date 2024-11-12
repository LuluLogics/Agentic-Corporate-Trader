// import { createContext, useReducer, useEffect } from 'react';

// export const AuthContext = createContext()

// export const authReducer =(state,action) =>{
//     switch(action.type){
//         case 'LOGIN':
//             return { user: action.payload}
//         case 'LOGOUT':
//             return { user:null }
//         default:
//             return state        
//     }
// } 

// export const AuthContextProvider = ({ children })=>{
//     const [state, dispatch] = useReducer (authReducer,{
//         user:null
//     })
//     console.log('AuthContext state: ',state)

//     useEffect(()=>{
//         const user = JSON.parse(localStorage.getItem('user'));
//         console.log(user)
//         if(user){
//             dispatch({ type:'LOGIN' , payload:user })
//         }
//     },[])

//     return (
//         <AuthContext.Provider value={{...state,dispatch}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }





// FIREABSE SETUP
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
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
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
