const express = require('express');

const publicRouter = express.Router();
const datasRoute = require('./routes/dataParser'); 

publicRouter.use('/dataparser', datasRoute);

module.exports = publicRouter;