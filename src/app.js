const express = require('express');
const airQualityRouter = require('./routes/airQuality');
const mostPollutedTimeRouter = require('./routes/mostPollutedTime');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*'
  })
)

app.use('/api/air-quality', airQualityRouter);

app.use('/api/most-polluted-time', mostPollutedTimeRouter);

module.exports = app;
