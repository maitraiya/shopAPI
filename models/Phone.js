const mongoose = require('mongoose');
const Joi = require('joi');

const phoneSchema = new mongoose.Schema({
    company:{
        type:String,
        minlength:5,
        maxlength:100,
        required:true
    },
    model:{
        type:String,
        minlength:5,
        maxlength:100,
        required:true
    },
    screen_size:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        minlength:3,
        maxlength:6,
        required:true
    },
    camera_specifications:{
        type:String,
        minlength:1,
        required:true
    },
    ram:{
        type:Number,
        required:true,
        minlength:1,
    },
    imageUrl:{
        type:String,
        required:true,
        minlength:10
    },
    isAdmin:Boolean,
    isSuperAdmin:Boolean,
    isDiscountAvailable:{
        requird:true,
        type:Boolean
    }
});

const Phone = mongoose.model('Phone',phoneSchema);

function validatePhone(Phone){
    const schema={
        company:Joi.string().min(5).max(100).required(),
        model:Joi.string().min(5).max(100).required(),
        screen_size:Joi.string().min(1).required(),
        price:Joi.number().integer().min(1000).max(100000).required(),
        camera_specifications:Joi.string().min(5).required(),
        ram:Joi.number().integer().min(1).required(),
        imageUrl:Joi.string().min(10).required(),
        isDiscountAvailable:Joi.boolean().required()
    };
    return Joi.validate(Phone,schema);
}


module.exports.Phone = Phone;
module.exports.validatePhone = validatePhone;
