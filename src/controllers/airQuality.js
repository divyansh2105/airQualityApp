const { getAirQualityProvider } = require('../providers/airQuality');

async function getAirQuality(latitude, longitude) {
  const { data: airQualityServiceResponse } = await getAirQualityProvider(latitude, longitude);
  return airQualityServiceResponse?.data?.current?.pollution;
}

module.exports = { getAirQuality };