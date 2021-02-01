const express = require('express');

const publicRouter = express.Router();
const datasRoute = require('./routes/datas'); 

publicRouter.use('/datas', datasRoute);

module.exports = publicRouter;