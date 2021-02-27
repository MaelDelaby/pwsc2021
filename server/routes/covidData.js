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

covidDataRouter.get('/getHospitalieresData',async (req, res, next) => {
    try {
        res.send(await getCovidDateController.getHospitalieresData(req));
    } catch (err) {
        next(err);
    }
});

covidDataRouter.get('/getReaFranceParJourData',async (req, res, next) => {
    try {
        res.send(await getCovidDateController.getReaFranceParJourData(req));
    } catch (err) {
        next(err);
    }
});

covidDataRouter.get('/getTauxDincidenceQuotDepData',async (req, res, next) => {
    try {
        res.send(await getCovidDateController.getTauxDincidenceQuotDepData(req));
    } catch (err) {
        next(err);
    }
});


module.exports = covidDataRouter;