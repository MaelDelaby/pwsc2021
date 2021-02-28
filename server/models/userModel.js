const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Id is required'],
        unique:true,
      },
    firstName: {
        type:String,
        required:[true,'First name is required ']
       
    },
	lastName: {
        type:String,
        required:[true,'Last name is required ']
    },
	email: {
        type:String,
        required:[true,'email is required '],
        unique:[true,'try another email']
    },
	passWord: {
        type:String,
        required:[true,'password is required ']
    },
	birthDay: {
        type:String,
        required:[true,'Birth day is required ']
    },
	gender: {
        type:String,
        required:[true,'Gender is required ']
    },
 
  
})

let UserModel = mongoose.model('User', userSchema, 'User');


module.exports=UserModel;