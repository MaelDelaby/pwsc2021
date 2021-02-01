const express = require('express');

const providerRouter = express.Router();
const datasController = require('../controllers/datas');

providerRouter.route('/').get(async (req, res) => {
    try {
        return res.json("empty");
    } catch (err) {
        next(err);
    }
});


module.exports = providerRouter;