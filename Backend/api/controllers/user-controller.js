// import * as userService from './../services/user-services.js';
// import User from '../models/User.js'
// import jwt from 'jsonwebtoken';

// const createToken = (_id)=>{
//     return jwt.sign({_id:_id},process.env.SECRET,{expiresIn :'3d'});
// }

// const setResponse = (obj, response) =>{
//     response.status(200);
//     response.json(obj);
// }

// const errorResponse = (err, response) =>{
//     response.status(500);
//     response.json({error: err.message});
// }

// export const index = async (req,res) =>{
//     try{
//         // Store ID
//         const id = req.params.id;
//         // Pass ID to index function
//         const availableUser = await userService.index(id);
//         setResponse(availableUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
// }

// export const get = async (req,res) =>{
//     try{
//         // Find method in service helps to get all todos
//         const availableUser = await userService.find();
//         setResponse(availableUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
// }

// export const post = async (req,res) =>{
//     try{
//         // Store Body and pass to save method
//         const user = req.body;
//         // Save method has the logic to post the user to DB
//         const savedUser = await userService.save(user);
//         setResponse(savedUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
    
// }

// // Signup
// export const signup = async (req,res) =>{
//     try{
//         // Store Body and pass to save method
//         const {firstName, lastName,email,password} = req.body;
//         // Save method has the logic to post the user to DB
//         const savedUser = await User.signup(firstName, lastName,email,password)
//         const id = savedUser._id;
//         const firstNameSaved = savedUser.firstName;
//         const lastNameSaved = savedUser.lastName;
//         const balanceSaved = savedUser.balance;
//         // Create a token
//         const token = createToken(savedUser._id);
//         res.status(200).json({email,id,firstNameSaved,lastNameSaved,balanceSaved, token})
        
//         // setResponse(savedUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
    
// }

// // Login
// export const login = async (req,res) =>{
//     try{
//         // Store Body and pass to save method
//         const {email,password} = req.body;
//         // Save method has the logic to post the user to DB
//         const savedUser = await User.login(email,password)
//         const id = savedUser._id;
//         const firstNameSaved = savedUser.firstName;
//         const lastNameSaved = savedUser.lastName;
//         const balanceSaved = savedUser.balance;
//         // Create a token
//         const token = createToken(savedUser._id);
//         res.status(200).json({email,id,firstNameSaved,lastNameSaved,balanceSaved, token})
        
//         // setResponse(savedUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
    
// }


// export const update = async (req,res) =>{
//     try{
//         const todo = req.body;
//         const id = req.params.id;
//         // Update based on id and user body
//         const updateUser = await userService.update(todo,id);
//         setResponse(updateUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
// }

// export const remove = async (req,res) =>{
//     try{
//         const id = req.params.id;
//         // Delete a Todo
//         const deleteUser = await userService.remove(id);
//         setResponse(deleteUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
// }


// FIREBASE SETUP
import * as userService from './../services/user-services.js';
import jwt from 'jsonwebtoken';

const createToken = (uid) => {
    return jwt.sign({ uid }, process.env.SECRET, { expiresIn: '3d' });
};

const setResponse = (obj, response) => {
    response.status(200).json(obj);
};

const errorResponse = (err, response) => {
    response.status(500).json({ error: err.message });
};

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await userService.signup(firstName, lastName, email, password);
        const token = createToken(user.uid);
        res.status(200).json({ email, uid: user.uid, firstName, lastName, token });
    } catch (error) {
        errorResponse(error, res);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        const token = createToken(user.uid);
        res.status(200).json({ email, uid: user.uid, firstName: user.firstName, lastName: user.lastName, token });
    } catch (error) {
        errorResponse(error, res);
    }
};
