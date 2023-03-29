const request = require("supertest");
const app = require("../app");
const AirQuality = require('../models/airQuality');
const {mostPollutedTimeProvider} = require('../providers/mostPollutedTime');

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
jest.mock('../controllers/mostPollutedTime');
const { getMostPollutedTime } = require('../controllers/mostPollutedTime');
getMostPollutedTime.mockImplementation(() => Promise.resolve({toJSON: () => mockPollutionData}))

describe('Most Polluted Time Test Suite', () => {
  it('GET /api/most-polluted-time should succeed', async () => {
    const response = await request(app).get('/api/most-polluted-time?latitude=48.856613&longitude=2.352222');
    expect(response.statusCode).toBe(200);
    expect(response.body.date).toBeDefined();
    expect(response.body.date).toBe('28/03/2023');
    expect(response.body.time).toBeDefined();
  });

  it('mostPollutedTimeProvider should return the most polluted record', async () => {
    AirQuality.findOne = jest.fn(() => ({sort: () => Promise.resolve({toJSON: () => mockPollutionData})}))
    let res = await mostPollutedTimeProvider(PARIS_LAT, PARIS_LONG);
    let data = res.toJSON();
    expect(data).toBeDefined();
    expect(data.aqius).toBe(30);
  });
});