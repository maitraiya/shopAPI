const express = require('express');
const mongoose = require('mongoose');
const Users = require('./Routes/Users');
const Phones = require('./Routes/Phones');
const Login = require('./Routes/Login');
const winston = require('winston');
const error = require('./middleware/error');
const app = express();
const config = require('config');

winston.add(new winston.transports.File({filename:'./log/logfile.log'}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users',Users);
app.use('/api/phones',Phones);
app.use('/api/login',Login);
app.use(error);

if(!config.get('shopPrivateKey'))
{ 
    console.log('Fatal Error! PrivateKey not set!')
    process.exit(1);
}

mongoose.connect(config.get('db'),{ useNewUrlParser: true })
.then(()=>console.log("Connected Successfully"))
.catch((error)=>console.log(error))
const port = process.env.PORT || 3000;
const server = app.listen(port,()=>console.log(`Listening on ${port}`))

module.exports = server;