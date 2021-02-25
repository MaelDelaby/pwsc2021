const express = require('express');

const publicRouter = express.Router();
const datasRoute = require('./routes/covidData'); 

publicRouter.use('/coviddata', datasRoute);

module.exports = publicRouter;