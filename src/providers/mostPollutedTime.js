const AirQuality = require('../models/airQuality');

async function mostPollutedTimeProvider(latitude, longitude) {
  return AirQuality.findOne({ longitude, latitude }).sort('-aqius');
}

module.exports = { mostPollutedTimeProvider }