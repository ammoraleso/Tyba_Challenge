const mongoose = require('mongoose');

// const connectionURL = 'mongodb://127.0.0.1:.27017/TybaChallenge';
const connectionURL = 'mongodb://mongo/TybaChallenge';

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

exports.initializeMongo = () => {
  try {
    mongoose.connect(connectionURL, mongoConfig);
    console.log('Info'.green, 'Connection Established');
  } catch (e) {
    throw new Error(`Error initializing mongo ${error}`);
  }
};
