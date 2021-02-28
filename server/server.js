const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');


const connectionString = 'mongodb+srv://Prog-web-project:p40Eh5DYhxRBHxwq@cluster0.mu9qf.mongodb.net/testRealData?retryWrites=true&w=majority'

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
const PORT = 4001;

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error : '));
db.once('open', function (){
    console.log("MongoDB connection successful");
});

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});