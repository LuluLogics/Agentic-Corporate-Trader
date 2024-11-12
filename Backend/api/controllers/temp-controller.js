// import * as tempService from './../services/tempService.js';
// import temp from '../models/temp.js'

// const setResponse = (obj, response) =>{
//     response.status(200);
//     response.json(obj);
// }

// const errorResponse = (err, response) =>{
//     response.status(500);
//     response.json({error: err.message});
// }

// export const getWatchlist = async (request,response) => {
//     try{
//         const id = request.params.id
//         const watchlist = await tempService.getWatchlist(id);
//         setResponse(watchlist,response); // if above promise is successfull
//     } catch(error){
//         errorResponse(error,response); // if above promise is not successfull
//     }
    
// }

// // remove function to call the remove function in service layer, this function will delete a task item by ID.
// export const remove = async (request,response) => {
//     try{
//         const id = request.params.id;
//         const tasks = await tempService.remove(id);
//         setResponse(tasks,response); // if above promise is successfull
//     } catch(error){
//         errorResponse(error,response); // if above promise is not successfull
//     }
    
// }

// export const get = async (req,res) =>{
//     try{
//         // Find method in service helps to get all todos
//         const availableUser = await tempService.search();
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
//         const savedUser = await tempService.save(user);
//         setResponse(savedUser,res);
//     }
//     catch(error){
//         errorResponse(error,res);
//     }
    
// }



// FIREBASE SETUP
import * as tempService from './../services/tempService.js';

const setResponse = (obj, response) => {
    response.status(200).json(obj);
};

const errorResponse = (err, response) => {
    response.status(500).json({ error: err.message });
};

export const getWatchlist = async (request, response) => {
    try {
        const id = request.params.id;
        const watchlist = await tempService.getWatchlist(id);
        setResponse(watchlist, response);
    } catch (error) {
        errorResponse(error, response);
    }
};

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const result = await tempService.remove(id);
        setResponse(result, response);
    } catch (error) {
        errorResponse(error, response);
    }
};

export const get = async (req, res) => {
    try {
        const availableItems = await tempService.getAllItems();
        setResponse(availableItems, res);
    } catch (error) {
        errorResponse(error, res);
    }
};

export const post = async (req, res) => {
    try {
        const itemData = req.body;
        const savedItem = await tempService.save(itemData);
        setResponse(savedItem, res);
    } catch (error) {
        errorResponse(error, res);
    }
};
