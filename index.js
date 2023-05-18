const express = require('express');
const connectToDB = require('./db');
const cors = require('cors');
require('dotenv').config();

connectToDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use('/query',require('./routes/query'));
app.use('/dbfunction',require('./routes/dbFunction'));



app.listen(5000, () => {
  console.log('Server listening on port 5000.');
});
