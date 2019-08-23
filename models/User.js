const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:100,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:100,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1000
    },
    Registered_DT :{
        type:Date,
        default:Date.now()
    },
    isAdmin:Boolean,
    isSuperAdmin:Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id :this._id,isAdmin:this.isAdmin,isSuperAdmin:this.isSuperAdmin},config.get('shopPrivateKey'));
    return token;
}
const User = mongoose.model("User",userSchema);

function validateUser(User){
    const schema={
        name:Joi.string().min(5).max(100).required(),
        email:Joi.string().min(5).email().required(),
        password:Joi.string().min(5).max(1000).required()
    };
    return Joi.validate(User,schema)
}

module.exports.User = User;
module.exports.validateUser = validateUser;