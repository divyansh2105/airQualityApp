const mongoose = require('mongoose');

const airQualitySchema = mongoose.Schema({
  aqius: Number,
  mainus: String,
  aqicn: Number,
  maincn: String,
  latitude: String,
  longitude: String,
  time: Date,
});

module.exports = mongoose.model('AirQuality', airQualitySchema);
