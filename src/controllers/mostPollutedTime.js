const { mostPollutedTimeProvider } = require('../providers/mostPollutedTime');

async function getMostPollutedTime(latitude, longitude) {
  return mostPollutedTimeProvider(latitude, longitude);
}

module.exports = { getMostPollutedTime };