const express = require('express');

const publicRouter = express.Router();
const datasRoute = require('./routes/covidData'); 
const authRoute=require('./routes/auth')

publicRouter.use('/coviddata', datasRoute);
publicRouter.use('/auth',authRoute)
module.exports = publicRouter;