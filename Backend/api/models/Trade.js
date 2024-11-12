// // import mongoose from 'mongoose';

// // // creating a new mongoose schema for task item
// // const Schema = new mongoose.Schema({
// //     userId: {
// //         type: String,
// //         required: 'userId is required.'
// //     },
// //     symbol: {
// //         type: String,
// //         required: 'symbol is required.'
// //     },
// //     name: {
// //         type: String,
// //         required: 'name is required.'
// //     },
// //     price: {
// //         type: Number,
// //         required: 'price is required.'
// //     },
// //     shares:{
// //         type: Number,
// //         required: 'Number of shares is required.'
// //     },
// //     tradeType:{
// //         type: String,
// //         required: 'tradeType is required.'
// //     },
// //     date:{
// //         type: Date,
// //         default: Date.now
// //     }
// // },{ versionKey: false})

// // const model = mongoose.model('tradeTransaction',Schema);

// // export default model;



// FIREBASE SETUP
import admin from 'firebase-admin';

class Trade {
    static async addTradeTransaction(data) {
        const db = admin.firestore();
        const tradeRef = db.collection('tradeTransactions').doc();
        await tradeRef.set(data);
        return { id: tradeRef.id, ...data };
    }

    static async getTradeTransactions(userId) {
        const db = admin.firestore();
        const snapshot = await db.collection('tradeTransactions').where('userId', '==', userId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}

export default Trade;

