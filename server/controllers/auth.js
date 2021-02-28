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
   module.exports={signUp}