const request = require("supertest");
const app = require("../app");
const axios = require('axios');
const {createAirQualityRecord, getAirQualityProvider} = require('../providers/airQuality');
const AirQuality = require('../models/airQuality');

const PARIS_LONG = '2.352222', PARIS_LAT = '48.856613';
const mockPollutionData = {
  "time": new Date('2023-03-27T20:21:08.704+00:00'),
  "aqius": 30,
  "mainus": "o3",
  "aqicn": 23,
  "maincn": "o3",
  "longitude": PARIS_LONG,
  "latitude": PARIS_LAT
}
jest.mock('../controllers/airQuality');
const { getAirQuality } = require('../controllers/airQuality');
getAirQuality.mockImplementation(() => Promise.resolve(mockPollutionData))

describe('Air Quality Test Suite', () => {
  it('GET /api/air-quality should succeed', async () => {
    const response = await request(app).get('/api/air-quality?latitude=48.856613&longitude=2.352222');
    expect(response.statusCode).toBe(200);
    expect(response.body.Response).toBeDefined();
    expect(response.body.Response.Pollution).toBeDefined();
    expect(response.body.Response.Pollution.aqius).toBeDefined();
  });

  it('getAirQualityProvider should return pollution levels of nearest city', async () => {
    const PARIS_LONG = '2.352222', PARIS_LAT = '48.856613';
    const mockData = {
      "Response": {
          "Pollution": {
              "ts": "2023-03-27T20:00:00.000Z",
              "aqius": 30,
              "mainus": "o3",
              "aqicn": 23,
              "maincn": "o3"
          }
      }
    }

    axios.get = jest.fn(() => Promise.resolve(mockData));
    let res = await getAirQualityProvider(PARIS_LAT, PARIS_LONG);
    expect(res).toBeDefined();
    expect(res.Response.Pollution.aqius).toBe(30);
  });

  it('getAirQualityProvider should handle failure of response', async () => {
    const PARIS_LONG = '2.352222', PARIS_LAT = '48.856613';
    const mockErrorMessage = 'an error occurred'

    axios.get = jest.fn(() => Promise.reject(new Error('an error occurred')));

    try {
      await getAirQualityProvider(PARIS_LAT, PARIS_LONG);
    } catch(error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(mockErrorMessage);
    }
  });

  it('createAirQualityRecord should create new records in db', async () => {
    const PARIS_LONG = '2.352222', PARIS_LAT = '48.856613';
    const mockPollutionData = {
      "ts": "2023-03-27T20:00:00.000Z",
      "aqius": 30,
      "mainus": "o3",
      "aqicn": 23,
      "maincn": "o3",
      "longitude": PARIS_LONG,
      "latitude": PARIS_LAT
    }

    AirQuality.create = jest.fn(() => Promise.resolve({toJSON: () => mockPollutionData}));
    let res = await createAirQualityRecord(mockPollutionData);
    let data = res.toJSON();
    expect(data).toBeDefined();
    expect(data.aqius).toBe(30);
  });
});