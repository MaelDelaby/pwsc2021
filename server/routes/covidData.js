const express = require('express');


const getCovidDateController = require('../controllers/getCovidData');
const fetchCovidDateController = require('../controllers/fetchCovidData');

const covidDataRouter = express.Router();

covidDataRouter.get('/', async (req, res, next) => {
    try {
        res.send(await getCovidDateController.getAllData(req));
    } catch (err) {
        next(err);
    }
});

covidDataRouter.get('/fetchData', async (req, res, next) => {
    try {
        res.send(await fetchCovidDateController.fetchBrutData(req));
    } catch (err) {
        next(err);
    }
});

module.exports = covidDataRouter;