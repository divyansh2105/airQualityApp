const app = require('./app');
const mongoose = require('mongoose');

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
  mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
});
