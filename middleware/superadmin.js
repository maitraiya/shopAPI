const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    if(!req.user.isSuperAdmin) return res.status(403).send('Not a priviliged user');
    
    next();
}