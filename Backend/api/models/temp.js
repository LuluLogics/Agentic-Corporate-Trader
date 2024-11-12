// import mongoose from "mongoose";

// const tempSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: "id field is required",
//     },
//     symbol: {
//       type: String,
//       // unique: true,
//       required: "symbol field is required",
//     },

//     name: {
//       type: String,
//       required: "name field is required",
//     },
//   },
//   { versionKey: false }
// );

// // Creating a model from our schema
// const model = mongoose.model("temp", tempSchema);

// // Exporting the model as default
// export default model;


//FOREBASE SETUP
import admin from 'firebase-admin';

class Temp {
    static async save(data) {
        const db = admin.firestore();
        const docRef = db.collection('temp').doc();
        await docRef.set(data);
        return { id: docRef.id, ...data };
    }

    static async getAllItems() {
        const db = admin.firestore();
        const snapshot = await db.collection('temp').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async getWatchlist(userId) {
        const db = admin.firestore();
        const snapshot = await db.collection('temp').where('userId', '==', userId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async remove(id) {
        const db = admin.firestore();
        await db.collection('temp').doc(id).delete();
        return { message: 'Item deleted successfully', id };
    }
}

export default Temp;
