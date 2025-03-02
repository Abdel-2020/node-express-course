const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found')
require('dotenv').config();

/*
    Since the mongoose.connect call returns a promise
    we create an asynchronous function to capture the promise
    in a try/catch block. 
*/


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('listening on port ' + port)
        })
    } catch (error) {
        console.log(error);
    }
}

//middleware
app.use(express.json())
app.use(express.static('./public'))

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
//Calls the start function which attempts to connect to the DB before
//starting the server.
start();
