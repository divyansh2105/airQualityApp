const express = require('express');
const router = express.Router();
const { getMostPollutedTime } = require('../controllers/mostPollutedTime');

router.use(express.json())

router.get('/', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if(latitude === undefined || longitude === undefined) {
      throw new Error('latitude and longitude are required paramters');
    }
    const datetime = await getMostPollutedTime(latitude, longitude);
    let responseDate = datetime?.toJSON()?.time;
    res.status(200).json({
      date: responseDate?.toLocaleDateString(),
      time: responseDate?.toTimeString()
    });
  } catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
