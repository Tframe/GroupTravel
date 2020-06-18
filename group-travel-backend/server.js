/*  Author: Trevor Frame
*   Description: Server for connecting to mongodb and setting up routes
*   for application. 
*/

const Express = require('express');

const Path = require('path');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');

const uri = config.get('mongoURI');
const DATABASE_NAME = 'GroupTravel';

const app = Express();

app.use(cors());

app.use(Express.json());

const port = process.env.PORT || 8080;

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


//const vehicleRouter = require('./routes/vehicles_routes.js');
const userRouter = require('./routes/users.routes.js');

//serving build index.html file for deploying in Google App Engine
app.use(Express.static(Path.join(__dirname, "/build")));

//app.use('/vehicles', vehicleRouter);
app.use('/users', userRouter);

//use catchall handler routes for getting react index.html
app.get("/*", (req, res) => {
    res.sendFile(Path.join(__dirname, "/build/index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});