const User=require('../models/userModel');
const jwt = require('jsonwebtoken');

const signUp=async(req,res)=>{
      
        let bigggestUser = await User.find().sort({id:-1}).skip(0).limit(1).exec();
        let biggestID = 0;
        if (bigggestUser.length !== 0){
            biggestID = bigggestUser[0].id;
        }
        let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email : req.body.email,
        id : biggestID+1,
        passWord : req.body.passWord,
        gender : req.body.gender,
        birthDay : req.body.birthDay,
        
        
        })
        newUser.save(function (err) {
            if(err){
                console.log(err);
                return;
            }
            console.log("Add User Success");
            return "User added"
        });
    
}



const signIn = async(req,res)=>{

    let userResult = await User.findOne({email:req.body.email}).exec();
    const accessTokenSecret = "webproject"
    let email =req.body.email;
    if(userResult != undefined) {

        if (req.body.passWord == userResult.passWord) {
            const accessToken = jwt.sign({ email : userResult.email} , accessTokenSecret);


            return {
                status: 200,
                success:true,
                res_msg: "Login Successfully!",
                token: accessToken

            };
        } else{
            return {
                status:403,
                res_msg: "Incorrect account or password!",
            };
        }
    }else{

        return {
            status:404,
            res_msg:"Account does not exist!"
        };
    }



}

module.exports={
    signUp,
    signIn
}