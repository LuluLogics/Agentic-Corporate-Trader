// import * as TradeService from './../services/trade-service.js';

// // setSuccessResponse to be called when the promise returned by the service layer functions are successfull
// const setSuccessResponse = (obj, response) => {
//     response.status(200);
//     response.json(obj);
// }

// // setErrorResponse to be called when the promise returned by the service layer functions are not successfull
// const setErrorResponse = (error, response) => {
//     response.status(500);
//     response.json({Error:error.message});
// }

// // post function to place trade order.
// export const placeOrder = async (request,response) => {
//     try{
//         const id = request.params.id;
//         const payload = request.body;
//         const trade = await TradeService.order(id,payload);
//         setSuccessResponse(trade,response); // if above promise is successfull
//     } catch(error){
//         setErrorResponse(error,response); // if above promise is not successfull
//     }
// }

// // get function to get all trades done by a user.
// export const getAllTrades = async (request,response) => {
//     try{
//         const id = request.params.id
//         const trades = await TradeService.getAllTrades(id);
//         setSuccessResponse(trades,response); // if above promise is successfull
//     } catch(error){
//         setErrorResponse(error,response); // if above promise is not successfull
//     }
    
// }

// export const getPortfolio = async (request,response) => {
//     try{
//         const id = request.params.id
//         const trades = await TradeService.getPortfolio(id);
//         setSuccessResponse(trades,response); // if above promise is successfull
//     } catch(error){
//         setErrorResponse(error,response); // if above promise is not successfull
//     }
    
// }


// FIREBASE SETUP
import * as TradeService from './../services/trade-service.js';

const setSuccessResponse = (obj, response) => {
    response.status(200).json(obj);
};

const setErrorResponse = (error, response) => {
    response.status(500).json({ error: error.message });
};

export const placeOrder = async (request, response) => {
    try {
        const userId = request.params.id;
        const payload = request.body;
        const trade = await TradeService.placeOrder(userId, payload);
        setSuccessResponse(trade, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

export const getAllTrades = async (request, response) => {
    try {
        const userId = request.params.id;
        const trades = await TradeService.getAllTrades(userId);
        setSuccessResponse(trades, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

export const getPortfolio = async (request, response) => {
    try {
        const userId = request.params.id;
        const portfolio = await TradeService.getPortfolio(userId);
        setSuccessResponse(portfolio, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

