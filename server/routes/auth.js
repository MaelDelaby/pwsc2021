const express = require('express');


const authController = require('../controllers/auth');


const authRouter = express.Router();

authRouter.post('/signUp', async (req, res, next) => {
    try {
        res.send(await authController.signUp(req,res));
    } catch (err) {
        next(err);
    }
});

authRouter.post('/signIn', async (req, res, next) => {
    try {
        res.json(await authController.signIn(req,res));
    } catch (err) {
        next(err);
    }
});

module.exports=authRouter