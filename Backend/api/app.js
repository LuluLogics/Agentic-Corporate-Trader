// import mongoose from 'mongoose';
// import debug from 'debug';
// import cors from 'cors';
// import models from './models/index.js';
// import routes from './routes/index.js'
// import express from 'express';
// import { MongoClient, ServerApiVersion } from 'mongodb';
// import * as dotenv from 'dotenv' 
// dotenv.config()

// //Initialise our app by creating express object
// const app = express();
// // To parse JSON we use express.json
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());

// // Initialise the routes
// routes(app);
// // Establish the connection with DB
// function database() {
//     const connectionParams = {
//         useNewUrlParser : true,
//         useUnifiedTopology : true
//     }
//     try{
//         mongoose.connect(process.env.MONGO_URI, connectionParams);
//         console.log('Database connected successfully');
//     } catch(error){
//         console.log(error);
//         console.log("Database connection failed");
//     }
// }

// database();
// export default app;




// forebase set
// app.js
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import * as dotenv from 'dotenv';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Read the Firebase service account JSON file using fs
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve('./config/act-database-508c1-firebase-adminsdk-gu329-5526a3a7b0.json'), 'utf8')
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize the routes
routes(app);

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server running on port ${process.env.PORT || 8080}`);
// });

export default app;

