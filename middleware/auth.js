const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = function(req,res,next){
    const token = req.header('shop-auth-token');
    if(!token) return res.status(401).send('Token not found');
    try{
        const decoded = jwt.verify(token,config.get('shopPrivateKey'));
        req.user=decoded;
        next();
    }
    catch(ex){
        res.status(401).send('Invalid token');
    }    
}

module.exports=auth;