const AirQuality = require('../models/airQuality');
const axios = require('axios');
require('dotenv').config();

async function createAirQualityRecord(pollutionData) {
  let { ts, ...airQualityData } = pollutionData;
  return AirQuality.create({ ...airQualityData, time: Date.now() });
}

async function getAirQualityProvider(latitude, longitude) {
  const getAQUrl = `${process.env.IQAIR_URL}/nearest_city`;
  return axios.get(getAQUrl, { params: { lat: latitude, lon: longitude, key: process.env.IQAIR_KEY } })
}

module.exports = {createAirQualityRecord, getAirQualityProvider};