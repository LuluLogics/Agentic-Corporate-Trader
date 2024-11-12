import app from './api/app.js';
import * as dotenv from 'dotenv' 
dotenv.config()

// Initialise the port
const port = 8080;

// Listen to the port
app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ${port}`);
});