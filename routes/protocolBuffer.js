const express = require('express');
const router = express.Router();
const protobuf = require("protobufjs");
const fs = require("fs");
const { performance } = require("perf_hooks");

router.post('/protobuff', async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
