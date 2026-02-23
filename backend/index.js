require('dotenv').config()
const express = require("express");
const cors = require("cors");
const router = require('./routes/router')
require('./config/db')

const pmsServer = express();

pmsServer.use(cors());

pmsServer.use(express.json());

pmsServer.use(router);

const PORT = 3000;

pmsServer.listen(PORT,()=>{
    console.log('autojob Server has started and waiting for client request!!!');
    
})

pmsServer.get('/',(req,res)=>(
    res.status(200).send(`<h1>Autojob Server </h1>`)
))
