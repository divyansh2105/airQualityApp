# airQualityApp

Project structure:
- src - Source code for the app
  - routes - Defines the endpoints supported by the server
  - providers - Contains helper modules
  - models - Defines a Mongoose Model for creating records in airqualities collection
  - tests - Defines unit and integration tests for various modules
- cronjobs - Contains the cronjob for inserting data in MongoDB collection

## Prerequisites

Install Node.js, Git, MongoDB

Clone the repository using `git clone git@github.com:divyansh2105/yassirAirQualityApp.git`

Start the MongoDB server

Modify the .env file with necessary values for 
- MongoDB properties
- IQAIR_KEY property with your generated API key 


## Run the application
cd to the root directory

Execute `npm install` to install all the dependencies.

Execute `npm run start` to start the server, which listens to 3000 port by default

Execute `node ./cronjobs/monitorAirQuality.js` to run the cronjob which adds a new air quality record to DB every 1 minute

Execute `npm run test` to run the test cases

## Endpoints for testing GET requests
- Endpoint for getting air quality for specified coordinates: http://localhost:3000/api/air-quality?latitude=48.856613&longitude=2.352222
- Endpoint for getting the most polluted datetime for specified coordinates: http://localhost:3000/api/most-polluted-time?latitude=48.856613&longitude=2.352222
