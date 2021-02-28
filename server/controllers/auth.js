const User=require('../models/userModel');


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
    console.log(req.body);
    // console.log(userResult);
    if(userResult != undefined) {

        if (req.body.passWord == userResult.passWord) {
            let jwt = new JwtUtil(userResult.email.toString());
            let token = jwt.generateToken();
            return {
                status: 200,
                res_msg: "Login Successfully!",
                token: token,

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