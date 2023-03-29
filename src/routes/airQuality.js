const express = require('express');
const router = express.Router();
const {getAirQuality} = require('../controllers/airQuality');

router.use(express.json())

router.get('/', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if(latitude === undefined || longitude === undefined) {
      throw new Error('latitude and longitude are required paramters');
    }
    const pollutionData = await getAirQuality(latitude, longitude);
    const response = {
      "Response": {
        "Pollution": pollutionData
      }
    }
    res.status(200).json(response);
  } catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
