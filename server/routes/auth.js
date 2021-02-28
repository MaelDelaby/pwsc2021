const express = require('express');


const authController = require('../controllers/auth');


const authRouter = express.Router();

authRouter.post('/signup', async (req, res, next) => {
    try {
        res.send(await authController.signUp(req,res));
    } catch (err) {
        next(err);
    }
});

module.exports=authRouter