const express = require('express');
const router = express.Router();
const Record = require('../modals/readings');


router.get('/getFlatData',async(req,res)=>{
    try{
        const date=new Date().toLocaleDateString();
        const data = await Record.find({
            date: date,
        });
        const flatSummary = [];
        console.log(data);
        if(data){
            for(let i=1;i<=6;i++){
                let tmp={
                    flatNumber:i,
                    volume:0,
                }
                for(let j=0;j<data.length;j++){
                    if(data[j].flatNumber===i){
                        tmp.volume+=data[j].volume;
                    }
                }
                flatSummary.push(tmp);
            }
            return res.status(200).send({flatSummary});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getFlatRecord',async(req,res) =>{
    try{
        const no = req.body.no;
        let date = new Date().toDateString();
        console.log(no);
        const flatRecord = await Record.find({flatNumber: 1,date:date});
        console.log(flatRecord);
        if(flatRecord){
            res.status(200).send(flatRecord);
        }
    }
    catch(err){
        console.log(err);
        res.send(500).send("Internal Server Error");
    }
})


module.exports = router;