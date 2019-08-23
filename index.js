const express = require('express');
const mongoose = require('mongoose');
const Users = require('./Routes/Users');
const Phones = require('./Routes/Phones');
const Login = require('./Routes/Login');
const winston = require('winston');
const error = require('./middleware/error');
const app = express();
const config = require('config');

winston.add(new winston.transports.File({filename:'log/logfile.log'}));

const key = config.get('shopPrivateKey');
if(!key){ 
    console.log('Fatal Error! PrivateKey not set!')
    process.exit(1);
}
app.use(express.json());
app.use(express.urlencoded(extended=true));
app.use('/api/users',Users);
app.use('/api/phones',Phones);
app.use('/api/login',Login);
app.use(error);


mongoose.connect("mongodb+srv://maitraiya:Mait2792580@cluster-k00st.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>console.log('Connected Successfully To Database'))
.catch((error)=>console.log('Error occured while establishing connection'));
const port = process.env.PORT || 3000;
const server = app.listen(port,()=>console.log(`Listening on ${port}`))

module.exports = server;
