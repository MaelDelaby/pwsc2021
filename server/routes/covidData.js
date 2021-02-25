const express = require('express');

const covidDataController = require('../controllers/covidData');

const covidDataRouter = express.Router();

covidDataRouter.get('/', async (req, res, next) => {
    try {
        res.send(await covidDataController.getAllData(req));
    } catch (err) {
        next(err);
    }
});

covidDataRouter.get('/fetchData', async (req, res, next) => {
    try {
        res.send(await covidDataController.fetchBrutData(req));
    } catch (err) {
        next(err);
    }
});

module.exports = covidDataRouter;