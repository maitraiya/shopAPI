const winston = require('winston');

module.exports = function(req,res,err,next){
    winston.error(err.message,err);
    next();
}