const express = require('express');
const router = express.Router();
const Reading = require('../modals/readings');
const { BigQuery } = require('@google-cloud/bigquery');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const bigquery = new BigQuery({
    projectId: 'waterapp-385905',
    keyFilename: 'C:/Users/Lenovo/OneDrive/Desktop/waterapp-385905-f8e5a16f339d.json'
});

const dataset = bigquery.dataset('waterData');
const table = dataset.table('flowmeter');
let row = [];

const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
      { id: 'flatNumber', title: 'flatNumber' },
      { id: 'volume', title: 'volume' },
      { id: 'date', title: 'date' },
      { id: 'time', title: 'time'}
    ],
});

const data = async (date) =>{
    try{
      const limit = [5,6,4,2,4,4];
      let arr=[];
      let i=0;
      while(i<6){
        let a= Math.random()*6*limit[i];
        console.log(a);
        let random = Math.floor(a);
        console.log(random);
        let d = new Date(date).toDateString();
        let time = new Date().toLocaleTimeString();
        const data = await Reading.create({
          flatNumber: i+1,
          volume: random,
          date:d,
          time: time,
        });
  
        const success = await data.save();
        if(success){
          console.log(data,'Data saved');
        }
        arr.push(data);
        row.push(data);
        i++;
      }
      return arr;
    }
    catch(err){
      console.log(err+ "Bhushan");
    }
}

router.post('/stop-streaming', async (req,res)=>{
    try{
      if(row.length>0){
        csvWriter.writeRecords(row)
        .then(res.status(200).send('Streaming stopped'))
        .catch(err => console.error(err));
        
      }
      else{
        res.status(400).send("Errrror");
      }
    }
    catch(err){
      console.log(err+" 51");
    }
});
  
router.post('/stream-to-bigquery', async (req, res) => {
    try{
        const date = new Date(req.body.date).toDateString();
        const success = await data(date);
        if(success){
            res.status(200).send('Data Added');
        }
    }
    catch(err){
        console.log(err+" 74");
    }
});

router.delete('/resetCurrentData', async(req,res)=>{
  try{
    let date = new Date().toDateString();
    const dele = await Reading.deleteMany({date:date});
    if(dele){
      res.status(200).send('Data reset success')
    }
  }
  catch(err){
    console.log(err);
  }
});

module.exports = router;