const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models/User');
const router = express.Router();
const Joi = require('joi');

router.post('/',async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('User not registered');

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Incorrect Password');

    const token = user.generateAuthToken();
    return res.header('shop-auth-token',token).send(token);
})
function validateLogin(user){
    const schema={
        email:Joi.string().min(5).max(100).required(),
        password:Joi.string().min(5).max(1000).required()
    };
    return Joi.validate(user,schema);
}

module.exports = router;