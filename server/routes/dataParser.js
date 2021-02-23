const express = require('express');

const dataParserController = require('../controllers/dataParser');

const dataParserRouter = express.Router();

dataParserRouter.get('/', async (req, res, next) => {
    try {
        res.send(await dataParserController.insertData());
    } catch (err) {
        next(err);
    }
});

module.exports = dataParserRouter;