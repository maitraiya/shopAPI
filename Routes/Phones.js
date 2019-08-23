const express = require('express');
const bcrypt = require('bcrypt');
const {Phone,validatePhone} = require('../models/Phone');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const superadmin = require('../middleware/superadmin');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = express.Router();

router.post('/',[auth,admin],asyncMiddleware(async(req,res)=>{
    const {error} = validatePhone(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const phone = new Phone({
        company:req.body.company,
        model: req.body.model,
        screen_size:req.body.screen_size,
        price:req.body.price,
        camera_specifications:req.body.camera_specifications,
        ram: req.body.ram,
        isDiscountAvailable: req.body.isDiscountAvailable,
        imageUrl:req.body.imageUrl
    });
    await phone.save();
    return res.status(200).send(phone);
}));
router.get('/',asyncMiddleware(async(req,res)=>{
    const phone = await Phone.find().sort('model').select("-_id");
    if(phone.length==0) return res.status(404).send("empty data found");
    
    return res.status(200).send(phone);
}));
router.get('/:id',asyncMiddleware(async(req,res)=>{
    const phone = await Phone.findById(req.params.id).sort('model');
    if(!phone) return res.status(404).send("Phone with ID not found");
    
    return res.status(200).send(phone);
}));
router.delete('/:id',[auth,superadmin],asyncMiddleware(async(req,res)=>{
    const phone = await Phone.findByIdAndRemove(req.params.id).sort('model')
    if(!phone) return res.status(404).send("Phone with ID not found");

    return res.status(200).send(phone);
}));
router.put('/:id',[auth,admin],asyncMiddleware(async(req,res)=>{
    const {error} = validatePhone(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const phone = await Phone.findById(req.params.id);
    if(!phone) return res.status(404).send("Phone with ID not found");
    
    phone.company=req.body.company,
    phone.model= req.body.model,
    phone.screen_size=req.body.screen_size,
    phone.price=req.body.price,
    phone.camera_specifications=req.body.camera_specifications,
    phone.ram= req.body.ram,
    phone.isDiscountAvailable= req.body.isDiscountAvailable,
    phone.imageUrl=req.body.imageUrl
    
    await phone.save();
    return res.status(200).send(phone);
}));


module.exports = router;