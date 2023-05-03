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
