const express = require('express');
const connectToDB = require('./db');
require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');
const Reading = require('./modals/readings');



connectToDB();


const app = express();
const bigquery = new BigQuery({
  projectId: 'your-project-id',
});

app.use(express.json());

//save to database
app.post('/saveData', async (req, res) => {
  try {
    const min = 10
    const max = 16
    const fnum = 10
    let i = 0
    while (i < fnum) {
      randomNum = Math.floor(Math.random() * ((max - min + 1)) * 1000) + min * 100;
      const volume = randomNum //taking in litres 
      const flatNo = (i + 1)
      console.log(volume, "---", flatNo)
      const myData = new Reading({
        flatNo: flatNo,
        volume: volume,
        
      });
      myData.save()
        .then(() => {
          console.log('Document saved');
        })
        .catch((err) => {
          console.error(err);
        });

      i++
    }
    res.send('Done');
  }
  catch (err) {
    console.log(err);
  }
})

app.post('/stream-to-bigquery', (req, res) => {
  const { rows, datasetId, tableId } = req.body;

  const dataset = bigquery.dataset(datasetId);
  const table = dataset.table(tableId);

  table.insert(rows)
    .then(() => {
      console.log(`Inserted ${rows.length} rows into ${table.id}.`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR:', err);
      res.status(500).json({ error: 'Failed to insert rows into BigQuery.' });
    });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
