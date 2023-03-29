const cron = require("node-cron");
const { getAirQuality } = require("../src/controllers/airQuality");
const { createAirQualityRecord } = require('../src/providers/airQuality');
const mongoose = require('mongoose');
require('dotenv').config();

cron.schedule("*/1 * * * *", async () => {
  try {
    mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
    
    const PARIS_LONG = '2.352222', PARIS_LAT = '48.856613';
    const coordinates = { longitude: PARIS_LONG, latitude: PARIS_LAT };

    const pollutionData = await getAirQuality(coordinates.latitude, coordinates.longitude);
    await createAirQualityRecord({...pollutionData, ...coordinates});
    console.log('New record created');
  } catch(error) {
    console.log(error.message)
  }
});
