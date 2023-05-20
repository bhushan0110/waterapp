const express = require('express');
const router = express.Router();
const Record = require('../modals/readings');


router.post('/getFlatData',async(req,res)=>{
    try{
        const date=new Date(req.body.date).toDateString();
        console.log(date);
        const data = await Record.find({
            date: date,
        });
        const flatSummary = [];
        const limit = [5,6,4,2,4,4];
        let totalComsumption = 0;
        console.log(data);
        if(data){
            for(let i=1;i<=6;i++){
                let tmp={
                    flatNumber:i,
                    volume:0,
                    members: limit[i-1]
                }
                for(let j=0;j<data.length;j++){
                    if(data[j].flatNumber===i){
                        tmp.volume+=data[j].volume;
                        totalComsumption+= data[j].volume;
                    }
                }
                flatSummary.push(tmp);
            }
        }
        return res.status(200).send({flatSummary,totalComsumption});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/getFlatDataTC',async(req,res)=>{
    try{
        const date=new Date(req.body.date).toDateString();
        const data = await Record.find({
            date: date,
        });
        const flatSummary = [];
        let totalComsumption = 0;
        if(data){
            for(let i=1;i<=6;i++){
                let tmp={
                    flatNumber:i,
                    volume:0,
                }
                for(let j=0;j<data.length;j++){
                    if(data[j].flatNumber===i){
                        tmp.volume+=data[j].volume;
                        totalComsumption+= data[j].volume;
                    }
                }
                flatSummary.push(tmp);
            }
        }
        const name=[];
        const number=[];
        flatSummary.map((element)=>{
            name.push(element.flatNumber);
            number.push(element.volume);
        });
        console.log(name,number,totalComsumption)
        return res.status(200).send({name,number,totalComsumption});
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
        const flatRecord = await Record.find({flatNumber: 1,date:date});
        if(flatRecord){
            res.status(200).send(flatRecord);
        }
    }
    catch(err){
        console.log(err);
        res.send(500).send("Internal Server Error");
    }
});

router.post('/getCustomData', async(req,res)=>{
    try{
        const {start,end} = req.body;
        const data = await Record.find({
            date: {
                $gte: new Date(start),
                $lte: new Date(end),
            },
        });
        const flatSummary = [];
        const limit = [5,6,4,2,4,4];
        let totalComsumption = 0;
        if(data){
            for(let i=1;i<=6;i++){
                let tmp={
                    flatNumber:i,
                    volume:0,
                    members: limit[i-1]
                }
                for(let j=0;j<data.length;j++){
                    if(data[j].flatNumber===i){
                        tmp.volume+=data[j].volume;
                        totalComsumption+= data[j].volume;
                    }
                }
                flatSummary.push(tmp);
            }
        }
        console.log(flatSummary);
        return res.status(200).send({flatSummary});
    }   
    catch(err){
        console.log(err);
        res.status(500).send("interna; server error");
    }
});


module.exports = router;