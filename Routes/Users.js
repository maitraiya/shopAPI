const express = require('express');
const bcrypt = require('bcrypt');
const {User,validateUser} = require('../models/User');
const router = express.Router();

router.post('/',async(req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const alreadyCustomer = await User.findOne({email:req.body.email});
    if(alreadyCustomer) return res.status(400).send("Email already registered");

    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const salt =await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(user.password,salt);
    user.password = HashedPassword;
    await user.save();
    
    const token = user.generateAuthToken();
    return res.header('shop-auth-token',token).send(user);
})

module.exports = router;