// import Trade from './../models/Trade.js'
// import User from './../models/User.js'

// // function to change the balance of user
// const changeBalance = async(user,newBalance) =>{
//     user.balance = newBalance;
//     const updatedUser = await User.findByIdAndUpdate(user.id,user);
//     return updatedUser;
// }

// // function to buy and sell stocks
// export const order = async (id, newOrder) => {
//     const user = await User.findById(id);
//     console.log(newOrder)
//     const trade = new Trade(newOrder)

//     // if the trade type is BUY
//     if(trade.tradeType=="BUY"){
//         // condtion to check if users balance is more than or equals to the amount of buying stock.
//         if(user.balance>=trade.shares*trade.price){
//             const placedTrade  = await trade.save();
//             changeBalance(user, user.balance-trade.shares*trade.price)
//             return placedTrade
//         }
//         else{
//             throw Error("Not Enough Balance");
//         }
//     }
    
//     // for trade type SELL
//     else{
//         // Calculating no. shares of the company by a user
//         const trades = await Trade.find({ userId : user.id, symbol : trade.symbol}).exec();
//         let totalShares = 0;
//         trades.forEach(totalCompanyShares)
//         function totalCompanyShares(item) {
//             if(item.tradeType == "BUY"){
//                 totalShares += item.shares;
//             }
//             else{
//                 totalShares -= item.shares;
//             }
//         }
//         // checking if the user is having more than or equals shares of the company to sell it.
//         if(trade.shares<=totalShares){
//             const placedTrade =  trade.save();
//             changeBalance(user, user.balance+trade.shares*trade.price)
//             return placedTrade
//         }
//         else{
//             throw Error("Not enough shares to sell");
//         }
        
//     }
// }

// // Function to get all trades for a user
// export const getAllTrades = async(id) => {
//     const user = await User.findById(id);
//     const trades = await Trade.find({ userId : user.id}).exec();
//     return trades
// }

// // function to get the portfolio of the user
// export const getPortfolio = async(id) => {
//     const user = await User.findById(id);
//     const trades = await Trade.find({ userId : user.id}).exec();
//     let portfolio = [];
//     trades.forEach(portfolioCalculation);
//     function portfolioCalculation(item) {
//         let tempObj = portfolio.find(({ symbol }) => symbol === item.symbol)
//         if(tempObj){
//             if(item.tradeType === "BUY"){
//                 tempObj.holdingValue += item.shares*item.price;
//                 tempObj.holdingShares += item.shares;
//                 tempObj.buyShares +=item.shares;
//             }
//             else{
//                 // tempObj.holdingValue -= item.shares*item.price;
//                 tempObj.holdingShares -= item.shares;
//             }  
//         }
//         else{
//             let newObj = {
//                 symbol : item.symbol,
//                 name: item.name,
//                 holdingValue : 0,
//                 holdingShares : 0,
//                 buyShares: 0.
//             }

//             if(item.tradeType === "BUY"){
//                 newObj.holdingValue += item.shares*item.price;
//                 newObj.holdingShares += item.shares;
//                 newObj.buyShares += item.shares;
//             }
//             else{
//                 // newObj.holdingValue -= item.shares*item.price;
//                 newObj.holdingShares -= item.shares;
//             }  

//             portfolio.push(newObj);
//         }

//     }
//     let finalPortfolio = []
//     // console.log(portfolio)
//     portfolio.forEach(portfolioCreation);
//     function portfolioCreation(item){

//         if(item.holdingShares>0){
//             const itemVal = {
//                 userId:id,
//                 symbol : item.symbol,
//                 name: item.name,
//                 price : item.holdingValue/item.buyShares,
//                 shares : item.holdingShares,
//                 tradeType : "BUY"
//             }
//             // console.log(itemVal)
//             const portfolioItem = new Trade(itemVal);
//             finalPortfolio.push(portfolioItem);
//         }
//     }
//     // console.log(portfolio)
//     return finalPortfolio
// }



//firebase setup
import admin from 'firebase-admin';

// Function to change the balance of a user in Firestore
const changeBalance = async (userId, newBalance) => {
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    await userRef.update({ balance: newBalance });
    const updatedUser = await userRef.get();
    return { id: updatedUser.id, ...updatedUser.data() };
};

// Function to buy and sell stocks
export const order = async (userId, newOrder) => {
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) throw new Error('User not found');

    const user = userSnapshot.data();
    const trade = { ...newOrder, userId };

    // If the trade type is BUY
    if (trade.tradeType === "BUY") {
        const totalCost = trade.shares * trade.price;
        
        // Check if user's balance is enough
        if (user.balance >= totalCost) {
            // Place the trade
            const tradeRef = db.collection('tradeTransactions').doc();
            await tradeRef.set(trade);

            // Update user balance
            await changeBalance(userId, user.balance - totalCost);
            return { id: tradeRef.id, ...trade };
        } else {
            throw new Error("Not Enough Balance");
        }
    }
    // If the trade type is SELL
    else {
        // Calculate the number of shares of the company that the user owns
        const tradesSnapshot = await db.collection('tradeTransactions')
            .where('userId', '==', userId)
            .where('symbol', '==', trade.symbol)
            .get();

        let totalShares = 0;
        tradesSnapshot.forEach((doc) => {
            const data = doc.data();
            totalShares += (data.tradeType === "BUY" ? 1 : -1) * data.shares;
        });

        // Check if the user has enough shares to sell
        if (trade.shares <= totalShares) {
            // Place the trade
            const tradeRef = db.collection('tradeTransactions').doc();
            await tradeRef.set(trade);

            // Update user balance
            const totalGain = trade.shares * trade.price;
            await changeBalance(userId, user.balance + totalGain);
            return { id: tradeRef.id, ...trade };
        } else {
            throw new Error("Not enough shares to sell");
        }
    }
};

// Function to get all trades for a user
export const getAllTrades = async (userId) => {
    const db = admin.firestore();
    const tradesSnapshot = await db.collection('tradeTransactions')
        .where('userId', '==', userId)
        .get();
    
    return tradesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get the portfolio of a user
export const getPortfolio = async (userId) => {
    const db = admin.firestore();
    const tradesSnapshot = await db.collection('tradeTransactions')
        .where('userId', '==', userId)
        .get();

    let portfolio = [];
    tradesSnapshot.docs.forEach(doc => {
        const item = doc.data();
        let existingEntry = portfolio.find(entry => entry.symbol === item.symbol);

        if (existingEntry) {
            // Update existing entry
            if (item.tradeType === "BUY") {
                existingEntry.holdingValue += item.shares * item.price;
                existingEntry.holdingShares += item.shares;
                existingEntry.buyShares += item.shares;
            } else {
                existingEntry.holdingShares -= item.shares;
            }
        } else {
            // Create a new entry
            portfolio.push({
                symbol: item.symbol,
                name: item.name,
                holdingValue: item.tradeType === "BUY" ? item.shares * item.price : 0,
                holdingShares: item.tradeType === "BUY" ? item.shares : 0,
                buyShares: item.tradeType === "BUY" ? item.shares : 0,
            });
        }
    });

    // Finalize portfolio items
    let finalPortfolio = portfolio
        .filter(item => item.holdingShares > 0) // Keep only items with positive shares
        .map(item => ({
            userId,
            symbol: item.symbol,
            name: item.name,
            price: item.holdingValue / item.buyShares,
            shares: item.holdingShares,
            tradeType: "BUY"
        }));

    return finalPortfolio;
};

