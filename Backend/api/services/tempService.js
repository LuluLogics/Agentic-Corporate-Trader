// import temp from "./../models/temp.js";
// import User from "./../models/User.js";

// // Add a user
// export const save = async (Temp) => {
//   const newUser = new temp(Temp);
//   return newUser.save();
// };

// // Search all
// export const search = async (query) => {
//   const params = { ...query };
//   const user = temp.find(params).exec();
//   return user;
// };

// export const getWatchlist = async (id) => {
//   const user = await User.findById(id);
//   const watchlist = await temp.find({ userId: user.id }).exec();
//   return watchlist;
// };

// // // Remove Todo
// export const remove = (id) => {
//   temp.findByIdAndDelete(id).exec();
//   return remove;
// };




// firebase setup
import admin from "firebase-admin";

// Add a user to the temp collection
export const save = async (Temp) => {
  const db = admin.firestore();
  const tempRef = db.collection('temp').doc();
  await tempRef.set(Temp);
  return { id: tempRef.id, ...Temp };
};

// Search all documents in the temp collection based on query parameters
export const search = async (query) => {
  const db = admin.firestore();
  const tempCollection = db.collection('temp');
  let queryRef = tempCollection;

  // Build the Firestore query based on the input params
  for (const key in query) {
    queryRef = queryRef.where(key, '==', query[key]);
  }

  const snapshot = await queryRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get the watchlist for a specific user by their ID
export const getWatchlist = async (id) => {
  const db = admin.firestore();
  
  // Retrieve the user data
  const userRef = db.collection('users').doc(id);
  const userSnapshot = await userRef.get();
  
  if (!userSnapshot.exists) {
    throw new Error('User not found');
  }

  // Query the temp collection for items associated with this user
  const watchlistSnapshot = await db.collection('temp').where('userId', '==', id).get();
  return watchlistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Remove an item from the temp collection by ID
export const remove = async (id) => {
  const db = admin.firestore();
  const tempRef = db.collection('temp').doc(id);

  // Delete the document
  await tempRef.delete();
  return { message: 'Item deleted successfully', id };
};

